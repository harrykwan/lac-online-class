/** Key relationships: relative/parallel + basic diatonic harmony. */
import { pcToName } from "./notes";
import { pcOf } from "./scales";

export function relativeMinor(majorKey: string): string {
  return pcToName(pcOf(majorKey) + 9);
}

export function relativeMajor(minorKey: string): string {
  return pcToName(pcOf(minorKey) + 3);
}

export function parallelMinor(majorKey: string): string {
  return majorKey;
}

/** Diatonic triads of a major key as roman numerals with roots. */
export function majorDiatonic(keyRoot: string): { numeral: string; root: string; quality: string }[] {
  const pc = pcOf(keyRoot);
  const qualities = ["maj", "min", "min", "maj", "maj", "min", "dim"];
  const numerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
  const steps = [0, 2, 4, 5, 7, 9, 11];
  return numerals.map((numeral, i) => ({
    numeral,
    root: pcToName(pc + steps[i]),
    quality: qualities[i],
  }));
}

/** Borrowed chords commonly taken from the parallel minor. */
export function borrowedChords(majorKey: string): { label: string; root: string; quality: string }[] {
  const pc = pcOf(majorKey);
  return [
    { label: "iv", root: pcToName(pc + 5), quality: "min" },
    { label: "♭VI", root: pcToName(pc + 8), quality: "maj" },
    { label: "♭VII", root: pcToName(pc + 10), quality: "maj" },
  ];
}
