"use client";

import { useMemo, useState } from "react";
import { playScale } from "@/lib/audio/voices";
import {
  KEY_ROOTS,
  SCALE_FORMULAS,
  SCALE_LABELS,
  scaleFormulaString,
  scaleMidis,
  scaleNoteNames,
  pcOf,
} from "@/lib/theory/scales";
import { relativeMinor, relativeMajor } from "@/lib/theory/harmony";
import type { ScaleTypeName } from "@/data/types";
import { PianoKeyboard, type KeyHighlightRole } from "./PianoKeyboard";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";

const SCALE_TYPES: { value: ScaleTypeName; label: string }[] = [
  { value: "major", label: "Major" },
  { value: "natural-minor", label: "Natural Minor" },
  { value: "harmonic-minor", label: "Harmonic Minor" },
  { value: "melodic-minor", label: "Melodic Minor" },
];

export function ScaleExplorer({
  initialKey = "C",
  accent = "var(--color-stheory)",
  className,
}: {
  initialKey?: string;
  accent?: string;
  className?: string;
}) {
  const [keyRoot, setKeyRoot] = useState(initialKey);
  const [scaleType, setScaleType] = useState<ScaleTypeName>("major");

  const midis = useMemo(() => scaleMidis(keyRoot, scaleType, 48), [keyRoot, scaleType]);
  const names = useMemo(() => scaleNoteNames(keyRoot, scaleType), [keyRoot, scaleType]);

  const highlights: Record<number, KeyHighlightRole> = Object.fromEntries(
    midis.map((m) => [m, "scale" as KeyHighlightRole]),
  );
  highlights[48 + pcOf(keyRoot)] = "root";

  // octave 2 of the scale (48-72 range) for playback
  const play = () => {
    const octaveMidis = midis.map((m) => m + 12);
    playScale([...octaveMidis, octaveMidis[octaveMidis.length - 1] + 12], 0.3);
  };

  const isMinor = scaleType !== "major";
  const relKey = isMinor ? relativeMajor(keyRoot) : relativeMinor(keyRoot);
  const parKey = keyRoot; // parallel shares the tonic

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {KEY_ROOTS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKeyRoot(k)}
            aria-pressed={keyRoot === k}
            className={cn(
              "h-9 w-9 cursor-pointer rounded-lg border text-sm font-semibold transition-colors",
              keyRoot === k
                ? "border-transparent text-white"
                : "border-white/10 bg-white/[0.04] text-[var(--color-ink-2)] hover:bg-white/[0.08]",
            )}
            style={keyRoot === k ? { background: accent } : undefined}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Segmented options={SCALE_TYPES} value={scaleType} onChange={setScaleType} ariaLabel="音階類型" />
        <button type="button" className="btn-primary" onClick={play}>
          🔊 播放音階
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
        <p className="leading-relaxed">
          <span className="font-semibold" style={{ color: accent }}>
            {keyRoot} {SCALE_LABELS[scaleType]}
          </span>
          <span className="ml-3 font-mono text-xs text-[var(--color-ink-3)]">
            {scaleFormulaString(scaleType)}
          </span>
        </p>
        <p className="mt-1 text-[var(--color-ink-2)]">
          音階音符：<span className="font-mono">{names.join(" – ")}</span>
          <span className="ml-2 font-mono text-xs text-[var(--color-ink-3)]">
            ({SCALE_FORMULAS[scaleType].join("-")} 半音)
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-3)]">
          {isMinor ? "Relative 大調" : "Relative 小調"}：
          <span className="font-mono" style={{ color: accent }}>
            {relKey}
          </span>
          （共享相同調號） · Parallel{" "}
          {isMinor ? "大調" : "小調"}：
          <span className="font-mono" style={{ color: accent }}>
            {parKey} {isMinor ? "Major" : "Minor"}
          </span>
          （共享相同主音）
        </p>
      </div>

      <PianoKeyboard startMidi={48} octaves={2} highlights={highlights} readOnly />
    </div>
  );
}
