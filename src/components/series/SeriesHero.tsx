import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";
import { ProgressRingLive } from "./ProgressRingLive";

export function SeriesHero({ series }: { series: Series }) {
  const accent = accentVar(series.accent);
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(560px 260px at 15% 0%, color-mix(in srgb, ${accent} 20%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-xs font-semibold"
            style={{
              color: accent,
              border: `1px solid color-mix(in srgb, ${accent} 40%, transparent)`,
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            }}
          >
            {series.number}
          </span>
          <span className="pill">Phase {series.phase}</span>
          {series.dependsOn.length > 0 && (
            <span className="hidden text-xs text-[var(--color-ink-3)] sm:inline">
              建議先完成：{series.dependsOn.join(" → ")}
            </span>
          )}
        </div>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              {series.titleZh}
              <span className="mt-1 block text-lg font-medium text-[var(--color-ink-3)]">
                {series.titleEn}
              </span>
            </h1>
            <p className="mt-4 leading-relaxed text-[var(--color-ink-2)]">{series.goalZh}</p>
          </div>
          <ProgressRingLive seriesId={series.id} accent={accent} />
        </div>
      </div>
    </section>
  );
}
