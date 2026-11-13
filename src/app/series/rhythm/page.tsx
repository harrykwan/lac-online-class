import type { Metadata } from "next";
import { SeriesPage } from "@/components/series/SeriesPage";
import { SERIES } from "@/data/series";

const series = SERIES.rhythm;

export const metadata: Metadata = {
  title: `${series.number} ${series.titleZh} ${series.titleEn}`,
  description: series.goalZh,
};

export default function Page() {
  return <SeriesPage id="rhythm" />;
}
