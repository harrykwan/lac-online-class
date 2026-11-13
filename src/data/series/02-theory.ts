import type { Series } from "../types";

export const theorySeries: Series = {
  id: "theory",
  number: "02",
  slug: "theory",
  titleZh: "樂理基礎",
  titleEn: "Music Theory",
  taglineZh: "音樂構成、音程、和弦、音階、調性",
  goalZh:
    "由最基本的音樂構成開始，逐步建立學生理解旋律、音程、和弦、音階及調性的能力。",
  phase: 1,
  dependsOn: ["rhythm"],
  accent: "stheory",
  stages: [
    {
      titleZh: "Notes 單音",
      titleEn: "Notes",
      bodyZh: "單音、音名、半音及全音 — 音樂的最小單位。",
      units: ["2.1", "2.2"],
    },
    {
      titleZh: "Intervals 兩個音之間的距離",
      titleEn: "Intervals",
      bodyZh: "先理解單音，再理解兩個音之間的關係。",
      units: ["2.3"],
    },
    {
      titleZh: "Chords 多個音組成的和弦",
      titleEn: "Chords",
      bodyZh: "三和弦及七和弦 — 由音程疊加而成。",
      units: ["2.4", "2.5"],
    },
    {
      titleZh: "Scales & Keys 音階及調性",
      titleEn: "Scales & Keys",
      bodyZh: "音階是音符的排列規則，調性決定音樂的中心。",
      units: ["2.6", "2.7", "2.8"],
    },
    {
      titleZh: "Harmony 和弦進行及調性應用",
      titleEn: "Harmony",
      bodyZh: "和弦進行及調性應用 — 讓知識變成音樂語言。",
      units: ["2.9", "2.10", "2.11", "2.12", "2.13", "2.14"],
    },
  ],
  units: [
    {
      code: "2.1",
      titleZh: "Music Fundamentals",
      titleEn: "音樂的構成、Pitch、Frequency、音名",
      focusZh:
        "Pitch 由振動頻率（Hz）決定；音名 A–G 循環，配上升降記號形成 12 個基本音。",
      widget: "piano-keyboard",
    },
    {
      code: "2.2",
      titleZh: "Notes & Semitones",
      titleEn: "半音、全音、升降記號",
      focusZh:
        "Semitone（半音）是鍵盤上相鄰兩鍵的距離；全音 = 2 個半音。♯ 升半音、♭ 降半音，♩ 黑鍵有兩個名字（enharmonic）。",
      widget: "piano-keyboard",
    },
    {
      code: "2.3",
      titleZh: "Intervals",
      titleEn: "音程、Major、Minor、Perfect、Augmented、Diminished",
      focusZh:
        "音程 = 兩音之間的距離，以半音數量定義：m2=1, M2=2, m3=3, M3=4, P4=5, P5=7, m6=8, M6=9, m7=10, M7=11, P8=12。",
      widget: "interval-trainer",
    },
    {
      code: "2.4",
      titleZh: "Triads",
      titleEn: "Major、Minor、Diminished、Augmented Triads",
      focusZh:
        "三和弦 = 三個音疊加（根音 + 三度 + 五度）：Major 0-4-7、Minor 0-3-7、Diminished 0-3-6、Augmented 0-4-8。",
      widget: "chord-quality-trainer",
    },
    {
      code: "2.5",
      titleZh: "Seventh Chords",
      titleEn: "Maj7、7、m7、m7b5、dim7、mMaj7",
      focusZh:
        "七和弦在三和弦之上再加七度：Maj7 0-4-7-11、Dominant 7 0-4-7-10、m7 0-3-7-10、m7b5 0-3-6-10、dim7 0-3-6-9、mMaj7 0-3-7-11。",
      widget: "chord-quality-trainer",
    },
    {
      code: "2.6",
      titleZh: "Major Scales",
      titleEn: "大調音階結構及十二個大調",
      focusZh:
        "大調公式：W-W-H-W-W-W-H。同一公式套用在不同主音上，就產生十二個大調，各有其升降音。",
      widget: "scale-explorer",
    },
    {
      code: "2.7",
      titleZh: "Minor Scales",
      titleEn: "Natural、Harmonic、Melodic Minor",
      focusZh:
        "Natural Minor：W-H-W-W-H-W-W；Harmonic Minor 升高第 7 音；Melodic Minor 上行升 6、7 音，下行還原自然小調。",
      widget: "scale-explorer",
    },
    {
      code: "2.8",
      titleZh: "Key Signature",
      titleEn: "調號、調性、Circle of Fifths",
      focusZh:
        "調號記錄一首歌固定升降哪些音；Circle of Fifths 以五度關係排列 12 個調，相鄰調號遞增，並顯示關係大小調。",
      widget: "key-signature-match",
    },
    {
      code: "2.9",
      titleZh: "Diatonic Chords",
      titleEn: "大調及小調內的和弦",
      focusZh:
        "在調性內每個音上疊三和弦：大調得到 I ii iii IV V vi vii°，這些是流行音樂和弦進行的原材料。",
    },
    {
      code: "2.10",
      titleZh: "Roman Numerals",
      titleEn: "I、ii、iii、IV、V、vi、vii°",
      focusZh:
        "以級數記譜（大寫=大和弦、小寫=小和弦、°=減和弦），讓和弦進行可以移調到任何調，例如經典 I–V–vi–IV。",
    },
    {
      code: "2.11",
      titleZh: "Relative Keys",
      titleEn: "關係大小調",
      focusZh:
        "Relative Key 共享相同調號：C Major 的關係小調是 A Minor。兩者音相同，但中心音（tonic）不同。",
    },
    {
      code: "2.12",
      titleZh: "Parallel Keys",
      titleEn: "同主音大小調",
      focusZh:
        "Parallel Key 共享相同主音：C Major 與 C Minor。音不同但中心相同，切換時情緒對比最強烈。",
    },
    {
      code: "2.13",
      titleZh: "Borrowed Chords",
      titleEn: "平行調借用和弦",
      focusZh:
        "從平行調借用和弦（如 C Major 借用 Fm、Ab、Bb），為進行添加色彩 — 借用不等同於整首歌轉調。",
    },
    {
      code: "2.14",
      titleZh: "Chord Progressions",
      titleEn: "常見和弦進行及分析",
      focusZh:
        "用級數分析常見進行（I–V–vi–IV、ii–V–I、12-bar blues），理解為甚麼某些進行「好聽」。",
    },
  ],
  appPractice: [
    { labelZh: "音名及鍵盤位置辨認", kind: "identify", widget: "piano-keyboard" },
    { labelZh: "聽辨音程", kind: "ear", widget: "interval-trainer" },
    { labelZh: "聽辨 Major / Minor Chords", kind: "ear", widget: "chord-quality-trainer" },
    { labelZh: "聽辨七和弦", kind: "ear", widget: "chord-quality-trainer" },
    { labelZh: "音階音符排列", kind: "ordering", widget: "scale-explorer" },
    { labelZh: "調號與調性配對", kind: "matching", widget: "key-signature-match" },
    { labelZh: "和弦組成音測試", kind: "identify", quizSet: "theory" },
  ],
  assignment: {
    code: "AS-02",
    titleZh: "鍵盤演奏音階與七和弦",
    tool: "Keyboard",
    deliverableZh: "在鍵盤上演奏十二個大調音階、四種小調音階及基本七和弦。",
    stepsZh: [
      "在鍵盤上演奏 C Major 音階，確認 W-W-H-W-W-W-H 結構",
      "以 Circle of Fifths 順序練習其餘十一個大調音階",
      "演奏 A Natural Minor，對比 C Major 的關係",
      "分別演奏 Harmonic 與 Melodic Minor，留意第 6、7 音變化",
      "在 C、F、G 上演奏 Maj7、m7、Dominant 7 和弦",
      "錄影或錄音自己的演奏作為驗收紀錄",
    ],
    linkedUnits: ["2.6", "2.7", "2.5"],
  },
  playground: [
    "piano-keyboard",
    "interval-trainer",
    "chord-quality-trainer",
    "scale-explorer",
    "key-signature-match",
  ],
};
