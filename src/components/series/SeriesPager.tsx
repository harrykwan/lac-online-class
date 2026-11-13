import Link from "next/link";
import { nextSeries, prevSeries } from "@/data/series";
import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";

export function SeriesPager({ series }: { series: Series }) {
  const prev = prevSeries(series.id);
  const next = nextSeries(series.id);
  return (
    <nav
      aria-label="系列導覽"
      className="mx-auto mb-4 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4"
    >
      {prev ? (
        <Link
          href={`/series/${prev.slug}/`}
          className="btn-ghost"
          style={{ color: accentVar(prev.accent) }}
        >
          ← {prev.number} {prev.titleZh}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/series/${next.slug}/`}
          className="btn-ghost"
          style={{ color: accentVar(next.accent) }}
        >
          {next.number} {next.titleZh} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
