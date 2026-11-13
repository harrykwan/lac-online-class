"use client";

import { useState } from "react";
import { playChord, playNote } from "@/lib/audio/voices";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { chordMidis, chordFormulaString, CHORD_LABELS, TRIAD_TYPES, SEVENTH_TYPES } from "@/lib/theory/chords";
import type { ChordTypeName } from "@/data/types";
import { PianoKeyboard, type KeyHighlightRole } from "./PianoKeyboard";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";

type Family = "triads" | "sevenths";

const ROOT_POOL = [55, 57, 58, 60, 62, 63, 64, 65];

export function ChordQualityTrainer({
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [family, setFamily] = useState<Family>("triads");
  const [rootMidi, setRootMidi] = useState(60);
  const [answer, setAnswer] = useState<ChordTypeName>("maj");
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<ChordTypeName | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const options = family === "triads" ? TRIAD_TYPES : SEVENTH_TYPES;

  const play = () => {
    const midis = chordMidis(rootMidi, answer);
    // arpeggio then block — the classic identification strategy
    midis.forEach((m, i) => playNote(m, getAudioEngine().now() + 0.05 + i * 0.28, 0.5));
    playChord(midis, getAudioEngine().now() + 0.05 + midis.length * 0.28 + 0.25, 1.6);
  };

  const newQuestion = (f: Family = family) => {
    setRootMidi(ROOT_POOL[Math.floor(Math.random() * ROOT_POOL.length)]);
    const pool = f === "triads" ? TRIAD_TYPES : SEVENTH_TYPES;
    setAnswer(pool[Math.floor(Math.random() * pool.length)]);
    setRevealed(false);
    setPicked(null);
  };

  const pick = (t: ChordTypeName) => {
    if (revealed) return;
    setPicked(t);
    setRevealed(true);
    setScore((s) => ({
      correct: s.correct + (t === answer ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const chordTones = chordMidis(rootMidi, answer);
  const highlights: Record<number, KeyHighlightRole> = revealed
    ? Object.fromEntries(chordTones.map((m) => [m, "chord-tone" as KeyHighlightRole]))
    : {};

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={play}>
          🔊 播放和弦
        </button>
        <Segmented
          options={[
            { value: "triads" as const, label: "三和弦 Triads" },
            { value: "sevenths" as const, label: "七和弦 Sevenths" },
          ]}
          value={family}
          onChange={(f) => {
            setFamily(f);
            newQuestion(f);
          }}
          ariaLabel="和弦家族"
        />
        <span className="ml-auto font-mono text-sm text-[var(--color-ink-3)]">
          {score.correct} / {score.total}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {options.map((t) => {
          const isAnswer = revealed && t === answer;
          const isPicked = picked === t;
          return (
            <button
              key={t}
              type="button"
              disabled={revealed}
              onClick={() => pick(t)}
              className={cn(
                "rounded-xl border px-2 py-2.5 text-center transition-colors duration-150",
                isAnswer
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : revealed && isPicked
                    ? "border-red-500/50 bg-red-500/10"
                    : revealed
                      ? "border-white/[0.06] opacity-40"
                      : "cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
              )}
            >
              <span className="block text-sm font-semibold">{CHORD_LABELS[t]}</span>
              <span className="block text-[10px] text-[var(--color-ink-3)]">{chordFormulaString(t)}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-[1.5rem] text-sm">
        {revealed && (
          <span className={picked === answer ? "text-emerald-300" : "text-red-300"}>
            {picked === answer ? "✓ 正確 — " : `✗ 是 ${CHORD_LABELS[answer]} — `}
            組成音 {chordFormulaString(answer)}（半音）。
            <button type="button" className="btn-ghost ml-2 px-3 py-1 text-xs" onClick={() => newQuestion()}>
              下一題 →
            </button>
          </span>
        )}
      </div>

      <PianoKeyboard startMidi={48} octaves={2} highlights={highlights} readOnly />
    </div>
  );
}
