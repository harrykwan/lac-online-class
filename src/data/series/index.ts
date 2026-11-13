import type { Series, SeriesId } from "../types";
import { rhythmSeries } from "./01-rhythm";
import { theorySeries } from "./02-theory";
import { compositionSeries } from "./03-composition";
import { logicProSeries } from "./04-logic-pro";
import { arrangementSeries, mixingSeries } from "./05-arrangement-mixing";

/** Exhaustive registry — a missing/typo'd series id is a compile error. */
export const SERIES: Record<SeriesId, Series> = {
  rhythm: rhythmSeries,
  theory: theorySeries,
  composition: compositionSeries,
  "logic-pro": logicProSeries,
  arrangement: arrangementSeries,
  mixing: mixingSeries,
};

/** Display order follows the development roadmap (知識依賴關係). */
export const SERIES_ORDER: SeriesId[] = [
  "rhythm",
  "theory",
  "composition",
  "logic-pro",
  "arrangement",
  "mixing",
];

export function getSeries(id: SeriesId): Series {
  return SERIES[id];
}

export function seriesIndex(id: SeriesId): number {
  return SERIES_ORDER.indexOf(id);
}

export function nextSeries(id: SeriesId): Series | null {
  const i = seriesIndex(id);
  return i >= 0 && i < SERIES_ORDER.length - 1 ? SERIES[SERIES_ORDER[i + 1]] : null;
}

export function prevSeries(id: SeriesId): Series | null {
  const i = seriesIndex(id);
  return i > 0 ? SERIES[SERIES_ORDER[i - 1]] : null;
}
