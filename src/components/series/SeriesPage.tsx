import type { SeriesId } from "@/data/types";
import { SERIES, seriesIndex, SERIES_ORDER } from "@/data/series";
import { assessmentNoteZh } from "@/data/site";
import { SeriesHero } from "./SeriesHero";
import { StageExplainer } from "./StageExplainer";
import { UnitList } from "./UnitList";
import { AppPracticePanel } from "./AppPracticePanel";
import { SeriesPlayground } from "./SeriesPlayground";
import { AssignmentCard } from "./AssignmentCard";
import { SeriesSidebar } from "./SeriesSidebar";
import { SeriesPager } from "./SeriesPager";
import { accentVar } from "@/lib/accents";

/**
 * Shared composition for every series page, following the IAC Standard
 * Lesson Format: hero → stages → units (with widgets) → app practice →
 * playground → assignment → assessment.
 */
export function SeriesPage({ id }: { id: SeriesId }) {
  const series = SERIES[id];
  const accent = accentVar(series.accent);
  const isLast = seriesIndex(id) === SERIES_ORDER.length - 1;
  return (
    <>
      <SeriesHero series={series} />
      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-[15rem_1fr] lg:gap-6">
        <div className="lg:col-start-1 lg:row-start-1 lg:pt-6 lg:pl-4">
          <SeriesSidebar series={series} />
        </div>
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <StageExplainer series={series} />
          <UnitList series={series} />
          <AppPracticePanel series={series} />
          <SeriesPlayground series={series} />
          <AssignmentCard series={series} />
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div
          className="rounded-2xl border px-5 py-4 text-sm leading-relaxed"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
            background: `color-mix(in srgb, ${accent} 7%, transparent)`,
            color: "var(--color-ink-2)",
          }}
        >
          <span className="font-semibold" style={{ color: accent }}>
            Assessment 學習驗收 ·{" "}
          </span>
          {assessmentNoteZh}
        </div>
      </section>
      <SeriesPager series={series} />
      {isLast && (
        <p className="mx-auto max-w-6xl px-4 pb-4 text-center text-xs text-[var(--color-ink-3)]">
          你已完成所有系列的路線圖 — 用實際創作任務把五個系列的知識變成音樂。
        </p>
      )}
    </>
  );
}
