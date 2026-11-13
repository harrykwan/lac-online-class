"use client";
/**
 * Remote mirror for the progress store.
 * - After local initialize(): if logged in, GET server state and merge (union).
 * - After every local update: debounced whole-state PUT.
 * - localStorage stays the source of truth offline; server keeps the latest.
 */
import { getMe } from "@/lib/auth";
import type { ProgressState } from "./storage";

let timer: ReturnType<typeof setTimeout> | null = null;
let lastSynced: string | null = null;

export async function pullRemote(): Promise<ProgressState | null> {
  try {
    if (!(await getMe())) return null;
    const r = await fetch("/api/progress", { credentials: "include" });
    if (!r.ok) return null;
    const state = (await r.json()) as ProgressState;
    lastSynced = JSON.stringify(state);
    return state;
  } catch {
    return null;
  }
}

export function mergeStates(local: ProgressState, remote: ProgressState): ProgressState {
  const units = { ...remote.units };
  for (const [code, u] of Object.entries(local.units)) {
    const r = units[code];
    if (!r || (u.done && (!r.done || (u.at ?? "") > (r.at ?? "")))) units[code] = u;
    else if (!u.done && r.done) units[code] = r;
  }
  const quizScores = { ...remote.quizScores };
  for (const [id, q] of Object.entries(local.quizScores ?? {})) {
    const r = quizScores[id];
    if (!r || q.best > r.best) quizScores[id] = { best: Math.max(q.best, r?.best ?? 0), total: q.total, attempts: q.attempts + (r?.attempts ?? 0) };
  }
  return {
    version: 1,
    units,
    quizScores,
    assignmentSteps: { ...local.assignmentSteps, ...remote.assignmentSteps },
    updatedAt: new Date().toISOString(),
  };
}

export function scheduleSync(state: ProgressState) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    const s = JSON.stringify(state);
    if (s === lastSynced) return;
    try {
      const r = await fetch("/api/progress", {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" }, body: s,
      });
      if (r.ok) lastSynced = s;
    } catch { /* offline — retry on next update */ }
  }, 800);
}
