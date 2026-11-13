/** Note naming / MIDI helpers. Pure functions, unit-testable. */

export const SHARP_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"] as const;
export const LETTER_NAMES = ["C", "D", "E", "F", "G", "A", "B"] as const;

const SHARP_PC: Record<string, number> = {
  C: 0, "C♯": 1, D: 2, "D♯": 3, E: 4, F: 5, "F♯": 6, G: 7, "G♯": 8, A: 9, "A♯": 10, B: 11,
};

export function pcToName(pc: number): string {
  return SHARP_NAMES[((pc % 12) + 12) % 12];
}

export function nameToPc(name: string): number {
  const pc = SHARP_PC[name];
  if (pc === undefined) throw new Error(`Unknown note name: ${name}`);
  return pc;
}

export function isBlackKey(pc: number): boolean {
  return [1, 3, 6, 8, 10].includes(((pc % 12) + 12) % 12);
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/** "C4" (middle C = MIDI 60) */
export function midiToName(midi: number): string {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${pcToName(pc)}${octave}`;
}
