/** Scale formulas, key spelling, relative/parallel keys. */
import { pcToName } from "./notes";
import type { ScaleTypeName } from "@/data/types";

/** Semitone offsets within one octave. */
export const SCALE_FORMULAS: Record<ScaleTypeName, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  "natural-minor": [0, 2, 3, 5, 7, 8, 10],
  "harmonic-minor": [0, 2, 3, 5, 7, 8, 11],
  "melodic-minor": [0, 2, 3, 5, 7, 9, 11],
};

export const SCALE_LABELS: Record<ScaleTypeName, string> = {
  major: "Major 大調",
  "natural-minor": "Natural Minor 自然小調",
  "harmonic-minor": "Harmonic Minor 和聲小調",
  "melodic-minor": "Melodic Minor 旋律小調",
};

export const KEY_ROOTS = ["C", "G", "D", "A", "E", "B", "F♯", "F", "B♭", "E♭", "A♭", "D♭"] as const;

export function scaleMidis(keyRoot: string, type: ScaleTypeName, startMidi: number): number[] {
  const rootPc = pcOf(keyRoot);
  const anchor = startMidi + ((rootPc - (startMidi % 12) + 12) % 12);
  return SCALE_FORMULAS[type].map((s) => anchor + s);
}

export function pcOf(keyRoot: string): number {
  const map: Record<string, number> = {
    C: 0, "C♯": 1, D: 2, "D♯": 3, E: 4, F: 5, "F♯": 6, G: 7, "G♯": 8, A: 9, "A♯": 10, B: 11,
    "B♭": 10, "E♭": 3, "A♭": 8, "D♭": 1,
  };
  const pc = map[keyRoot];
  if (pc === undefined) throw new Error(`Unknown key root: ${keyRoot}`);
  return pc;
}

/** Spelled note names for a scale (simple sharp-based spelling). */
export function scaleNoteNames(keyRoot: string, type: ScaleTypeName): string[] {
  const rootPc = pcOf(keyRoot);
  return SCALE_FORMULAS[type].map((s) => pcToName(rootPc + s));
}

export function scaleFormulaString(type: ScaleTypeName): string {
  const s = SCALE_FORMULAS[type];
  const steps: string[] = [];
  for (let i = 1; i < s.length; i++) {
    steps.push(s[i] - s[i - 1] === 2 ? "W" : "H");
  }
  return `${steps.join("-")}-H`;
}

export const RELATIVE_MINOR_OFFSET = 9; // C major → A minor
