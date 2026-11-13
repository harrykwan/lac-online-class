"use client";

import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";
import { useProgress } from "@/context/ProgressContext";
import { UnitCheckbox } from "@/components/progress/UnitCheckbox";
import { ProgressBar } from "@/components/progress/ProgressBar";

export function AssignmentCard({ series }: { series: Series }) {
  const accent = accentVar(series.accent);
  const progress = useProgress();
  const a = series.assignment;
  const doneSteps = a.stepsZh.filter((_, i) => progress.isAssignmentStepDone(`${a.code}:${i}`)).length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="card card-raised relative overflow-hidden p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: accent }}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-semibold" style={{ color: accent }}>
              {a.code} · PRACTICAL ASSIGNMENT
            </p>
            <h2 className="section-title mt-1">{a.titleZh}</h2>
          </div>
          <span className="pill">🛠 {a.tool}</span>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-2)]">{a.deliverableZh}</p>

        <div className="mt-4 max-w-md">
          <div className="mb-1.5 flex justify-between text-xs text-[var(--color-ink-3)]">
            <span>作業進度</span>
            <span>
              {doneSteps} / {a.stepsZh.length}
            </span>
          </div>
          <ProgressBar value={doneSteps} max={a.stepsZh.length} accent={accent} labelZh="作業進度" />
        </div>

        <ol className="mt-6 flex flex-col gap-2.5">
          {a.stepsZh.map((step, i) => {
            const key = `${a.code}:${i}`;
            const done = progress.isAssignmentStepDone(key);
            return (
              <li key={key} className="flex items-start gap-3">
                <UnitCheckbox
                  done={done}
                  onToggle={() => progress.toggleAssignmentStep(key)}
                  label={`作業步驟 ${i + 1}`}
                  accent={accent}
                />
                <span
                  className={
                    done
                      ? "text-sm leading-relaxed text-[var(--color-ink-3)] line-through decoration-1"
                      : "text-sm leading-relaxed text-[var(--color-ink-2)]"
                  }
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-5 text-xs text-[var(--color-ink-3)]">
          關聯單元：{a.linkedUnits.join(" · ")}
        </p>
      </div>
    </section>
  );
}
