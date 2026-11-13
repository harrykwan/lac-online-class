"use client";

import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";
import { WidgetMount } from "@/components/interactive/WidgetMount";
import { getQuizSet } from "@/data/quizzes";
import { QuizEngine } from "@/components/interactive/QuizEngine";

const WIDGET_TITLES: Record<string, { titleZh: string; titleEn: string }> = {
  "rhythm-player": { titleZh: "節奏播放器", titleEn: "Rhythm Player" },
  "rhythm-grid": { titleZh: "鼓組編程格線", titleEn: "Drum Pattern Grid" },
  "piano-keyboard": { titleZh: "互動鍵盤", titleEn: "Interactive Keyboard" },
  "interval-trainer": { titleZh: "音程聽辨訓練", titleEn: "Interval Trainer" },
  "chord-quality-trainer": { titleZh: "和弦品質聽辨", titleEn: "Chord Quality Trainer" },
  "scale-explorer": { titleZh: "音階探索器", titleEn: "Scale Explorer" },
  "key-signature-match": { titleZh: "調號配對", titleEn: "Key Signature Match" },
  "chord-tone-trainer": { titleZh: "和弦音選擇訓練", titleEn: "Chord Tone Trainer" },
  "eq-explorer": { titleZh: "EQ 頻率探索", titleEn: "EQ Explorer" },
  "compressor-visualizer": { titleZh: "壓縮器視覺化", titleEn: "Compressor Visualizer" },
  "reverb-demo": { titleZh: "混響示範", titleEn: "Reverb Demo" },
};

export function SeriesPlayground({ series }: { series: Series }) {
  const accent = accentVar(series.accent);
  const quizSet = getQuizSet(series.id);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="section-title">互動練習區</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-2)]">
        對應 Beta App 核心功能 — 在這裡直接試用本系列的聽力訓練與知識測試。
      </p>
      <div className="mt-6 flex flex-col gap-6">
        {series.playground.map((id) => (
          <div key={id} className="card card-raised p-6">
            <div className="mb-4 flex items-baseline gap-2">
              <h3 className="font-bold">{WIDGET_TITLES[id]?.titleZh ?? id}</h3>
              <span className="text-xs text-[var(--color-ink-3)]">
                {WIDGET_TITLES[id]?.titleEn ?? id}
              </span>
            </div>
            <WidgetMount id={id} accent={accent} />
          </div>
        ))}
        {quizSet && <QuizEngine quizSet={quizSet} accent={accent} />}
      </div>
    </section>
  );
}
