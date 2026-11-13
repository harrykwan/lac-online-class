"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { useAnalyserLoop } from "@/hooks/useAnalyser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

const LOW_FREQ = 200;
const MID_FREQ = 1000;
const HIGH_FREQ = 4000;

interface EqChain {
  source: AudioBufferSourceNode;
  filters: [BiquadFilterNode, BiquadFilterNode, BiquadFilterNode];
  sweepOsc?: OscillatorNode;
}

export function EQExplorer({
  accent = "var(--color-smixing)",
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [low, setLow] = useState(0);
  const [mid, setMid] = useState(0);
  const [high, setHigh] = useState(0);
  const [sweeping, setSweeping] = useState(false);
  const chainRef = useRef<EqChain | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  /** Builds the noise → 3-band EQ → analyser chain. AudioParams are set here
   *  on freshly created nodes only (imperative Web Audio boundary). */
  const start = useCallback(
    (gains: { low: number; mid: number; high: number }) => {
      const eng = getAudioEngine();
      const ctx = eng.ensure();
      const source = eng.noiseSource();
      const lowShelf = ctx.createBiquadFilter();
      lowShelf.type = "lowshelf";
      lowShelf.frequency.value = LOW_FREQ;
      lowShelf.gain.value = gains.low;
      const peak = ctx.createBiquadFilter();
      peak.type = "peaking";
      peak.frequency.value = MID_FREQ;
      peak.Q.value = 1;
      peak.gain.value = gains.mid;
      const highShelf = ctx.createBiquadFilter();
      highShelf.type = "highshelf";
      highShelf.frequency.value = HIGH_FREQ;
      highShelf.gain.value = gains.high;
      const an = ctx.createAnalyser();
      an.fftSize = 256;
      source
        .connect(lowShelf)
        .connect(peak)
        .connect(highShelf)
        .connect(an)
        .connect(eng.masterGain);
      source.start();
      chainRef.current = { source, filters: [lowShelf, peak, highShelf] };
      setAnalyser(an);
      setPlaying(true);
    },
    [],
  );

  const stop = useCallback(() => {
    const chain = chainRef.current;
    if (!chain) return;
    chain.sweepOsc?.stop();
    try {
      chain.source.stop();
    } catch {
      // already stopped
    }
    chain.source.disconnect();
    chain.filters.forEach((f) => f.disconnect());
    chainRef.current = null;
    setAnalyser(null);
    setPlaying(false);
    setSweeping(false);
  }, []);

  /** Slider changes rebuild the chain (restart is seamless for noise). */
  const changeGains = (which: "low" | "mid" | "high", value: number) => {
    const next = { low, mid, high, [which]: value };
    if (which === "low") setLow(value);
    if (which === "mid") setMid(value);
    if (which === "high") setHigh(value);
    if (playing) {
      stop();
      start(next);
    }
  };

  const sweep = () => {
    const eng = getAudioEngine();
    const ctx = eng.ensure();
    if (!chainRef.current) start({ low, mid, high });
    const chain = chainRef.current;
    if (!chain) return;
    setSweeping(true);
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const gain = ctx.createGain();
    gain.gain.value = 0.25;
    osc.connect(gain).connect(chain.filters[0]);
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(12000, t + 4);
    osc.start(t);
    osc.stop(t + 4.2);
    osc.onended = () => setSweeping(false);
  };

  // spectrum drawing — analyser comes from state, canvas ref read inside the loop
  useAnalyserLoop(
    analyser,
    playing && !reducedMotion,
    canvasRef,
    (freq, _an, ctx2d, width, height) => {
      ctx2d.clearRect(0, 0, width, height);
      ctx2d.fillStyle = "rgba(255,255,255,0.05)";
      for (let x = 0; x < width; x += width / 8) ctx2d.fillRect(x, 0, 1, height);
      const bins = freq.length;
      const barW = width / bins;
      for (let i = 0; i < bins; i++) {
        const v = freq[i] / 255;
        const h = v * height;
        ctx2d.fillStyle = v > 0.6 ? accent : "rgba(154,164,184,0.7)";
        ctx2d.fillRect(i * barW, height - h, Math.max(1, barW - 1), h);
      }
    },
  );

  useEffect(() => stop, [stop]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={() => (playing ? stop() : start({ low, mid, high }))}
          aria-pressed={playing}
        >
          {playing ? "■ 停止噪音" : "▶ 播放噪音"}
        </button>
        <button type="button" className="btn-ghost" onClick={sweep} disabled={sweeping}>
          {sweeping ? "掃描中…" : "📈 頻率掃描（80 Hz → 12 kHz）"}
        </button>
        <span className="ml-auto text-xs text-[var(--color-ink-3)]">
          用耳機聆聽 — 調整三個頻段，觀察頻譜變化
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={640}
        height={120}
        role="img"
        aria-label={`頻譜顯示 — Low ${low} dB、Mid ${mid} dB、High ${high} dB`}
        className="h-[120px] w-full rounded-xl border border-white/10 bg-[var(--color-surface-2)]"
      />

      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
        <Slider
          label={`Low（Low Shelf @ ${LOW_FREQ} Hz）`}
          min={-18}
          max={18}
          value={low}
          onChange={(v) => changeGains("low", v)}
          display={`${low > 0 ? "+" : ""}${low} dB`}
        />
        <Slider
          label={`Mid（Peaking @ ${MID_FREQ / 1000} kHz）`}
          min={-18}
          max={18}
          value={mid}
          onChange={(v) => changeGains("mid", v)}
          display={`${mid > 0 ? "+" : ""}${mid} dB`}
        />
        <Slider
          label={`High（High Shelf @ ${HIGH_FREQ / 1000} kHz）`}
          min={-18}
          max={18}
          value={high}
          onChange={(v) => changeGains("high", v)}
          display={`${high > 0 ? "+" : ""}${high} dB`}
        />
      </div>

      <p className="text-xs leading-relaxed text-[var(--color-ink-3)]">
        EQ 選擇一個頻率點（Frequency），再決定衰減（Cut，負 dB）或增強（Boost，正 dB）。
        先 Cut 再 Boost — 減法混音更乾淨。Kick 力量在 60–100 Hz，人聲主體在 1–4 kHz。
      </p>
    </div>
  );
}
