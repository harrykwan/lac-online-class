/**
 * Module-level progress store with subscription — consumed via
 * useSyncExternalStore so SSR renders the empty snapshot and the client
 * hydrates from localStorage without cascading setState-in-effect.
 */
import {
  emptyProgress,
  loadProgress,
  saveProgress,
  type ProgressState,
} from "./storage";

let state: ProgressState = emptyProgress();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): ProgressState {
  return state;
}

export function getServerSnapshot(): ProgressState {
  return EMPTY;
}

const EMPTY = emptyProgress();

export function isHydrated(): boolean {
  return hydrated;
}

/** Called once from a mount effect: reads localStorage, notifies subscribers. */
export function initialize(): void {
  if (hydrated) return;
  state = loadProgress();
  hydrated = true;
  emit();
  // async cloud merge — falls back silently when logged out / offline
  import("./remote").then(async ({ pullRemote, mergeStates }) => {
    const remote = await pullRemote();
    if (remote) {
      state = mergeStates(state, remote);
      saveProgress(state);
      emit();
    }
  }).catch(() => {});
}

export function updateProgress(fn: (prev: ProgressState) => ProgressState): void {
  state = fn(state);
  saveProgress(state);
  emit();
  import("./remote").then(({ scheduleSync }) => scheduleSync(state)).catch(() => {});
}

export function resetProgress(): void {
  state = emptyProgress();
  saveProgress(state);
  emit();
}
