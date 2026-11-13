"use client";

import Link from "next/link";
import { SERIES, SERIES_ORDER } from "@/data/series";
import { useProgress } from "@/context/ProgressContext";
import { accentVar } from "@/lib/accents";
import { ProgressRing } from "@/components/progress/ProgressRing";

export function SeriesCardGrid() {
  const progress = useProgress();
  return (
    <div id="series" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SERIES_ORDER.map((id) => {
        const s = SERIES[id];
        const accent = accentVar(s.accent);
        const p = progress.seriesProgress(id);
        return (
          <Link
            key={id}
            href={`/series/${s.slug}/`}
            className="card card-raised group relative overflow-hidden p-6 transition-colors duration-150 hover:border-white/30"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: accent }}
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-sm" style={{ color: accent }}>
                  {s.number}
                </span>
                <h3 className="mt-1 text-lg leading-snug font-bold group-hover:underline">
                  {s.titleZh}
                  <span className="mt-0.5 block text-xs font-medium text-[var(--color-ink-3)]">
                    {s.titleEn}
                  </span>
                </h3>
              </div>
              <ProgressRing value={p.pct} accent={accent} size={48} labelZh={`${s.titleZh}進度 ${p.pct}%`} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-2)]">{s.taglineZh}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="pill">Phase {s.phase}</span>
              <span className="pill">{s.units.length} Units</span>
              <span className="pill">{s.assignment.titleZh}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
