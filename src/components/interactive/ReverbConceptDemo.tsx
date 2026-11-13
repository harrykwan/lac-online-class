"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { playDrum } from "@/lib/audio/voices";
import { buildCustomImpulse, REVERB_PRESETS, type ReverbPreset, type VerbParams } from "@/lib/audio/impulse";
import { cn } from "@/lib/cn";
import { Slider } from "@/components/ui/Slider";

interface VerbChain {
  drumTimer: ReturnType<typeof setInterval>;
  dry: GainNode;
  wet: GainNode;
  convolver: ConvolverNode;
  preDelay: DelayNode;
  bus: GainNode;
}

/**
 * Percussive source loop → dry/wet crossfade through a procedural IR.
 * Free knobs: decay time (rebuilds IR, debounced), pre-delay, wet — all live,
 * graph is built once per playback session, never torn down on tweaks.
 */
export function ReverbConceptDemo({
  accent = "var(--color-smixing)",
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [preset, setPreset] = useState<ReverbPreset | "custom">("room");
  const [wetMix, setWetMix] = useState(35);
  const [decaySec, setDecaySec] = useState(REVERB_PRESETS.room.seconds);
  const [preDelayMs, setPreDelayMs] = useState(20);
  const [playing, setPlaying] = useState(false);
  const chainRef = useRef<VerbChain | null>(null);
  const irTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Free decay drags inherit tone/curve from the last applied preset,
  // so Plate keeps its bright tail while the student sweeps seconds.
  const lastPresetRef = useRef<ReverbPreset>("room");
  const paramsRef = useRef<VerbParams>({ ...REVERB_PRESETS.room });
  paramsRef.current = { ...REVERB_PRESETS[lastPresetRef.current], seconds: decaySec };

  const stop = useCallback(() => {
    const chain = chainRef.current;
    if (!chain) return;
    clearInterval(chain.drumTimer);
    chain.bus.disconnect();
    chain.dry.disconnect();
    chain.preDelay.disconnect();
    chain.convolver.disconnect();
    chain.wet.disconnect();
    chainRef.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const eng = getAudioEngine();
    const ctx = eng.ensure();
    stop();
    const bus = ctx.createGain();
    const dry = ctx.createGain();
    const wet = ctx.createGain();
    const convolver = ctx.createConvolver();
    const preDelay = ctx.createDelay(0.5);
    convolver.buffer = buildCustomImpulse(paramsRef.current);
    preDelay.delayTime.value = preDelayMs / 1000;
    dry.gain.value = 1 - wetMix / 100;
    wet.gain.value = wetMix / 100;
    bus.connect(dry).connect(eng.masterGain);
    bus.connect(preDelay).connect(convolver).connect(wet).connect(eng.masterGain);

    const source = () => {
      const t = ctx.currentTime + 0.02;
      playDrum("kick", t, 1, bus);
      playDrum("snare", t + 0.25, 0.8, bus);
      playDrum("hatClosed", t + 0.5, 0.6, bus);
      playDrum("snare", t + 0.75, 0.9, bus);
    };
    source();
    const drumTimer = setInterval(source, 1000);
    chainRef.current = { drumTimer, dry, wet, convolver, preDelay, bus };
    setPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop]);

  /** Live wet change — smooth ramp, no graph rebuild. */
  const changeWet = (v: number) => {
    setWetMix(v);
    const chain = chainRef.current;
    if (!chain) return;
    const ctx = getAudioEngine().ensure();
    const t = ctx.currentTime;
    chain.dry.gain.setTargetAtTime(1 - v / 100, t, 0.02);
    chain.wet.gain.setTargetAtTime(v / 100, t, 0.02);
  };

  /** Live pre-delay change — instant, this is the audible point of the knob. */
  const changePreDelay = (v: number) => {
    setPreDelayMs(v);
    const chain = chainRef.current;
    if (!chain) return;
    chain.preDelay.delayTime.setTargetAtTime(v / 1000, getAudioEngine().ensure().currentTime, 0.02);
  };

  /** Decay change — debounce IR regeneration (~few ms of CPU each rebuild). */
  const changeDecay = (v: number) => {
    setDecaySec(v);
    if (preset !== "custom") setPreset("custom");
    if (irTimer.current) clearTimeout(irTimer.current);
    irTimer.current = setTimeout(() => {
      const chain = chainRef.current;
      if (chain) chain.convolver.buffer = buildCustomImpulse(paramsRef.current);
    }, 120);
  };

  const applyPreset = (p: ReverbPreset) => {
    setPreset(p);
    lastPresetRef.current = p;
    const cfg = REVERB_PRESETS[p];
    setDecaySec(cfg.seconds);
    const chain = chainRef.current;
    if (chain) {
      chain.convolver.buffer = buildCustomImpulse({ seconds: cfg.seconds, decay: cfg.decay, bright: cfg.bright });
    }
  };

  useEffect(() => stop, [stop]);

  const fmtDecay = `${decaySec.toFixed(2)}s`;
  const spaceLabel = decaySec < 0.9 ? "小房間" : decaySec < 1.8 ? "中空間" : decaySec < 2.6 ? "大廳" : "教堂";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={() => (playing ? stop() : start())} aria-pressed={playing}>
          {playing ? "■ 停止" : "▶ 播放示範（鼓組）"}
        </button>
        {(Object.keys(REVERB_PRESETS) as ReverbPreset[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => applyPreset(p)}
            aria-pressed={preset === p}
            className={cn(
              "cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors duration-150",
              preset === p
                ? "border-transparent text-white"
                : "border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-ink-2)] hover:bg-white/[0.08]",
            )}
            style={preset === p ? { background: accent } : undefined}
          >
            {REVERB_PRESETS[p].label}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs tracking-wider text-[var(--color-ink-3)]">
          DECAY <span style={{ color: accent }}>{fmtDecay}</span> · PRE <span style={{ color: accent }}>{preDelayMs}ms</span>
        </span>
      </div>

      <Slider
        label="Decay Time 殘響長度"
        min={0.3}
        max={3}
        step={0.05}
        value={decaySec}
        onChange={changeDecay}
        display={`${decaySec.toFixed(2)}s — ${spaceLabel}`}
      />
      <Slider
        label="Pre-Delay 前置延遲（人聲企得住嘅秘密）"
        min={0}
        max={120}
        step={1}
        value={preDelayMs}
        onChange={changePreDelay}
        display={`${preDelayMs}ms`}
      />
      <Slider
        label="Wet / Dry 乾濕比例"
        min={0}
        max={100}
        value={wetMix}
        onChange={changeWet}
        display={`Wet ${wetMix}% · Dry ${100 - wetMix}%`}
      />

      <div className="grid gap-2 text-xs text-[var(--color-ink-3)] sm:grid-cols-3">
        <p>
          <span className="font-semibold text-[var(--color-ink-2)]">Decay</span> — 殘響由 0.3s（房間）掃到 3s（教堂），
          聯住耳仔記住個數字：mixing 時你調嘅就係佢。
        </p>
        <p>
          <span className="font-semibold text-[var(--color-ink-2)]">Pre-delay</span> — 乾訊號先行、殘響遲啲入場。
          開大啲，人聲照企前，空間照大 — 職業 mix 嘅常用招。
        </p>
        <p>
          <span className="font-semibold text-[var(--color-ink-2)]">Wet/Dry</span> — 濕度決定距離：0% 完全乾，
          100% 只有空間。三個 Preset 只係捷徑，任何組合你都搓得到。
        </p>
      </div>
    </div>
  );
}
