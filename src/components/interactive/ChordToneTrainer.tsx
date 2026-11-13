"use client";

import { useState } from "react";
import { playChord, playNote } from "@/lib/audio/voices";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { chordMidis } from "@/lib/theory/chords";
import { pcToName } from "@/lib/theory/notes";
import { cn } from "@/lib/cn";

/** C major progression: I–vi–IV–V with roots at octave 3. */
const PROGRESSION = [
  { label: "C", rootMidi: 48 },
  { label: "Am", rootMidi: 45 },
  { label: "F", rootMidi: 41 },
  { label: "G", rootMidi: 43 },
] as const;

interface Question {
  chordLabel: string;
  rootMidi: number;
  tones: number[]; // pitch classes of the chord
  options: number[]; // pitch classes to choose from
  answerPc: number;
}

function buildQuestion(): Question {
  const chord = PROGRESSION[Math.floor(Math.random() * PROGRESSION.length)];
  const tones = chordMidis(chord.rootMidi, chord.label === "Am" ? "min" : "maj");
  const tonePcs = tones.map((m) => m % 12);
  const answerPc = tonePcs[Math.floor(Math.random() * tonePcs.length)];
  // distractors: neighbouring scale tones not in the chord
  const distractors: number[] = [];
  let cand = (answerPc + 9) % 12; // start a bit below
  while (distractors.length < 3) {
    if (!tonePcs.includes(cand)) distractors.push(cand);
    cand = (cand + 1) % 12;
  }
  const options = [answerPc, ...distractors].sort(() => Math.random() - 0.5);
  return { chordLabel: chord.label, rootMidi: chord.rootMidi, tones: tonePcs, options, answerPc };
}

export function ChordToneTrainer({
  accent = "var(--color-scomposition)",
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const [q, setQ] = useState<Question>(buildQuestion);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const revealed = picked !== null;

  const play = () => {
    const type = q.chordLabel === "Am" ? "min" : "maj";
    playChord(chordMidis(q.rootMidi, type), getAudioEngine().now() + 0.05, 1.5, 12);
  };

  const pick = (pc: number) => {
    if (revealed) return;
    // hear what the choice sounds like against the chord
    playChord(chordMidis(q.rootMidi, q.chordLabel === "Am" ? "min" : "maj"), getAudioEngine().now() + 0.05, 1.2, 0);
    playNote(60 + pc, getAudioEngine().now() + 0.15, 0.9);
    setPicked(pc);
    setScore((s) => ({
      correct: s.correct + (pc === q.answerPc ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const nextQ = () => {
    setQ(buildQuestion());
    setPicked(null);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="card card-raised flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <p className="text-xs text-[var(--color-ink-3)]">目前和弦</p>
          <p className="text-2xl font-bold" style={{ color: accent }}>
            {q.chordLabel}
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={play}>
          🔊 播放和弦
        </button>
      </div>

      <p className="text-sm text-[var(--color-ink-2)]">
        哪一個音是這個和弦的<strong>和弦音（Chord Tone）</strong>？強拍應該放在和弦音上。
      </p>

      <div className="grid grid-cols-4 gap-2">
        {q.options.map((pc) => {
          const isAnswer = revealed && pc === q.answerPc;
          return (
            <button
              key={pc}
              type="button"
              disabled={revealed}
              onClick={() => pick(pc)}
              className={cn(
                "rounded-xl border py-4 text-center text-lg font-bold transition-colors duration-150",
                isAnswer
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                  : revealed && picked === pc
                    ? "border-red-500/50 bg-red-500/10 text-red-300"
                    : revealed
                      ? "border-white/[0.06] opacity-40"
                      : "cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
              )}
            >
              {pcToName(pc)}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-[1.5rem] text-sm">
        {revealed && (
          <span className={picked === q.answerPc ? "text-emerald-300" : "text-red-300"}>
            {picked === q.answerPc ? "✓ 正確 — " : `✗ 是 ${pcToName(q.answerPc)} — `}
            {q.chordLabel} 的和弦音是{" "}
            <span className="font-mono">{q.tones.map((t) => pcToName(t)).join(" · ")}</span>。
            <button type="button" className="btn-ghost ml-2 px-3 py-1 text-xs" onClick={nextQ}>
              下一題 →
            </button>
          </span>
        )}
      </div>

      <p className="font-mono text-xs text-[var(--color-ink-3)]">
        得分 {score.correct} / {score.total}
      </p>
    </div>
  );
}
