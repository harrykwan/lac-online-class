import Link from "next/link";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <p className="pill mx-auto mb-6">{site.brandEn}</p>
        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
          {site.heroTitleZh}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-ink-2)] sm:text-lg">
          {site.heroSubtitleZh}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-3)]">
          {site.heroBodyZh}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={site.ctaHref} className="btn-primary px-6 py-3 text-base">
            {site.ctaZh} →
          </Link>
          <a href="#series" className="btn-ghost px-6 py-3 text-base">
            瀏覽五個系列
          </a>
        </div>
        {/* decorative waveform */}
        <div aria-hidden="true" className="mx-auto mt-12 flex max-w-2xl items-end justify-center gap-1.5">
          {WAVEFORM.map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-[1px]"
              style={{
                height: `${h}px`,
                background: `rgba(245,166,35,${0.35 + (i % 5) * 0.13})`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const WAVEFORM = [
  12, 28, 44, 26, 60, 36, 76, 48, 92, 40, 64, 28, 80, 52, 34, 68, 44, 24, 56, 36,
  20, 48, 30, 16, 40, 26, 14, 34, 22, 12, 28, 18, 10, 22, 14, 8,
];
