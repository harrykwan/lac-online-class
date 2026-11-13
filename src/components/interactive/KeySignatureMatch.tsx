"use client";

import { useState } from "react";
import { relativeMinor } from "@/lib/theory/harmony";
import { cn } from "@/lib/cn";

/** Key signature data: order of sharps/flats and their major keys. */
const SHARP_KEYS = [
  { count: 0, accidentals: "", major: "C" },
  { count: 1, accidentals: "F♯", major: "G" },
  { count: 2, accidentals: "F♯ C♯", major: "D" },
  { count: 3, accidentals: "F♯ C♯ G♯", major: "A" },
  { count: 4, accidentals: "F♯ C♯ G♯ D♯", major: "E" },
] as const;

const FLAT_KEYS = [
  { count: 1, accidentals: "B♭", major: "F" },
  { count: 2, accidentals: "B♭ E♭", major: "B♭" },
  { count: 3, accidentals: "B♭ E♭ A♭", major: "E♭" },
  { count: 4, accidentals: "B♭ E♭ A♭ D♭", major: "A♭" },
] as const;

interface Question {
  kind: "sharp" | "flat";
  count: number;
  accidentals: string;
  major: string;
  options: string[];
}

const ALL_KEYS = ["C", "G", "D", "A", "E", "B", "F♯", "F", "B♭", "E♭", "A♭", "D♭"];

function pickKeys(correct: string, n = 4): string[] {
  const pool = ALL_KEYS.filter((k) => k !== correct);
  const opts: string[] = [correct];
  while (opts.length < n) {
    const k = pool[Math.floor(Math.random() * pool.length)];
    if (!opts.includes(k)) opts.push(k);
  }
  return opts.sort(() => Math.random() - 0.5);
}

function nextQuestion(): Question {
  const useSharps = Math.random() < 0.55;
  const table = useSharps ? SHARP_KEYS : FLAT_KEYS;
  const q = table[Math.floor(Math.random() * table.length)];
  return {
    kind: useSharps ? "sharp" : "flat",
    count: q.count,
    accidentals: q.accidentals,
    major: q.major,
    options: pickKeys(q.major),
  };
}

export function KeySignatureMatch({
  accent = "var(--color-stheory)",
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [q, setQ] = useState<Question>(nextQuestion);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const revealed = picked !== null;
  const glyph = q.kind === "sharp" ? "♯" : "♭";

  const pick = (key: string) => {
    if (revealed) return;
    setPicked(key);
    setScore((s) => ({
      correct: s.correct + (key === q.major ? 1 : 0),
      total: s.total + 1,
    }));
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="card card-raised flex flex-col items-center gap-2 p-6 text-center">
        <p className="text-xs text-[var(--color-ink-3)]">這個調號屬於哪個大調？</p>
        <p className="text-4xl tracking-wide" style={{ color: accent }} aria-hidden="true">
          {glyph.repeat(Math.max(1, q.count))}
        </p>
        <p className="text-sm text-[var(--color-ink-2)]">
          {q.count === 0 ? "沒有升降記號" : `${q.count} 個${q.kind === "sharp" ? "升" : "降"}記號：${q.accidentals}`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {q.options.map((key) => {
          const isAnswer = revealed && key === q.major;
          return (
            <button
              key={key}
              type="button"
              disabled={revealed}
              onClick={() => pick(key)}
              className={cn(
                "rounded-xl border px-3 py-3 text-center font-semibold transition-colors duration-150",
                isAnswer
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                  : revealed && picked === key
                    ? "border-red-500/50 bg-red-500/10 text-red-300"
                    : revealed
                      ? "border-white/[0.06] opacity-40"
                      : "cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
              )}
            >
              {key} Major
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-[3rem] text-sm">
        {revealed && (
          <div className={picked === q.major ? "text-emerald-300" : "text-red-300"}>
            <p>
              {picked === q.major ? "✓ 正確 — " : `✗ 是 ${q.major} Major — `}
              {q.count} 個{q.kind === "sharp" ? "升" : "降"}記號；關係小調（Relative Minor）是{" "}
              <span className="font-semibold">{relativeMinor(q.major)} Minor</span>。
            </p>
            <button
              type="button"
              className="btn-ghost mt-2 px-3 py-1 text-xs"
              onClick={() => {
                setQ(nextQuestion());
                setPicked(null);
              }}
            >
              下一題 →
            </button>
          </div>
        )}
      </div>

      <p className="font-mono text-xs text-[var(--color-ink-3)]">
        得分 {score.correct} / {score.total}
      </p>
    </div>
  );
}
