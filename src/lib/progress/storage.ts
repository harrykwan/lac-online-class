/** localStorage-backed progress persistence, hydration-safe. */

export interface UnitRecord {
  done: boolean;
  at?: string;
}

export interface QuizScore {
  best: number;
  total: number;
  attempts: number;
}

export interface ProgressState {
  version: 1;
  /** key: unit code, e.g. "1.1", "05B.4" */
  units: Record<string, UnitRecord>;
  /** key: "AS-01:2" (assignment code + step index) */
  assignmentSteps: Record<string, boolean>;
  /** key: quiz set id */
  quizScores: Record<string, QuizScore>;
  updatedAt: string;
}

export const STORAGE_KEY = "iac.progress.v1";

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    units: {},
    assignmentSteps: {},
    quizScores: {},
    updatedAt: "",
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (parsed.version !== 1) return emptyProgress();
    return {
      version: 1,
      units: parsed.units ?? {},
      assignmentSteps: parsed.assignmentSteps ?? {},
      quizScores: parsed.quizScores ?? {},
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // storage unavailable (private mode etc.) — progress stays in-memory
  }
}
