"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SERIES } from "@/data/series";
import type { SeriesId } from "@/data/types";
import {
  getServerSnapshot,
  getSnapshot,
  initialize,
  isHydrated,
  resetProgress,
  subscribe,
  updateProgress,
} from "@/lib/progress/store";

export interface ProgressApi {
  /** false until localStorage has been read on the client. */
  hydrated: boolean;
  isUnitDone(code: string): boolean;
  toggleUnit(code: string): void;
  isAssignmentStepDone(key: string): boolean;
  toggleAssignmentStep(key: string): void;
  recordQuiz(id: string, score: number, total: number): void;
  getQuizScore(id: string): { best: number; total: number; attempts: number } | undefined;
  seriesProgress(id: SeriesId): { done: number; total: number; pct: number };
  resetAll(): void;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  // External store: server snapshot (empty) during SSR/hydration, then the
  // client snapshot after `initialize()` reads localStorage.
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(subscribe, isHydrated, () => false);

  useEffect(() => {
    initialize();
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      hydrated,
      isUnitDone: (code) => state.units[code]?.done ?? false,
      toggleUnit: (code) =>
        updateProgress((prev) => {
          const units = { ...prev.units };
          if (units[code]?.done) delete units[code];
          else units[code] = { done: true, at: new Date().toISOString() };
          return { ...prev, units };
        }),
      isAssignmentStepDone: (key) => state.assignmentSteps[key] ?? false,
      toggleAssignmentStep: (key) =>
        updateProgress((prev) => {
          const assignmentSteps = { ...prev.assignmentSteps };
          assignmentSteps[key] = !assignmentSteps[key];
          return { ...prev, assignmentSteps };
        }),
      recordQuiz: (id, score, total) =>
        updateProgress((prev) => ({
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [id]: {
              best: Math.max(prev.quizScores[id]?.best ?? 0, score),
              total,
              attempts: (prev.quizScores[id]?.attempts ?? 0) + 1,
            },
          },
        })),
      getQuizScore: (id) => {
        const s = state.quizScores[id];
        return s ? { best: s.best, total: s.total, attempts: s.attempts } : undefined;
      },
      seriesProgress: (id) => {
        const units = SERIES[id].units;
        const done = units.filter((u) => state.units[u.code]?.done).length;
        const total = units.length;
        return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
      },
      resetAll: resetProgress,
    }),
    [state, hydrated],
  );

  return (
    <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
