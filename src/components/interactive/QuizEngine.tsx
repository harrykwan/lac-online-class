"use client";

import { useEffect, useState } from "react";
import type { AudioCue, QuizItem, QuizSet } from "@/data/types";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import {
  playChord,
  playClick,
  playDrum,
  playInterval,
  playNote,
  playScale,
} from "@/lib/audio/voices";
import { chordMidis } from "@/lib/theory/chords";
import { scaleMidis } from "@/lib/theory/scales";
import { useProgress } from "@/context/ProgressContext";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { cn } from "@/lib/cn";

/** Plays any AudioCue at "now". Call only from user gestures / post-mount effects. */
export function playAudioCue(cue: AudioCue): void {
  const eng = getAudioEngine();
  const t = eng.now() + 0.05;
  switch (cue.type) {
    case "rhythm": {
      const beatsPerBar = cue.beatsPerBar ?? 4;
      const beatDur = 60 / cue.bpm;
      // one-bar count-in so the pulse is established first
      for (let b = 0; b < beatsPerBar; b++) {
        playClick(t + b * beatDur, b === 0 ? 1 : 0.5);
      }
      const barStart = t + beatsPerBar * beatDur;
      for (const s of cue.steps) {
        const beat = Math.floor(s / 4);
        const sub = s % 4;
        const time = barStart + beat * beatDur + (sub / 4) * beatDur;
        playDrum("hatClosed", time, 0.7);
        if (sub === 0) playClick(time, beat === 0 ? 1 : 0.5);
      }
      break;
    }
    case "straightVsSwing": {
      const beatDur = 60 / cue.bpm;
      // one bar of pulses, then one bar of eighth subdivisions
      for (let b = 0; b < 4; b++) playClick(t + b * beatDur, b === 0 ? 1 : 0.5);
      const off = t + 4 * beatDur;
      const ratio = cue.swing ? 0.66 : 0.5;
      for (let b = 0; b < 4; b++) {
        playClick(off + b * beatDur, 0.5);
        playClick(off + b * beatDur + ratio * beatDur, 0.25);
      }
      break;
    }
    case "interval":
      playInterval(cue.rootMidi, cue.semitones, cue.mode, t);
      break;
    case "chord":
      playChord(chordMidis(cue.rootMidi, cue.chordType), t, 1.4, 18);
      break;
    case "scale":
      playScale(scaleMidis(cue.key, cue.scaleType, 60), 0.32, t);
      break;
    case "note":
      playNote(cue.midi, t, 0.8);
      break;
  }
}

export function QuizEngine({
  quizSet,
  accent = "var(--color-accent)",
  className,
}: {
  quizSet: QuizSet;
  accent?: string;
  className?: string;
}) {
  const { unlocked } = useAudioEngine();
  const progress = useProgress();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // matching state
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, number>>({});

  const item = quizSet.items[index] as QuizItem | undefined;
  const total = quizSet.items.length;

  const audioOf = (it: QuizItem): AudioCue | undefined =>
    it.kind === "audio-mcq" ? it.audio : it.kind === "mcq" ? it.audio : undefined;

  // auto-play audio questions once when they appear
  useEffect(() => {
    if (started && !finished && !answered && item) {
      const cue = audioOf(item);
      if (cue) playAudioCue(cue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, index, finished]);

  const answer = (wasCorrect: boolean) => {
    setAnswered(true);
    setCorrect(wasCorrect);
    if (wasCorrect) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= total) {
      setFinished(true);
      progress.recordQuiz(quizSet.id, score, total);
    } else {
      setIndex((i) => i + 1);
      setAnswered(false);
      setCorrect(null);
      setSelectedLeft(null);
      setMatched({});
    }
  };

  const restart = () => {
    setIndex(0);
    setAnswered(false);
    setCorrect(null);
    setScore(0);
    setFinished(false);
    setSelectedLeft(null);
    setMatched({});
  };

  const saved = progress.getQuizScore(quizSet.id);

  if (!started) {
    return (
      <div className={cn("card card-raised p-6", className)}>
        <h3 className="text-lg font-bold">{quizSet.titleZh}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-2)]">
          {quizSet.descriptionZh}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button type="button" className="btn-primary" onClick={() => setStarted(true)}>
            開始練習（{total} 題）
          </button>
          {saved && (
            <span className="text-xs text-[var(--color-ink-3)]">
              最佳紀錄：{saved.best}/{saved.total} · 已練習 {saved.attempts} 次
            </span>
          )}
        </div>
        {!unlocked && (
          <p className="mt-3 text-xs text-[var(--color-ink-3)]">
            部分題目包含聽力測試 — 首次互動後瀏覽器才會啟用聲音。
          </p>
        )}
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className={cn("card card-raised p-6 text-center", className)}>
        <p className="text-4xl font-bold" style={{ color: accent }}>
          {score} / {total}
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-2)]">
          {pct >= 80
            ? "優秀！你已真正掌握這些概念。"
            : pct >= 50
              ? "不錯！重溫答錯的單元再試一次。"
              : "繼續努力 — 先複習課程內容再回來。"}
        </p>
        <button type="button" className="btn-ghost mt-4" onClick={restart}>
          重新練習
        </button>
      </div>
    );
  }

  if (!item) return null;

  const questionNo = index + 1;
  const optionCls = (i: number, answerIndex: number) =>
    cn(
      "rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-150",
      answered && i === answerIndex
        ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
        : answered
          ? "border-white/10 text-[var(--color-ink-3)]"
          : "cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
    );

  return (
    <div className={cn("card card-raised flex flex-col gap-4 p-6", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--color-ink-3)]">
          第 {questionNo} / {total} 題
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {quizSet.items.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-4 rounded-full"
              style={{
                background:
                  i < index ? accent : i === index ? "var(--color-ink-3)" : "var(--color-line)",
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-base leading-relaxed font-medium">{item.promptZh}</p>

      {audioOf(item) && (
        <button type="button" className="btn-ghost self-start" onClick={() => playAudioCue(audioOf(item)!)}>
          🔊 重新播放音訊
        </button>
      )}

      {(item.kind === "mcq" || item.kind === "audio-mcq") && (
        <div className="flex flex-col gap-2">
          {item.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => answer(i === item.answerIndex)}
              className={optionCls(i, item.answerIndex)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {item.kind === "matching" && (
        <MatchingBody
          lefts={item.pairs.map((p, i) => ({ leftZh: p.leftZh, idx: i }))}
          rights={shuffleStable(item.pairs.map((p, i) => ({ label: p.rightZh, idx: i })), item.id)}
          selectedLeft={selectedLeft}
          matched={matched}
          onSelectLeft={(i) => !answered && setSelectedLeft(i)}
          onSelectRight={(ri) => {
            if (answered || selectedLeft === null) return;
            const nextMatched = { ...matched, [selectedLeft]: ri };
            setMatched(nextMatched);
            setSelectedLeft(null);
            if (Object.keys(nextMatched).length === item.pairs.length) {
              answer(item.pairs.every((_, li) => nextMatched[li] === li));
            }
          }}
        />
      )}

      {item.kind === "ordering" && (
        <OrderingBody
          key={item.id}
          initial={shuffleStable(
            item.correctOrder.map((v) => v),
            item.id,
          ).map((v) => ({ id: v, label: v }))}
          disabled={answered}
          onCommit={(labels) => {
            const allCorrect = labels.every((v, i) => v === item.correctOrder[i]);
            answer(allCorrect);
          }}
        />
      )}

      <div aria-live="polite" className="min-h-[2.5rem]">
        {answered && (
          <div
            className={cn(
              "rounded-xl border px-4 py-3 text-sm",
              correct
                ? "border-emerald-500/40 bg-emerald-500/[0.07] text-emerald-300"
                : "border-red-500/40 bg-red-500/[0.07] text-red-300",
            )}
          >
            <span className="font-semibold">{correct ? "✓ 正確" : "✗ 錯誤"}</span>
            {"explanationZh" in item && item.explanationZh && (
              <span className="mt-1 block text-[var(--color-ink-2)]">{item.explanationZh}</span>
            )}
            {item.kind === "matching" && !correct && (
              <span className="mt-1 block text-[var(--color-ink-2)]">
                正確配對：{item.pairs.map((p) => `${p.leftZh} → ${p.rightZh}`).join("；")}
              </span>
            )}
            {item.kind === "ordering" && !correct && (
              <span className="mt-1 block text-[var(--color-ink-2)]">
                正確順序：{item.correctOrder.join(" → ")}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button type="button" className="btn-primary" onClick={next} disabled={!answered}>
          {index + 1 >= total ? "查看結果" : "下一題 →"}
        </button>
      </div>
    </div>
  );
}

/* ── Matching ──────────────────────────────────────────────────────────── */

function MatchingBody({
  lefts,
  rights,
  selectedLeft,
  matched,
  onSelectLeft,
  onSelectRight,
}: {
  lefts: { leftZh: string; idx: number }[];
  rights: { label: string; idx: number }[];
  selectedLeft: number | null;
  matched: Record<number, number>;
  onSelectLeft(i: number): void;
  onSelectRight(ri: number): void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        {lefts.map((l) => {
          const isMatched = matched[l.idx] !== undefined;
          return (
            <button
              key={l.idx}
              type="button"
              disabled={isMatched}
              onClick={() => onSelectLeft(l.idx)}
              aria-pressed={selectedLeft === l.idx}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-150",
                isMatched
                  ? "border-emerald-500/40 bg-emerald-500/[0.07] text-emerald-300"
                  : selectedLeft === l.idx
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15"
                    : "cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25",
              )}
            >
              {l.leftZh}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {rights.map((r) => {
          const taken = Object.values(matched).includes(r.idx);
          return (
            <button
              key={r.idx}
              type="button"
              disabled={taken || selectedLeft === null}
              onClick={() => onSelectRight(r.idx)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-150",
                taken
                  ? "border-emerald-500/40 bg-emerald-500/[0.07] text-emerald-300"
                  : selectedLeft !== null
                    ? "cursor-pointer border-white/25 bg-white/[0.06] hover:bg-white/[0.1]"
                    : "border-white/10 bg-white/[0.03] text-[var(--color-ink-3)]",
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Ordering ──────────────────────────────────────────────────────────── */

function OrderingBody({
  initial,
  disabled,
  onCommit,
}: {
  initial: { id: string; label: string }[];
  disabled: boolean;
  onCommit(labels: string[]): void;
}) {
  const [arr, setArr] = useState(initial);
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    const next = [...arr];
    [next[i], next[j]] = [next[j], next[i]];
    setArr(next);
  };
  return (
    <div className="flex flex-col gap-2">
      {arr.map((it, i) => (
        <div
          key={it.id}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs">
            {i + 1}
          </span>
          <span className="flex-1 text-sm">{it.label}</span>
          <span className="flex gap-1">
            <button
              type="button"
              aria-label={`上移 ${it.label}`}
              disabled={disabled || i === 0}
              onClick={() => move(i, -1)}
              className="cursor-pointer rounded-md px-2 py-1 text-xs text-[var(--color-ink-2)] hover:bg-white/10 disabled:cursor-default disabled:opacity-30"
            >
              ▲
            </button>
            <button
              type="button"
              aria-label={`下移 ${it.label}`}
              disabled={disabled || i === arr.length - 1}
              onClick={() => move(i, 1)}
              className="cursor-pointer rounded-md px-2 py-1 text-xs text-[var(--color-ink-2)] hover:bg-white/10 disabled:cursor-default disabled:opacity-30"
            >
              ▼
            </button>
          </span>
        </div>
      ))}
      {!disabled && (
        <button
          type="button"
          className="btn-ghost self-start"
          onClick={() => onCommit(arr.map((a) => a.id))}
        >
          提交順序
        </button>
      )}
    </div>
  );
}

/** Deterministic shuffle so item options are stable across rerenders. */
function shuffleStable<T>(arr: T[], seed: string): T[] {
  const a = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) | 0;
    const j = Math.abs(h) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
