import { lessonFormat } from "@/data/site";

const STEP_ICONS = ["💡", "🗺️", "🎬", "🎯", "🛠️", "✅"];

export function LessonFormatDiagram() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent-2)] uppercase">
        IAC Standard Lesson Format
      </p>
      <h2 className="section-title mt-2">每一課統一的六個部分</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-2)]">
        不要每一課都只是影片加筆記 — 每個 Lesson 都由以下六個部分組成。
      </p>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessonFormat.map((part, i) => (
          <li key={part.step} className="card card-raised relative p-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-base"
                style={{
                  background: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)",
                }}
              >
                {STEP_ICONS[i]}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-widest text-[var(--color-ink-3)]">
                  STEP {part.step}
                </p>
                <h3 className="font-bold">{part.titleZh}</h3>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--color-ink-3)]">{part.titleEn}</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-2)]">{part.descZh}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
