"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { playDrum, type DrumKind } from "@/lib/audio/voices";
import { useRhythmScheduler } from "@/hooks/useRhythmScheduler";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

export interface GridRow {
  id: DrumKind;
  labelZh: string;
  labelEn: string;
}

const DEFAULT_ROWS: GridRow[] = [
  { id: "kick", labelZh: "Kick 底鼓", labelEn: "Kick" },
  { id: "snare", labelZh: "Snare 軍鼓", labelEn: "Snare" },
  { id: "hatClosed", labelZh: "Hi-hat（閉）", labelEn: "Closed Hat" },
  { id: "hatOpen", labelZh: "Hi-hat（開）", labelEn: "Open Hat" },
];

export interface GridPreset {
  nameZh: string;
  rows: Record<string, number[]>; // row id → active 16th steps
}

const STEP_TOTAL = 16;

export const GRID_PRESETS: GridPreset[] = [
  {
    nameZh: "Pop 流行",
    rows: { kick: [0, 8, 10], snare: [4, 12], hatClosed: [0, 2, 4, 6, 8, 10, 12, 14] },
  },
  {
    nameZh: "Rock 搖滾",
    rows: {
      kick: [0, 2, 6, 8, 10, 14],
      snare: [4, 12],
      hatClosed: [0, 2, 4, 6, 8, 10, 12, 14],
    },
  },
  {
    nameZh: "Funk 放克",
    rows: {
      kick: [0, 3, 6, 10],
      snare: [4, 11, 12, 14],
      hatClosed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
  },
];

export function RhythmPatternGrid({
  rows = DEFAULT_ROWS,
  presets = GRID_PRESETS,
  initialBpm = 100,
  accent = "var(--color-srhythm)",
  showSwing = true,
  className,
}: {
  rows?: GridRow[];
  presets?: GridPreset[];
  initialBpm?: number;
  accent?: string;
  showSwing?: boolean;
  className?: string;
}) {
  const [pattern, setPattern] = useState<Record<string, boolean[]>>(() =>
    loadPattern(presets[0]),
  );
  const [bpm, setBpm] = useState(initialBpm);
  const [swing, setSwing] = useState(false);
  const [presetName, setPresetName] = useState(presets[0]?.nameZh ?? "");
  const patternRef = useRef(pattern);

  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  const { isPlaying, currentStep, start, stop } = useRhythmScheduler();

  const playStep = useCallback((step: number, time: number) => {
    const p = patternRef.current;
    for (const row of Object.keys(p)) {
      if (p[row]?.[step]) playDrum(row as DrumKind, time, row === "kick" ? 1 : 0.85);
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) stop();
    else start({ bpm, stepsPerBar: STEP_TOTAL, swing, playStep });
  };

  const toggleCell = (rowId: string, step: number) => {
    setPattern((prev) => {
      const row = [...(prev[rowId] ?? Array(STEP_TOTAL).fill(false))];
      row[step] = !row[step];
      return { ...prev, [rowId]: row };
    });
    if (!isPlaying) {
      playDrum(rows.find((r) => r.id === rowId)!.id, getAudioEngine().now() + 0.01, 0.9);
    }
  };

  const applyPreset = (preset: GridPreset) => {
    setPattern(loadPattern(preset));
    setPresetName(preset.nameZh);
  };

  const activeCount = useMemo(
    () => Object.values(pattern).reduce((n, row) => n + row.filter(Boolean).length, 0),
    [pattern],
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={togglePlay} className="btn-primary min-w-[7rem]" aria-pressed={isPlaying}>
          {isPlaying ? "■ 停止" : "▶ 播放"}
        </button>
        {presets.map((p) => (
          <button
            key={p.nameZh}
            type="button"
            onClick={() => applyPreset(p)}
            className={cn("pill cursor-pointer", presetName === p.nameZh && "text-[var(--color-ink)]")}
            style={
              presetName === p.nameZh
                ? {
                    color: accent,
                    borderColor: `color-mix(in srgb, ${accent} 50%, transparent)`,
                    background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                  }
                : undefined
            }
          >
            {p.nameZh}
          </button>
        ))}
        <button
          type="button"
          className="pill cursor-pointer"
          onClick={() => setPattern(loadPattern(undefined))}
        >
          清空
        </button>
        <span className="ml-auto font-mono text-sm text-[var(--color-ink-2)]">{bpm} BPM</span>
      </div>

      {/* grid */}
      <div className="overflow-x-auto scroll-slim pb-1" role="group" aria-label="節奏編程格線">
        <div className="min-w-[560px]">
          {/* step ruler */}
          <div className="mb-1.5 flex gap-1 pl-[7.5rem]">
            {Array.from({ length: STEP_TOTAL }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-4 flex-1 items-center justify-center text-[9px]",
                  i % 4 === 0 ? "text-[var(--color-ink-3)]" : "text-transparent",
                )}
              >
                {i % 4 === 0 ? i / 4 + 1 : "·"}
              </div>
            ))}
          </div>
          {rows.map((row) => (
            <div key={row.id} className="mb-1.5 flex items-center gap-1">
              <div className="w-[7.25rem] shrink-0 pr-2 text-right text-xs text-[var(--color-ink-2)]">
                {row.labelZh}
              </div>
              {Array.from({ length: STEP_TOTAL }, (_, step) => {
                const on = pattern[row.id]?.[step] ?? false;
                const isNow = isPlaying && currentStep === step;
                return (
                  <button
                    key={step}
                    type="button"
                    aria-pressed={on}
                    aria-label={`${row.labelEn} 步驟 ${step + 1}`}
                    onClick={() => toggleCell(row.id, step)}
                    className={cn(
                      "h-9 min-w-[26px] flex-1 cursor-pointer rounded-md border transition-colors duration-100",
                      on ? "border-transparent" : "border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.08]",
                      step % 4 === 0 && !on && "bg-white/[0.07]",
                    )}
                    style={
                      on
                        ? {
                            background: accent,
                            opacity: isNow ? 1 : 0.75,
                            boxShadow: isNow ? `0 0 10px ${accent}` : undefined,
                          }
                        : isNow
                          ? { background: `color-mix(in srgb, ${accent} 25%, transparent)` }
                          : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Slider label="Tempo 速度" min={60} max={180} value={bpm} onChange={setBpm} display={`${bpm} BPM`} />
        {showSwing && (
          <label className="flex items-center gap-2 text-xs text-[var(--color-ink-2)]">
            <input
              type="checkbox"
              checked={swing}
              onChange={(e) => {
                setSwing(e.target.checked);
                if (isPlaying) start({ bpm, stepsPerBar: STEP_TOTAL, swing: e.target.checked, playStep });
              }}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            Swing 搖擺
          </label>
        )}
        <span className="ml-auto text-xs text-[var(--color-ink-3)]">
          {activeCount} 個音符 · 點擊格子編寫自己的 Groove
        </span>
      </div>
    </div>
  );
}

function loadPattern(preset?: GridPreset): Record<string, boolean[]> {
  const p: Record<string, boolean[]> = {};
  const allRows = [...DEFAULT_ROWS];
  for (const row of allRows) {
    p[row.id] = Array(STEP_TOTAL).fill(false);
  }
  if (preset) {
    for (const [rowId, steps] of Object.entries(preset.rows)) {
      if (!p[rowId]) p[rowId] = Array(STEP_TOTAL).fill(false);
      for (const s of steps) p[rowId][s] = true;
    }
  }
  return p;
}
