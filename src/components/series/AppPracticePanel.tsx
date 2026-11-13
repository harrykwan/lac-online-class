import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";

const KIND_LABELS: Record<string, string> = {
  mcq: "選擇",
  matching: "配對",
  ordering: "排序",
  dictation: "聽寫",
  ear: "聽辨",
  identify: "辨認",
};

export function AppPracticePanel({ series }: { series: Series }) {
  const accent = accentVar(series.accent);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="section-title">App 配對練習</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-2)]">
        IAC App 負責知識測試、聽力訓練、互動練習、即時評估及鞏固學習。以下是本系列的練習類型，
        全部已對應到本頁的互動元件。
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {series.appPractice.map((p) => (
          <li
            key={p.labelZh}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
          >
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
              style={{
                color: accent,
                background: `color-mix(in srgb, ${accent} 14%, transparent)`,
              }}
            >
              {KIND_LABELS[p.kind] ?? p.kind}
            </span>
            {p.labelZh}
          </li>
        ))}
      </ul>
    </section>
  );
}
