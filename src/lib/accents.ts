import type { AccentToken } from "@/data/types";

const ACCENT_VARS: Record<AccentToken, string> = {
  srhythm: "var(--color-srhythm)",
  stheory: "var(--color-stheory)",
  scomposition: "var(--color-scomposition)",
  slogic: "var(--color-slogic)",
  sarrangement: "var(--color-sarrangement)",
  smixing: "var(--color-smixing)",
};

export function accentVar(token: AccentToken): string {
  return ACCENT_VARS[token];
}
