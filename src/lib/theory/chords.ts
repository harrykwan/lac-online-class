/** Chord formulas (semitone offsets from root) and helpers. */
import type { ChordTypeName } from "@/data/types";

export const CHORD_FORMULAS: Record<ChordTypeName, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  maj7: [0, 4, 7, 11],
  "7": [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  mMaj7: [0, 3, 7, 11],
};

export const CHORD_LABELS: Record<ChordTypeName, string> = {
  maj: "Major",
  min: "Minor",
  dim: "Diminished",
  aug: "Augmented",
  maj7: "Maj7",
  "7": "Dominant 7",
  m7: "m7",
  m7b5: "m7♭5",
  dim7: "dim7",
  mMaj7: "mMaj7",
};

export const TRIAD_TYPES: ChordTypeName[] = ["maj", "min", "dim", "aug"];
export const SEVENTH_TYPES: ChordTypeName[] = ["maj7", "7", "m7", "m7b5", "dim7", "mMaj7"];

export function chordMidis(rootMidi: number, type: ChordTypeName): number[] {
  return CHORD_FORMULAS[type].map((s) => rootMidi + s);
}

export function chordFormulaString(type: ChordTypeName): string {
  return CHORD_FORMULAS[type].join("-");
}
