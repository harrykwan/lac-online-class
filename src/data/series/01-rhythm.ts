import type { Series } from "../types";
import { RHYTHM_LESSONS } from "./01-rhythm-lessons";

export const rhythmSeries: Series = {
  id: "rhythm",
  number: "01",
  slug: "rhythm",
  titleZh: "節奏與律動",
  titleEn: "Rhythm & Groove",
  taglineZh: "節奏、拍子、音符時值、基本律動",
  goalZh:
    "讓學生理解節奏如何構成音樂，並能夠讀懂基本節奏、聽辨節奏及建立基本 Groove。",
  phase: 1,
  dependsOn: [],
  accent: "srhythm",
  units: [
    {
      code: "1.1",
      lesson: RHYTHM_LESSONS["1.1"],
      titleZh: "甚麼是 Rhythm？",
      titleEn: "Beat、Pulse、Tempo",
      focusZh:
        "Beat（拍）是音樂的脈搏，Pulse 是穩定重複的律動感，Tempo（BPM）決定拍子的快慢。先學會感受拍子，再開始數拍。",
    },
    {
      code: "1.2",
      lesson: RHYTHM_LESSONS["1.2"],
      titleZh: "Whole、Half、Quarter Notes",
      titleEn: "音符時值基礎",
      focusZh:
        "Whole Note = 4 拍，Half Note = 2 拍，Quarter Note = 1 拍。時值是音符的長度，與音高無關。",
    },
    {
      code: "1.3",
      lesson: RHYTHM_LESSONS["1.3"],
      titleZh: "Eighth Notes、Sixteenth Notes",
      titleEn: "八分音符與十六分音符",
      focusZh:
        "Eighth Note = 半拍（1 拍內 2 個），Sixteenth Note = 四分之一拍（1 拍內 4 個）。Subdivision 把一拍再細分。",
      widget: "rhythm-player",
    },
    {
      code: "1.4",
      lesson: RHYTHM_LESSONS["1.4"],
      titleZh: "Dotted Notes、Ties、Rests",
      titleEn: "附點、連結線與休止符",
      focusZh:
        "附點把音符延長原本時值的一半；Tie 把兩個同音高的音符連成一個更長的音；Rest 是靜默，同樣佔用時值。",
    },
    {
      code: "1.5",
      lesson: RHYTHM_LESSONS["1.5"],
      titleZh: "Time Signature",
      titleEn: "拍號：4/4、3/4、6/8",
      focusZh:
        "上方數字 = 每小節有幾拍，下方數字 = 以甚麼音符為一拍。4/4 是流行音樂最常用，3/4 是 Waltz 感覺，6/8 有搖擺流動感。",
      widget: "rhythm-player",
    },
    {
      code: "1.6",
      lesson: RHYTHM_LESSONS["1.6"],
      titleZh: "Bar、Beat、Subdivision",
      titleEn: "小節、拍與細分",
      focusZh:
        "Bar（小節）由拍號定義的拍數組成；Bar 是音樂的時間單位，製作時 DAW 的 Grid 就建立在 Bar / Beat / Subdivision 上。",
    },
    {
      code: "1.7",
      lesson: RHYTHM_LESSONS["1.7"],
      titleZh: "Straight vs Swing",
      titleEn: "直拍與搖擺",
      focusZh:
        "Straight：八分音符平均分割。Swing：成對音符中第二個延後，形成搖擺感（常見 triplet swing ≈ 66%）。用耳朵分別兩者。",
      widget: "rhythm-player",
    },
    {
      code: "1.8",
      lesson: RHYTHM_LESSONS["1.8"],
      titleZh: "Syncopation、Offbeat、Accent",
      titleEn: "切分、反拍與重音",
      focusZh:
        "Syncopation 把重音放在弱拍或反拍上，製造推進感；Offbeat 是拍與拍之間的位置；Accent 是人為加強的拍點。",
    },
    {
      code: "1.9",
      lesson: RHYTHM_LESSONS["1.9"],
      titleZh: "基本 Pop、Rock、Funk Groove",
      titleEn: "常見風格節奏",
      focusZh:
        "Pop：四分音符 Kick/Snare 骨架；Rock：強調 2 & 4 反拍；Funk：16 分音符 + 切分，空拍也是節奏的一部分。",
      widget: "rhythm-grid",
    },
    {
      code: "1.10",
      lesson: RHYTHM_LESSONS["1.10"],
      titleZh: "Groove 分析及節奏創作",
      titleEn: "分析與實踐",
      focusZh:
        "拆解喜歡的歌曲的節奏骨架，再親自編寫屬於自己的 Groove，這是節奏系列的總結實踐。",
    },
  ],
  appPractice: [
    { labelZh: "聽節奏選擇正確答案", kind: "ear", quizSet: "rhythm" },
    { labelZh: "節奏圖形與音符時值配對", kind: "matching", quizSet: "rhythm" },
    { labelZh: "聽辨 Straight / Swing", kind: "ear", widget: "rhythm-player", quizSet: "rhythm" },
    { labelZh: "節奏排序及完成小節", kind: "ordering", quizSet: "rhythm" },
    { labelZh: "Rhythm Dictation", kind: "dictation", quizSet: "rhythm" },
  ],
  assignment: {
    code: "AS-01",
    titleZh: "Logic Pro 四小節鼓組節奏",
    tool: "Logic Pro",
    deliverableZh:
      "製作四小節 4/4 Drum Pattern，分別使用 8th Notes 和 16th Notes。",
    stepsZh: [
      "建立新 Project，設定 Tempo（建議 90–110 BPM）與 4/4 拍號",
      "建立 Drummer 或 Software Instrument Drum Track",
      "以 8th Notes 編寫第一個兩小節 Pattern",
      "以 16th Notes 編寫第二個兩小節 Pattern",
      "加入 Hi-hat 變化，試聽 Straight 與 Swing 兩種感覺",
      "Loop 四小節，確認 Groove 穩定",
    ],
    linkedUnits: ["1.3", "1.5", "1.7", "1.9"],
  },
  playground: ["rhythm-player", "rhythm-grid"],
};
