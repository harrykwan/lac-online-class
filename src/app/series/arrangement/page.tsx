import type { Metadata } from "next";
import { SeriesPage } from "@/components/series/SeriesPage";
import { SERIES } from "@/data/series";

const series = SERIES.arrangement;

export const metadata: Metadata = {
  title: `${series.number} ${series.titleZh} ${series.titleEn}`,
  description: series.goalZh,
};

export default function Page() {
  return <SeriesPage id="arrangement" />;
}
