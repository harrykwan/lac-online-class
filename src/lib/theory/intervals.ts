/** Interval definitions and helpers. */

export interface IntervalDef {
  id: string;
  label: string;
  labelZh: string;
  semitones: number;
}

export const INTERVALS: IntervalDef[] = [
  { id: "m2", label: "Minor 2nd", labelZh: "小二度", semitones: 1 },
  { id: "M2", label: "Major 2nd", labelZh: "大二度", semitones: 2 },
  { id: "m3", label: "Minor 3rd", labelZh: "小三度", semitones: 3 },
  { id: "M3", label: "Major 3rd", labelZh: "大三度", semitones: 4 },
  { id: "P4", label: "Perfect 4th", labelZh: "完全四度", semitones: 5 },
  { id: "TT", label: "Tritone", labelZh: "三全音", semitones: 6 },
  { id: "P5", label: "Perfect 5th", labelZh: "完全五度", semitones: 7 },
  { id: "m6", label: "Minor 6th", labelZh: "小六度", semitones: 8 },
  { id: "M6", label: "Major 6th", labelZh: "大六度", semitones: 9 },
  { id: "m7", label: "Minor 7th", labelZh: "小七度", semitones: 10 },
  { id: "M7", label: "Major 7th", labelZh: "大七度", semitones: 11 },
  { id: "P8", label: "Octave", labelZh: "八度", semitones: 12 },
];
