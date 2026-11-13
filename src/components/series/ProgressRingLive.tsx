"use client";

import { useProgress } from "@/context/ProgressContext";
import { ProgressRing } from "@/components/progress/ProgressRing";
import type { SeriesId } from "@/data/types";

/** Progress ring bound to the live progress store. */
export function ProgressRingLive({
  seriesId,
  accent,
  size = 72,
}: {
  seriesId: SeriesId;
  accent: string;
  size?: number;
}) {
  const progress = useProgress();
  const p = progress.seriesProgress(seriesId);
  return (
    <div className="flex items-center gap-3">
      <ProgressRing
        value={p.pct}
        accent={accent}
        size={size}
        labelZh={`已完成 ${p.done} / ${p.total} 個單元`}
      />
      <p className="text-xs text-[var(--color-ink-3)]">
        {p.done} / {p.total} Units
      </p>
    </div>
  );
}
