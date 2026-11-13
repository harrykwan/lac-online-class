"use client";

import { useState } from "react";
import { playInterval, type IntervalMode } from "@/lib/audio/voices";
import { INTERVALS } from "@/lib/theory/intervals";
import { PianoKeyboard, type KeyHighlightRole } from "./PianoKeyboard";
import { cn } from "@/lib/cn";

interface Question {
  rootMidi: number;
  intervalId: string;
}

const ROOT_POOL = [57, 58, 59, 60, 61, 62, 63, 64, 65]; // A3–F4

function nextQuestion(): Question {
  const rootMidi = ROOT_POOL[Math.floor(Math.random() * ROOT_POOL.length)];
  const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
  return { rootMidi, intervalId: interval.id };
}

export function IntervalTrainer({
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [question, setQuestion] = useState<Question>(nextQuestion);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [mode, setMode] = useState<IntervalMode>("melodic-asc");

  const questionInterval = INTERVALS.find((i) => i.id === question.intervalId)!;

  const play = (m: IntervalMode = mode) => {
    playInterval(question.rootMidi, questionInterval.semitones, m);
  };

  const pick = (id: string) => {
    if (revealed) return;
    setPicked(id);
    setRevealed(true);
    const isCorrect = id === question.intervalId;
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const nextQ = () => {
    setQuestion(nextQuestion());
    setRevealed(false);
    setPicked(null);
  };

  const secondMidi = question.rootMidi + questionInterval.semitones;
  const highlights: Record<number, KeyHighlightRole> = revealed
    ? { [question.rootMidi]: "root", [secondMidi]: "target" }
    : {};

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={() => play()}>
          🔊 播放音程
        </button>
        <div
          role="radiogroup"
          aria-label="播放模式"
          className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-1"
        >
          {(
            [
              { v: "melodic-asc" as const, label: "上行" },
              { v: "melodic-desc" as const, label: "下行" },
              { v: "harmonic" as const, label: "同時" },
            ] as const
          ).map((o) => (
            <button
              key={o.v}
              type="button"
              role="radio"
              aria-checked={mode === o.v}
              onClick={() => {
                setMode(o.v);
                if (revealed) play(o.v);
              }}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs transition-colors",
                mode === o.v
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-sm text-[var(--color-ink-3)]">
          {score.correct} / {score.total}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {INTERVALS.map((iv) => {
          const isPicked = picked === iv.id;
          const isAnswer = revealed && iv.id === question.intervalId;
          return (
            <button
              key={iv.id}
              type="button"
              disabled={revealed}
              onClick={() => pick(iv.id)}
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
              <span className="block text-sm font-semibold">{iv.label}</span>
              <span className="block text-[10px] text-[var(--color-ink-3)]">{iv.labelZh}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-[1.5rem] text-sm">
        {revealed && (
          <span className={picked === question.intervalId ? "text-emerald-300" : "text-red-300"}>
            {picked === question.intervalId ? "✓ 正確 — " : `✗ 是 ${questionInterval.label} — `}
            {questionInterval.semitones} 個半音。
            <button type="button" className="btn-ghost ml-2 px-3 py-1 text-xs" onClick={nextQ}>
              下一題 →
            </button>
          </span>
        )}
      </div>

      <PianoKeyboard startMidi={48} octaves={2} highlights={highlights} />
    </div>
  );
}
