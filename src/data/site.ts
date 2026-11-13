import type {
  AiFeature,
  DivisionItem,
  LessonFormatPart,
  RoadmapPhase,
} from "./types";

export const site = {
  brandZh: "IAC 音樂製作課程",
  brandEn: "IAC Music Education System",
  heroTitleZh: "從音樂基礎到完整音樂製作",
  heroSubtitleZh:
    "一套由零開始、逐步培養真正音樂創作及製作能力的 Practical Music Production System。",
  heroBodyZh:
    "不是單純認識音樂知識，而是學會將知識應用在實際音樂創作、DAW 操作、編曲及混音之中。",
  ctaZh: "開始學習 — Series 01",
  ctaHref: "/series/rhythm/",
};

/** IAC 課程與 App 的三方分工 */
export const division: DivisionItem[] = [
  {
    titleZh: "IAC Online Course",
    titleEn: "Online Course",
    itemsZh: ["完整教學", "概念解釋", "示範", "筆記", "實際操作"],
    tone: "course",
  },
  {
    titleZh: "IAC App",
    titleEn: "Interactive App",
    itemsZh: ["知識測試", "聽力訓練", "互動練習", "即時評估", "鞏固學習"],
    tone: "app",
  },
  {
    titleZh: "實際創作任務",
    titleEn: "Practical Assignments",
    itemsZh: ["整合各系列知識", "親自演奏、創作、製作", "真正做出音樂"],
    tone: "creation",
  },
];

/** IAC Standard Lesson Format — 每一課統一採用的六個部分 */
export const lessonFormat: LessonFormatPart[] = [
  {
    step: 1,
    titleZh: "Concept",
    titleEn: "概念解釋",
    descZh: "學生需要理解甚麼？為甚麼需要學？",
  },
  {
    step: 2,
    titleZh: "Visual Notes",
    titleEn: "圖像筆記",
    descZh: "鍵盤圖、音符圖、DAW 截圖、Signal Flow 輔助理解。",
  },
  {
    step: 3,
    titleZh: "Demonstration",
    titleEn: "示範",
    descZh: "老師實際演奏、創作或操作 Logic Pro。",
  },
  {
    step: 4,
    titleZh: "App Practice",
    titleEn: "互動練習",
    descZh: "選擇題、聽力測試、配對、排序、即時測驗。",
  },
  {
    step: 5,
    titleZh: "Practical Assignment",
    titleEn: "實踐作業",
    descZh: "學生需要親自演奏、創作或製作。",
  },
  {
    step: 6,
    titleZh: "Assessment",
    titleEn: "學習驗收",
    descZh: "測試是否真正掌握，而不只是記得答案。",
  },
];

/** 整體課程開發次序 — 按知識依賴關係 */
export const roadmap: RoadmapPhase[] = [
  {
    phase: 1,
    titleZh: "節奏與樂理",
    titleEn: "Rhythm & Music Theory",
    descZh: "建立音樂知識的共同基礎。",
    seriesIds: ["rhythm", "theory"],
  },
  {
    phase: 2,
    titleZh: "作曲",
    titleEn: "Composition",
    descZh: "開始將音樂知識轉化成旋律及歌曲。",
    seriesIds: ["composition"],
  },
  {
    phase: 3,
    titleZh: "Logic Pro",
    titleEn: "DAW Skills",
    descZh: "教學生使用 DAW 將創意實現。",
    seriesIds: ["logic-pro"],
  },
  {
    phase: 4,
    titleZh: "編曲",
    titleEn: "Arrangement",
    descZh: "學習將旋律及和弦變成完整音樂。",
    seriesIds: ["arrangement"],
  },
  {
    phase: 5,
    titleZh: "混音",
    titleEn: "Mixing",
    descZh: "學習改善音質及建立基本混音能力。",
    seriesIds: ["mixing"],
  },
];

/** 未來 AI 功能 — Beta App 初期先與課程內容一一對應 */
export const aiFeatures: AiFeature[] = [
  {
    nameEn: "AI Music Tutor",
    titleZh: "AI 音樂導師",
    descZh: "學生答錯時，AI 不只告訴答案，而是解釋錯誤原因，並根據錯誤提供另一個練習。",
  },
  {
    nameEn: "AI Music Analysis",
    titleZh: "AI 音樂分析",
    descZh: "學生上傳自己的 MIDI 或 Audio，AI 分析節奏、旋律、和弦、編曲及混音問題。",
  },
  {
    nameEn: "AI Learning Path",
    titleZh: "AI 學習路徑",
    descZh: "根據學生的答題及實際作業表現，自動判斷哪些知識尚未掌握，安排補充練習。",
  },
];

export const aiVisionZh =
  "這樣 App 就不只是音樂考試平台，而是一個真正的 AI Music Learning Platform。";

export const assessmentNoteZh =
  "Assessment 的目的：測試你是否真正掌握，而不只是記得答案。";
