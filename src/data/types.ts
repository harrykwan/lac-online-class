/** Core content types for the IAC Music Education System. */

export type SeriesId =
  | "rhythm"
  | "theory"
  | "composition"
  | "logic-pro"
  | "arrangement"
  | "mixing";

export type Phase = 1 | 2 | 3 | 4 | 5;

export type AccentToken =
  | "srhythm"
  | "stheory"
  | "scomposition"
  | "slogic"
  | "sarrangement"
  | "smixing";

export type PracticeKind =
  | "mcq"
  | "matching"
  | "ordering"
  | "dictation"
  | "ear"
  | "identify";

/** Interactive widget ids that can be embedded on a series page. */
export type WidgetId =
  | "rhythm-player"
  | "rhythm-grid"
  | "piano-keyboard"
  | "interval-trainer"
  | "chord-quality-trainer"
  | "scale-explorer"
  | "key-signature-match"
  | "chord-tone-trainer"
  | "eq-explorer"
  | "compressor-visualizer"
  | "reverb-demo";

export interface Lesson {
  /** 概念講解 — 2-4 段，取代淨 focusZh 嘅深度內容。 */
  conceptZh: string[];
  /** 核心要點（3-5 點，會打點渲染）。 */
  pointsZh: string[];
  /** 聽感訓練 — 點樣用耳驗證呢課（可選）。 */
  listenZh?: string;
  /** 落手練習 — 學生即刻做嘅嘢（可選）。 */
  practiceZh?: string;
}

export interface Unit {
  /** e.g. "1.1", "05B.4" */
  code: string;
  titleZh: string;
  titleEn: string;
  /** 1–2 sentence 學習重點, shown when the row is expanded. */
  focusZh?: string;
  /** Structured lesson content — the full teaching body. */
  lesson?: Lesson;
  /** Widget embedded inline with this unit. */
  widget?: WidgetId;
}

/** A teaching stage / knowledge ladder inside a series. */
export interface Stage {
  titleZh: string;
  titleEn: string;
  bodyZh: string;
  /** Unit codes belonging to this stage (informational grouping). */
  units?: string[];
}

export interface AppPractice {
  labelZh: string;
  kind: PracticeKind;
  /** Widget id that fulfils this practice in the web course. */
  widget?: WidgetId;
  /** Quiz set id that fulfils this practice. */
  quizSet?: string;
}

export interface Assignment {
  code: string;
  titleZh: string;
  tool: "Logic Pro" | "Keyboard" | "Logic Pro + Keyboard";
  deliverableZh: string;
  /** Checklist items — completion persisted per step. */
  stepsZh: string[];
  linkedUnits: string[];
}

export interface Series {
  id: SeriesId;
  number: "01" | "02" | "03" | "04" | "05A" | "05B";
  /** Route segment, e.g. "rhythm" → /series/rhythm/ */
  slug: string;
  titleZh: string;
  titleEn: string;
  taglineZh: string;
  goalZh: string;
  phase: Phase;
  dependsOn: SeriesId[];
  accent: AccentToken;
  stages?: Stage[];
  units: Unit[];
  appPractice: AppPractice[];
  assignment: Assignment;
  /** Widgets mounted in the series playground. */
  playground: WidgetId[];
}

/* ── Quiz content ────────────────────────────────────────────────────────── */

export type ChordTypeName =
  | "maj"
  | "min"
  | "dim"
  | "aug"
  | "maj7"
  | "7"
  | "m7"
  | "m7b5"
  | "dim7"
  | "mMaj7";

export type ScaleTypeName =
  | "major"
  | "natural-minor"
  | "harmonic-minor"
  | "melodic-minor";

export type AudioCue =
  | {
      type: "rhythm";
      bpm: number;
      /** 16-step pattern: indices of sounded 16th steps. */
      steps: number[];
      beatsPerBar?: number;
      swing?: boolean;
    }
  | {
      type: "straightVsSwing";
      bpm: number;
      swing: boolean;
    }
  | {
      type: "interval";
      rootMidi: number;
      semitones: number;
      mode: "melodic-asc" | "melodic-desc" | "harmonic";
    }
  | { type: "chord"; rootMidi: number; chordType: ChordTypeName }
  | { type: "scale"; key: string; scaleType: ScaleTypeName }
  | { type: "note"; midi: number };

export type QuizItem =
  | {
      id: string;
      kind: "mcq";
      promptZh: string;
      options: string[];
      answerIndex: number;
      explanationZh?: string;
      audio?: AudioCue;
    }
  | {
      id: string;
      kind: "audio-mcq";
      promptZh: string;
      audio: AudioCue;
      options: string[];
      answerIndex: number;
      explanationZh?: string;
    }
  | {
      id: string;
      kind: "matching";
      promptZh: string;
      pairs: { leftZh: string; rightZh: string }[];
    }
  | {
      id: string;
      kind: "ordering";
      promptZh: string;
      correctOrder: string[];
      explanationZh?: string;
    };

export interface QuizSet {
  id: string;
  titleZh: string;
  descriptionZh: string;
  items: QuizItem[];
}

/* ── Site-level content (home page) ─────────────────────────────────────── */

export interface DivisionItem {
  titleZh: string;
  titleEn: string;
  itemsZh: string[];
  tone: "course" | "app" | "creation";
}

export interface LessonFormatPart {
  step: number;
  titleZh: string;
  titleEn: string;
  descZh: string;
}

export interface RoadmapPhase {
  phase: Phase;
  titleZh: string;
  titleEn: string;
  descZh: string;
  seriesIds: SeriesId[];
}

export interface AiFeature {
  nameEn: string;
  titleZh: string;
  descZh: string;
}
