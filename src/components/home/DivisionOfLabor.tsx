import { division } from "@/data/site";
import { cn } from "@/lib/cn";

const TONE_STYLES: Record<string, { accent: string; icon: string }> = {
  course: { accent: "var(--color-accent)", icon: "📚" },
  app: { accent: "var(--color-accent-2)", icon: "🎯" },
  creation: { accent: "var(--color-warn)", icon: "🎛️" },
};

export function DivisionOfLabor() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="section-title text-center">清晰的分工</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-2)]">
        IAC 課程與 App 各司其職，再加實際創作任務把知識變成音樂。
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {division.map((d) => {
          const tone = TONE_STYLES[d.tone];
          return (
            <div key={d.titleZh} className="card card-raised p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                  style={{
                    background: `color-mix(in srgb, ${tone.accent} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${tone.accent} 35%, transparent)`,
                  }}
                >
                  {tone.icon}
                </span>
                <div>
                  <h3 className="font-bold" style={{ color: tone.accent }}>
                    {d.titleZh}
                  </h3>
                  <p className="text-xs text-[var(--color-ink-3)]">{d.titleEn}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {d.itemsZh.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-ink-2)]">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: tone.accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-4", className)}>{children}</div>;
}
