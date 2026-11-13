import Link from "next/link";
import { roadmap } from "@/data/site";
import { SERIES } from "@/data/series";
import { accentVar } from "@/lib/accents";

export function RoadmapTimeline() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent-2)] uppercase">
        Development Roadmap
      </p>
      <h2 className="section-title mt-2">整體課程開發次序</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-2)]">
        不要五個 Series 同時開發，而是按知識依賴關係進行。
      </p>
      <ol className="relative mt-10 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[13px] before:w-px before:bg-[var(--color-line)] sm:space-y-0 sm:before:left-1/2">
        {roadmap.map((phase) => (
          <li key={phase.phase} className="relative sm:grid sm:grid-cols-2 sm:gap-8">
            <span
              aria-hidden="true"
              className="absolute top-5 left-[6px] z-10 h-4 w-4 rounded-full border-2 border-[var(--color-base)] sm:left-1/2 sm:-translate-x-1/2"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className={
                phase.phase % 2 === 1
                  ? "ml-10 sm:col-start-1 sm:mr-0 sm:ml-0 sm:pr-12 sm:text-right"
                  : "ml-10 sm:col-start-2 sm:pl-12"
              }
            >
              <div className="card card-raised inline-block w-full max-w-md p-5">
                <p className="text-xs font-semibold tracking-widest text-[var(--color-accent-2)]">
                  PHASE {phase.phase}
                </p>
                <h3 className="mt-1 font-bold">
                  {phase.titleZh}
                  <span className="ml-2 text-xs font-medium text-[var(--color-ink-3)]">
                    {phase.titleEn}
                  </span>
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">{phase.descZh}</p>
                <div className="mt-3 flex flex-wrap gap-2 sm:justify-inherit">
                  {phase.seriesIds.map((id) => {
                    const s = SERIES[id];
                    return (
                      <Link
                        key={id}
                        href={`/series/${s.slug}/`}
                        className="pill cursor-pointer transition-colors hover:text-[var(--color-ink)]"
                        style={{ color: accentVar(s.accent) }}
                      >
                        {s.number} {s.titleEn}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
