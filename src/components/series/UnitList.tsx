"use client";

import { useState } from "react";
import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";
import { useProgress } from "@/context/ProgressContext";
import { UnitCheckbox } from "@/components/progress/UnitCheckbox";
import { WidgetMount } from "@/components/interactive/WidgetMount";
import { cn } from "@/lib/cn";

/** Full unit list with persisted checkboxes and inline widgets. */
export function UnitList({ series }: { series: Series }) {
  const accent = accentVar(series.accent);
  const progress = useProgress();
  const [expanded, setExpanded] = useState<string | null>(series.units[0]?.code ?? null);
  const doneCount = series.units.filter((u) => progress.isUnitDone(u.code)).length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="section-title">單元內容 Units</h2>
        <p className="text-sm text-[var(--color-ink-3)]">
          已完成 {doneCount} / {series.units.length} — 勾選以記錄進度
        </p>
      </div>

      <ol className="mt-6 flex flex-col gap-2">
        {series.units.map((unit) => {
          const done = progress.isUnitDone(unit.code);
          const isOpen = expanded === unit.code;
          return (
            <li
              key={unit.code}
              className={cn(
                "card overflow-hidden transition-colors duration-150",
                isOpen && "border-white/20",
              )}
              style={done ? { borderColor: `color-mix(in srgb, ${accent} 35%, transparent)` } : undefined}
            >
              <div className="flex items-start gap-3 p-4">
                <UnitCheckbox
                  done={done}
                  onToggle={() => progress.toggleUnit(unit.code)}
                  label={`完成 ${unit.code} ${unit.titleZh}`}
                  accent={accent}
                />
                <button
                  type="button"
                  className="flex flex-1 cursor-pointer items-start justify-between gap-3 text-left"
                  onClick={() => setExpanded(isOpen ? null : unit.code)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <span className="font-mono text-xs" style={{ color: accent }}>
                      {unit.code}
                    </span>
                    <span className={cn("ml-2 font-medium", done && "text-[var(--color-ink-3)] line-through decoration-1")}>
                      {unit.titleZh}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--color-ink-3)]">{unit.titleEn}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1 text-xs text-[var(--color-ink-3)] transition-transform duration-150",
                      isOpen && "rotate-180",
                    )}
                  >
                    ▼
                  </span>
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-white/[0.06] px-4 pt-4 pb-4">
                  {unit.focusZh && !unit.lesson && (
                    <p className="text-sm leading-relaxed text-[var(--color-ink-2)]">
                      <span className="font-semibold" style={{ color: accent }}>
                        學習重點 ·{" "}
                      </span>
                      {unit.focusZh}
                    </p>
                  )}
                  {unit.lesson && (
                    <div className="flex flex-col gap-4">
                      {unit.lesson.conceptZh.map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed text-[var(--color-ink-2)]">
                          {para}
                        </p>
                      ))}
                      {unit.lesson.pointsZh.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>
                            Key Points
                          </p>
                          <ul className="mt-1.5 flex flex-col gap-1.5">
                            {unit.lesson.pointsZh.map((pt, i) => (
                              <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink-2)]">
                                <span className="font-mono text-xs" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {unit.lesson.listenZh && (
                        <div>
                          <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>
                            聽感訓練 Listen
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-2)]">{unit.lesson.listenZh}</p>
                        </div>
                      )}
                      {unit.lesson.practiceZh && (
                        <div>
                          <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>
                            落手做 Practice
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-2)]">{unit.lesson.practiceZh}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {unit.widget && (
                    <div className="mt-4">
                      <WidgetMount id={unit.widget} accent={accent} />
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
