"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { playNote } from "@/lib/audio/voices";
import { isBlackKey, midiToName } from "@/lib/theory/notes";
import { cn } from "@/lib/cn";

export type KeyHighlightRole =
  | "root"
  | "target"
  | "chord-tone"
  | "scale"
  | "off-key";

const ROLE_COLORS: Record<KeyHighlightRole, string> = {
  root: "#8b5cf6",
  target: "#f59e0b",
  "chord-tone": "#2dd4bf",
  scale: "rgba(230, 234, 242, 0.22)",
  "off-key": "#f87171",
};

export function PianoKeyboard({
  startMidi = 60,
  octaves = 2,
  labels = "none",
  highlights,
  onNotePlayed,
  readOnly = false,
  className,
}: {
  startMidi?: number;
  octaves?: number;
  labels?: "none" | "letters";
  highlights?: Record<number, KeyHighlightRole>;
  onNotePlayed?: (midi: number) => void;
  readOnly?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState<Set<number>>(new Set());
  const draggingRef = useRef(false);

  const end = startMidi + octaves * 12;
  const allMidis: number[] = [];
  for (let m = startMidi; m < end; m++) allMidis.push(m);
  const whiteMidis = allMidis.filter((m) => !isBlackKey(m % 12));

  const press = useCallback(
    (midi: number) => {
      if (readOnly) return;
      playNote(midi, getAudioEngine().now() + 0.01, 0.6);
      onNotePlayed?.(midi);
      setActive((prev) => new Set(prev).add(midi));
      window.setTimeout(() => {
        setActive((prev) => {
          const next = new Set(prev);
          next.delete(midi);
          return next;
        });
      }, 200);
    },
    [readOnly, onNotePlayed],
  );

  // Black key horizontal placement (fraction of a white key's width).
  const BLACK_OFFSET: Record<number, number> = {
    1: -0.12, // C♯
    3: 0.12, // D♯
    6: -0.14, // F♯
    8: 0, // G♯
    10: 0.14, // A♯
  };

  const blackPosition = (midi: number): { whiteIndex: number; offset: number } | null => {
    const pc = midi % 12;
    if (!isBlackKey(pc)) return null;
    const whiteIndex = whiteMidis.filter((w) => w < midi).length;
    return { whiteIndex, offset: BLACK_OFFSET[pc] ?? 0 };
  };

  const handlePointerDown = (midi: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    press(midi);
  };
  const handlePointerEnter = (midi: number) => () => {
    if (draggingRef.current) press(midi);
  };

  useEffect(() => {
    const release = () => (draggingRef.current = false);
    window.addEventListener("pointerup", release);
    return () => window.removeEventListener("pointerup", release);
  }, []);

  return (
    <div
      role="group"
      aria-label="互動鍵盤 Interactive keyboard"
      className={cn("relative w-full touch-none select-none", className)}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerLeave={() => (draggingRef.current = false)}
    >
      <div className="relative flex h-40 w-full sm:h-48">
        {/* white keys */}
        {whiteMidis.map((midi) => {
          const hl = highlights?.[midi];
          const isAct = active.has(midi);
          return (
            <button
              key={midi}
              type="button"
              aria-label={midiToName(midi)}
              disabled={readOnly}
              onPointerDown={handlePointerDown(midi)}
              onPointerEnter={handlePointerEnter(midi)}
              className="group relative min-w-0 flex-1 cursor-pointer rounded-b-lg border border-[var(--color-line)] bg-gradient-to-b from-[#f4f6fa] to-[#c9cfdd] transition-[filter] duration-75 disabled:cursor-default"
              style={hl ? { boxShadow: `inset 0 -14px 0 0 ${ROLE_COLORS[hl]}` } : undefined}
            >
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-1.5 text-center text-[10px] font-semibold text-slate-500",
                  isAct && "text-slate-800",
                )}
              >
                {labels === "letters" ? midiToName(midi) : ""}
              </span>
              {isAct && (
                <span className="pointer-events-none absolute inset-0 rounded-b-lg bg-[var(--color-accent)]/30" />
              )}
            </button>
          );
        })}
        {/* black keys */}
        {allMidis.filter((m) => isBlackKey(m % 12)).map((midi) => {
          const pos = blackPosition(midi);
          if (!pos) return null;
          const hl = highlights?.[midi];
          const isAct = active.has(midi);
          return (
            <button
              key={midi}
              type="button"
              aria-label={midiToName(midi)}
              disabled={readOnly}
              onPointerDown={handlePointerDown(midi)}
              onPointerEnter={handlePointerEnter(midi)}
              className="absolute top-0 z-10 h-[62%] cursor-pointer rounded-b-md border border-black/60 bg-gradient-to-b from-[#2a2f3c] to-[#10131b] shadow-lg transition-[filter] duration-75 disabled:cursor-default"
              style={{
                left: `calc(${(pos.whiteIndex / whiteMidis.length) * 100}% + ${pos.offset} * (100% / ${whiteMidis.length}) - 0.3 * (100% / ${whiteMidis.length}))`,
                width: `calc(0.6 * (100% / ${whiteMidis.length}))`,
                ...(hl ? { boxShadow: `inset 0 -10px 0 0 ${ROLE_COLORS[hl]}` } : undefined),
              }}
            >
              {isAct && (
                <span className="pointer-events-none absolute inset-0 rounded-b-md bg-[var(--color-accent)]/40" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
