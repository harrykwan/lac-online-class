"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playClick } from "@/lib/audio/voices";
import { useRhythmScheduler } from "@/hooks/useRhythmScheduler";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";

type Subdivision = "quarter" | "eighth" | "sixteenth";

const SUB_OPTIONS: { value: Subdivision; label: string }[] = [
  { value: "quarter", label: "♩ 四分" },
  { value: "eighth", label: "♫ 八分" },
  { value: "sixteenth", label: "♬ 十六分" },
];

export function RhythmPlayer({
  initialBpm = 90,
  beatsPerBar = 4,
  initialSubdivision = "quarter",
  showSwing = true,
  accent,
  className,
}: {
  initialBpm?: number;
  beatsPerBar?: 2 | 3 | 4 | 6;
  initialSubdivision?: Subdivision;
  showSwing?: boolean;
  accent?: string;
  className?: string;
}) {
  const [bpm, setBpm] = useState(initialBpm);
  const [subdivision, setSubdivision] = useState<Subdivision>(initialSubdivision);
  const [swing, setSwing] = useState(false);
  const [swingRatio, setSwingRatio] = useState(66);
  const reducedMotion = useReducedMotion();

  const stepsPerBar = beatsPerBar * 4;
  const { isPlaying, currentStep, start, stop } = useRhythmScheduler();

  const accentColor = accent ?? "var(--color-srhythm)";

  // Ref keeps the live subdivision visible to the scheduler without
  // stale-closure restarts mid-playback.
  const subRef = useRef(subdivision);

  useEffect(() => {
    subRef.current = subdivision;
  }, [subdivision]);

  const playStep = useCallback((step: number, time: number) => {
    const mode = subRef.current;
    const sub = step % 4;
    if (mode === "quarter") {
      if (sub === 0) playClick(time, step === 0 ? 1 : 0.5);
    } else if (mode === "eighth") {
      if (sub % 2 === 0) playClick(time, sub === 0 && step === 0 ? 1 : sub === 0 ? 0.5 : 0.25);
    } else {
      const isBarStart = step === 0;
      playClick(time, isBarStart ? 1 : sub === 0 ? 0.5 : sub % 2 === 0 ? 0.28 : 0.18);
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      start({
        bpm,
        stepsPerBar,
        swing: swing && subdivision !== "quarter",
        swingRatio: swingRatio / 100,
        playStep,
      });
    }
  };

  /** Changing settings mid-playback restarts the scheduler with new options. */
  const applyLive = (
    patch: { bpm?: number; swing?: boolean; swingRatio?: number; subdivision?: Subdivision },
  ) => {
    const next = {
      bpm: patch.bpm ?? bpm,
      swing: patch.swing ?? swing,
      swingRatio: patch.swingRatio ?? swingRatio,
      subdivision: patch.subdivision ?? subdivision,
    };
    setBpm(next.bpm);
    setSwing(next.swing);
    setSwingRatio(next.swingRatio);
    if (patch.subdivision) setSubdivision(patch.subdivision);
    if (isPlaying) {
      start({
        bpm: next.bpm,
        stepsPerBar,
        swing: next.swing && next.subdivision !== "quarter",
        swingRatio: next.swingRatio / 100,
        playStep,
      });
    }
  };

  const currentBeat = currentStep >= 0 ? Math.floor(currentStep / 4) : -1;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="btn-primary min-w-[7rem]"
          aria-pressed={isPlaying}
        >
          {isPlaying ? "■ 停止" : "▶ 播放"}
        </button>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: beatsPerBar }, (_, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full transition-colors duration-75"
              style={{
                background:
                  currentBeat === i
                    ? accentColor
                    : i === 0
                      ? "color-mix(in srgb, currentColor 30%, transparent)"
                      : "var(--color-line)",
                color: accentColor,
                boxShadow: currentBeat === i ? `0 0 12px ${accentColor}` : undefined,
              }}
            />
          ))}
          <span className="sr-only" aria-live="polite">
            {isPlaying ? `播放中，第 ${currentBeat + 1} 拍` : ""}
          </span>
        </div>
        <span className="ml-auto font-mono text-sm text-[var(--color-ink-2)]">
          {bpm} BPM · {beatsPerBar}/4
        </span>
      </div>

      {/* step LED strip */}
      <div
        className="flex gap-1"
        role="img"
        aria-label={`節奏格線 ${stepsPerBar} 步，目前位置 ${currentStep + 1}`}
      >
        {Array.from({ length: stepsPerBar }, (_, i) => {
          const isBeatStart = i % 4 === 0;
          const isNow = reducedMotion ? false : currentStep === i;
          return (
            <span
              key={i}
              className={cn(
                "h-2.5 flex-1 rounded-sm transition-colors duration-75",
                isBeatStart ? "opacity-100" : "opacity-50",
              )}
              style={{
                background: isNow ? accentColor : isBeatStart ? "var(--color-line)" : "#1a1f2b",
                boxShadow: isNow ? `0 0 8px ${accentColor}` : undefined,
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Slider
          label="Tempo 速度"
          min={40}
          max={208}
          value={bpm}
          onChange={(v) => applyLive({ bpm: v })}
          display={`${bpm} BPM`}
        />
        <Segmented
          options={SUB_OPTIONS}
          value={subdivision}
          onChange={(s) => applyLive({ subdivision: s })}
          ariaLabel="音符細分選擇"
        />
        {showSwing && (
          <div className="flex items-center gap-2">
            <Toggle
              checked={swing}
              onChange={(v) => applyLive({ swing: v })}
              label="Swing 搖擺"
            />
            <span className="text-xs text-[var(--color-ink-2)]">Swing</span>
          </div>
        )}
        {showSwing && swing && (
          <Slider
            label="Swing 比例"
            min={50}
            max={70}
            value={swingRatio}
            onChange={(v) => applyLive({ swingRatio: v })}
            display={`${swingRatio}%`}
          />
        )}
      </div>
      <p className="text-xs leading-relaxed text-[var(--color-ink-3)]">
        {swing && subdivision !== "quarter"
          ? `Swing 開啟：每拍第二個八分音符被延後至 ${swingRatio}% 位置，產生搖擺感。`
          : "Straight：所有細分完全平均分配。" +
            (showSwing ? " 開啟 Swing 聽聽分別。" : "")}
      </p>
    </div>
  );
}
