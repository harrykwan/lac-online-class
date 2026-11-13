import { aiFeatures, aiVisionZh } from "@/data/site";

export function AiVisionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="card card-raised relative overflow-hidden p-8 sm:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(500px 240px at 85% 0%, rgba(45,212,191,0.14), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent-2)] uppercase">
              Beta App — 未來功能
            </p>
            <span className="pill">AI</span>
          </div>
          <h2 className="section-title mt-2">不只是音樂考試平台</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-2)]">
            Beta App 初期先與課程內容一一對應；未來加入以下三種 AI 功能，成為真正的音樂學習平台。
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {aiFeatures.map((f) => (
              <div key={f.nameEn} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-xs text-[var(--color-accent-2)]">{f.nameEn}</p>
                <h3 className="mt-1 font-bold">{f.titleZh}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-2)]">{f.descZh}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-medium text-[var(--color-accent-2)]">{aiVisionZh}</p>
        </div>
      </div>
    </section>
  );
}
