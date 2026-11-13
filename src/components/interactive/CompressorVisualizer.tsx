"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { playDrum } from "@/lib/audio/voices";
import { useAnalyserLoop } from "@/hooks/useAnalyser";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

interface CompChain {
  noise: AudioBufferSourceNode;
  drumTimer: ReturnType<typeof setInterval>;
}

export function CompressorVisualizer({
  accent = "var(--color-smixing)",
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [threshold, setThreshold] = useState(-24);
  const [ratio, setRatio] = useState(4);
  const [attack, setAttack] = useState(10); // ms
  const [release, setRelease] = useState(120); // ms
  const [playing, setPlaying] = useState(false);
  const [gr, setGr] = useState(0);
  /** Analyser + compressor exposed via state so render/draw never touch refs. */
  const [live, setLive] = useState<{
    analyser: AnalyserNode;
    compressor: DynamicsCompressorNode;
  } | null>(null);
  const chainRef = useRef<CompChain | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  /** Builds the full graph; AudioParams set on fresh nodes here only. */
  const start = useCallback(
    (params: { threshold: number; ratio: number; attack: number; release: number }) => {
      const eng = getAudioEngine();
      const ctx = eng.ensure();
      const noise = eng.noiseSource();
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.5;
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = params.threshold;
      compressor.ratio.value = params.ratio;
      compressor.attack.value = params.attack / 1000;
      compressor.release.value = params.release / 1000;
      compressor.knee.value = 6;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      noise.connect(noiseGain).connect(compressor);
      // drum pulses give the compressor something to grab
      const drumGain = ctx.createGain();
      drumGain.gain.value = 1.4;
      drumGain.connect(compressor);
      compressor.connect(analyser).connect(eng.masterGain);
      noise.start();
      const drumTimer = setInterval(() => {
        const t = ctx.currentTime + 0.02;
        playDrum("kick", t, 1, drumGain);
        playDrum("snare", t + 0.25, 0.9, drumGain);
      }, 500);
      chainRef.current = { noise, drumTimer };
      setLive({ analyser, compressor });
      setPlaying(true);
    },
    [],
  );

  const stop = useCallback(() => {
    const chain = chainRef.current;
    if (!chain) return;
    clearInterval(chain.drumTimer);
    try {
      chain.noise.stop();
    } catch {
      // already stopped
    }
    chain.noise.disconnect();
    chainRef.current = null;
    setLive(null);
    setPlaying(false);
    setGr(0);
  }, []);

  /** Parameter changes rebuild the graph — the canonical imperative boundary. */
  const changeParam = (which: "threshold" | "ratio" | "attack" | "release", value: number) => {
    const params = { threshold, ratio, attack, release, [which]: value };
    setThreshold(params.threshold);
    setRatio(params.ratio);
    setAttack(params.attack);
    setRelease(params.release);
    if (playing) {
      stop();
      start(params);
    }
  };

  // waveform + gain-reduction readout
  useAnalyserLoop(
    live?.analyser ?? null,
    playing,
    canvasRef,
    (_freq, an, ctx2d, width, height) => {
      const c = live?.compressor;
      if (c && !reducedMotion) {
        // `reduction` is the current gain reduction in dB (negative)
        const reduction = (c as unknown as { reduction: number }).reduction ?? 0;
        setGr(Math.abs(Number(reduction.toFixed(1))));
      }
      if (reducedMotion) return;
      const buf = new Uint8Array(an.fftSize);
      an.getByteTimeDomainData(buf);
      ctx2d.clearRect(0, 0, width, height);
      ctx2d.strokeStyle = "rgba(154,164,184,0.5)";
      ctx2d.lineWidth = 1.5;
      ctx2d.beginPath();
      for (let i = 0; i < buf.length; i++) {
        const x = (i / buf.length) * width;
        const y = (buf[i] / 255) * height;
        if (i === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
    },
  );

  useEffect(() => stop, [stop]);

  // static SVG transfer curve (readable without audio)
  const curvePoints = (() => {
    const pts: string[] = [];
    for (let inDb = -60; inDb <= 0; inDb += 2) {
      const outDb = inDb <= threshold ? inDb : threshold + (inDb - threshold) / ratio;
      const x = ((inDb + 60) / 60) * 100;
      const y = 100 - ((outDb + 60) / 60) * 100;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  })();
  const thresholdX = ((threshold + 60) / 60) * 100;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            playing ? stop() : start({ threshold, ratio, attack, release })
          }
          aria-pressed={playing}
        >
          {playing ? "■ 停止" : "▶ 播放示範（噪音 + 鼓）"}
        </button>
        <span
          className="rounded-xl border px-3 py-1.5 font-mono text-sm"
          style={{
            color: accent,
            borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
          }}
          aria-live="polite"
        >
          Gain Reduction: −{gr.toFixed(1)} dB
        </span>
        <span className="ml-auto text-xs text-[var(--color-ink-3)]">
          紅色區域 = 被壓縮的部分
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
        <canvas
          ref={canvasRef}
          width={480}
          height={140}
          role="img"
          aria-label={`輸出波形，增益衰減 ${gr} dB`}
          className="h-[140px] w-full rounded-xl border border-white/10 bg-[var(--color-surface-2)]"
        />
        <div className="rounded-xl border border-white/10 bg-[var(--color-surface-2)] p-3">
          <svg
            viewBox="0 0 100 100"
            className="h-[140px] w-full"
            role="img"
            aria-label={`傳輸曲線：Threshold ${threshold} dB、Ratio ${ratio}:1`}
          >
            {[25, 50, 75].map((p) => (
              <g key={p} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
                <line x1={p} y1="0" x2={p} y2="100" />
                <line x1="0" y1={p} x2="100" y2={p} />
              </g>
            ))}
            <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(154,164,184,0.3)" strokeWidth="0.7" strokeDasharray="2 2" />
            <line x1={thresholdX} y1="0" x2={thresholdX} y2="100" stroke={accent} strokeWidth="0.8" strokeDasharray="3 2" />
            <polygon
              points={`${thresholdX},0 100,0 100,${(100 - ((threshold + 60) / 60) * 100).toFixed(1)} ${thresholdX},${(100 - ((threshold + 60) / 60) * 100).toFixed(1)}`}
              fill="rgba(248,113,113,0.15)"
            />
            <polyline points={curvePoints} fill="none" stroke={accent} strokeWidth="1.5" />
            <text x="50" y="97" textAnchor="middle" fontSize="4" fill="rgba(154,164,184,0.8)">
              Input (dB) →
            </text>
            <text x="4" y="8" fontSize="4" fill="rgba(154,164,184,0.8)">
              Output
            </text>
          </svg>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Threshold 啟動閾值" min={-60} max={0} value={threshold} onChange={(v) => changeParam("threshold", v)} display={`${threshold} dB`} />
        <Slider label="Ratio 壓縮比" min={1} max={20} step={0.5} value={ratio} onChange={(v) => changeParam("ratio", v)} display={`${ratio}:1`} />
        <Slider label="Attack 啟動時間" min={0} max={200} value={attack} onChange={(v) => changeParam("attack", v)} display={`${attack} ms`} />
        <Slider label="Release 恢復時間" min={5} max={500} value={release} onChange={(v) => changeParam("release", v)} display={`${release} ms`} />
      </div>

      <p className="text-xs leading-relaxed text-[var(--color-ink-3)]">
        Threshold 決定何時啟動；Ratio 決定壓多少（超出的部分按比例衰減）；慢 Attack（20–30 ms）
        保留瞬態 punch；Release 決定多快恢復。調低 Threshold 或調高 Ratio，觀察 Gain Reduction 增加。
      </p>
    </div>
  );
}
