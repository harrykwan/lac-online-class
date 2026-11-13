import type { Series } from "../types";

export const compositionSeries: Series = {
  id: "composition",
  number: "03",
  slug: "composition",
  titleZh: "旋律創作",
  titleEn: "Composition",
  taglineZh: "旋律創作、和弦進行、調性及歌曲創作",
  goalZh:
    "將 Music Theory 轉化成真正的音樂創作能力。這個系列以 Melody Writing 作為核心，而不是一開始便教複雜的歌曲創作。",
  phase: 2,
  dependsOn: ["rhythm", "theory"],
  accent: "scomposition",
  stages: [
    {
      titleZh: "第一階段：從 C Major 開始",
      titleEn: "Start in C Major",
      bodyZh:
        "限制音符範圍。練習使用 1、2、3、5、6 等音；練習旋律的上行、下行及跳進；建立 2-bar、4-bar Melody。",
      units: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"],
    },
    {
      titleZh: "第二階段：擴展至其他調性",
      titleEn: "Expand to Other Keys",
      bodyZh:
        "十二個 Major Keys 與 Natural Minor。不只是移調，而是理解不同調性的音符及和弦關係。",
      units: ["3.7", "3.8", "3.9"],
    },
    {
      titleZh: "第三階段：調性及創作色彩",
      titleEn: "Tonality & Colour",
      bodyZh:
        "例如一首 C Major 歌曲，可以透過 Relative Minor（Am）、Parallel Minor（Cm）、Borrowed Chords（例如 Fm、Ab、Bb）增加色彩，利用和弦進行與旋律共同建立情緒。Relative Key 是共享相同調號的關係大小調；Parallel Key 是共享相同主音的大小調；Borrowed Chords 是從平行調借用和弦，不等同於整首歌轉調。",
      units: ["3.10", "3.11", "3.12", "3.13", "3.14", "3.15", "3.16"],
    },
  ],
  units: [
    {
      code: "3.1",
      titleZh: "Melody",
      titleEn: "甚麼是旋律？",
      focusZh:
        "旋律是音樂中最容易被記住的一條線：一連串有節奏的音高變化。好旋律 = 容易唱 + 有形狀 + 有重複與變化。",
    },
    {
      code: "3.2",
      titleZh: "Melody & Rhythm",
      titleEn: "音高與節奏的關係",
      focusZh:
        "旋律 = 音高（pitch）× 節奏（rhythm）。先決定節奏骨架，再填上音高；長音製造呼吸，短音製造能量。",
    },
    {
      code: "3.3",
      titleZh: "Writing in C Major",
      titleEn: "C 大調旋律創作",
      focusZh:
        "從限制開始：只用 C 大調音（最初只用 1、2、3、5、6），在 2-bar / 4-bar 內寫出完整樂句。限制讓你專注形狀而非選項。",
      widget: "piano-keyboard",
    },
    {
      code: "3.4",
      titleZh: "Motif",
      titleEn: "動機及旋律重複",
      focusZh:
        "Motif 是最短的可識別音樂想法（2–5 個音）。重複、移位、倒影、擴展 — 大部分名曲旋律都是一個 motif 的發展。",
    },
    {
      code: "3.5",
      titleZh: "Question & Answer",
      titleEn: "樂句問答",
      focusZh:
        "A 句（question）製造未完成感，常結束在 5 或 2；B 句（answer）回落到 1 完成呼應。這是旋律最基本的對話結構。",
    },
    {
      code: "3.6",
      titleZh: "Melody Development",
      titleEn: "旋律發展",
      focusZh:
        "把 2-bar 樂句發展成 8-bar 旋律：重複、變奏、模進（sequence）、拉伸或壓縮節奏。",
    },
    {
      code: "3.7",
      titleZh: "Writing in Major Keys",
      titleEn: "十二個大調旋律創作",
      focusZh:
        "把 C Major 的方法搬到其他 11 個大調。重點不是移調練習，而是理解每個調的音符與和弦關係。",
      widget: "scale-explorer",
    },
    {
      code: "3.8",
      titleZh: "Natural Minor",
      titleEn: "自然小調旋律創作",
      focusZh:
        "自然小調（1 2 ♭3 4 5 ♭6 ♭7）有不同情緒：陰暗、內斂。練習在 A Natural Minor 寫與 C Major 同構但情緒不同的旋律。",
      widget: "scale-explorer",
    },
    {
      code: "3.9",
      titleZh: "Minor Melody Development",
      titleEn: "小調旋律發展",
      focusZh:
        "沿用 motif 發展手法於小調；留意 ♭3 與 ♭6 製造的張力音，以及 5 音在小調中的錨點作用。",
    },
    {
      code: "3.10",
      titleZh: "Chord Tones",
      titleEn: "利用和弦音寫旋律",
      focusZh:
        "強拍放在和弦音（root / 3rd / 5th）上，旋律立即與和聲融合。弱拍才使用非和弦音。",
      widget: "chord-tone-trainer",
    },
    {
      code: "3.11",
      titleZh: "Passing Notes & Approach Notes",
      titleEn: "經過音與趨近音",
      focusZh:
        "Passing note 平滑連接兩個和弦音；Approach note（半音趨近）從上方或下方半音滑入目標音，製造律動與爵士感。",
      widget: "chord-tone-trainer",
    },
    {
      code: "3.12",
      titleZh: "Chord Progression",
      titleEn: "旋律與和弦配合",
      focusZh:
        "在 I–V–vi–IV 等進行上寫旋律：每個和弦更換時檢查強拍音是否為和弦音，並讓旋律線有整體方向。",
      widget: "chord-tone-trainer",
    },
    {
      code: "3.13",
      titleZh: "Relative Major / Minor",
      titleEn: "關係大小調轉換",
      focusZh:
        "C Major ↔ A Minor 共享調號。verse 用小調色彩、chorus 回到大調（或相反），在同一調號內完成情緒轉換。",
    },
    {
      code: "3.14",
      titleZh: "Parallel Major / Minor",
      titleEn: "同主音大小調轉換",
      focusZh:
        "C Major ↔ C Minor 共享主音。整段切換平行調是最強烈的情緒手段 — 同一個「家」，完全不同的光線。",
    },
    {
      code: "3.15",
      titleZh: "Borrowed Chords",
      titleEn: "借用和弦創作",
      focusZh:
        "在大調中借用小調家族和弦：iv（Fm）、♭VI（Ab）、♭VII（Bb）。單一借用和弦即可製造電影感，而不離開原調。",
    },
    {
      code: "3.16",
      titleZh: "Complete Songwriting",
      titleEn: "完成一首歌曲",
      focusZh:
        "整合所有技巧：motif → 樂句 → 段落 → 和弦配合 → 調性色彩，完成一首有結構的完整作品。",
    },
  ],
  appPractice: [
    { labelZh: "音階選音練習", kind: "identify", widget: "scale-explorer" },
    { labelZh: "旋律音符排序", kind: "ordering", quizSet: "composition" },
    { labelZh: "Melody Dictation", kind: "dictation", quizSet: "composition" },
    { labelZh: "根據指定和弦選擇合適旋律音", kind: "identify", widget: "chord-tone-trainer" },
    { labelZh: "找出不屬於指定調性的音符", kind: "identify", quizSet: "composition" },
  ],
  assignment: {
    code: "AS-03",
    titleZh: "創作三個版本的旋律",
    tool: "Keyboard",
    deliverableZh:
      "創作一首 8–16 小節旋律，並分別嘗試 Major、Relative Minor 及 Parallel Minor 版本。",
    stepsZh: [
      "在 C Major 內以 1、2、3、5、6 寫出 2-bar motif",
      "以重複與變化把 motif 發展成 8-bar Question & Answer 樂句",
      "擴展至 8–16 小節完整旋律",
      "寫出 Relative Minor（A Minor）版本 — 共享調號",
      "寫出 Parallel Minor（C Minor）版本 — 共享主音",
      "加入一個 Borrowed Chord（Fm / Ab / Bb）示範色彩變化",
    ],
    linkedUnits: ["3.3", "3.4", "3.5", "3.13", "3.14", "3.15"],
  },
  playground: ["piano-keyboard", "chord-tone-trainer", "scale-explorer"],
};
