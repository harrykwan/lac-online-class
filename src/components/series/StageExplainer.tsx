import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";

/** Renders the series' teaching stages (知識遞進 / 工作流程). */
export function StageExplainer({ series }: { series: Series }) {
  if (!series.stages?.length) return null;
  const accent = accentVar(series.accent);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="section-title">教學階段</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {series.stages.map((stage, i) => (
          <div key={stage.titleEn} className="card card-raised p-6">
            <p className="font-mono text-xs font-semibold" style={{ color: accent }}>
              {series.stages!.length > 1 ? `STAGE ${i + 1}` : "WORKFLOW"}
            </p>
            <h3 className="mt-1 font-bold">
              {stage.titleZh}
              <span className="ml-2 text-xs font-medium text-[var(--color-ink-3)]">
                {stage.titleEn}
              </span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-2)]">{stage.bodyZh}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
