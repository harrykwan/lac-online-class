import type { Series } from "../types";

export const logicProSeries: Series = {
  id: "logic-pro",
  number: "04",
  slug: "logic-pro",
  titleZh: "DAW 技能：Logic Pro",
  titleEn: "DAW Skills: Logic Pro",
  taglineZh: "錄音、MIDI、Audio、剪輯及基本操作",
  goalZh:
    "讓完全沒有 DAW 經驗的學生，可以獨立建立 Project、錄音、製作 MIDI、剪輯 Audio 及完成基本音樂工作流程。",
  phase: 3,
  dependsOn: ["rhythm", "theory"],
  accent: "slogic",
  stages: [
    {
      titleZh: "實際工作流程教學",
      titleEn: "Workflow-based Learning",
      bodyZh:
        "剪輯工具不是教你按哪個按鈕，而是以實際工作流程教學：1. 如何錄製一段 Audio → 2. 如何刪除錯誤部分 → 3. 如何複製及延長樂段 → 4. 如何修正 MIDI 音符 → 5. 如何對齊節奏 → 6. 如何將不同 Region 組合成完整歌曲。",
      units: [
        "4.6",
        "4.9",
        "4.11",
        "4.8",
        "4.7",
        "4.10",
        "4.13",
        "4.15",
      ],
    },
  ],
  units: [
    {
      code: "4.1",
      titleZh: "Introduction to DAW & Logic Pro",
      titleEn: "甚麼是 DAW？",
      focusZh:
        "DAW（Digital Audio Workstation）是現代音樂製作的中心：錄音、編曲、混音都在這裡完成。Logic Pro 是 macOS 上的主流選擇。",
    },
    {
      code: "4.2",
      titleZh: "建立 Project、Sample Rate、Tempo",
      titleEn: "專案設定",
      focusZh:
        "Sample Rate 建議 48 kHz；開 Project 前先設定 Tempo 與 Time Signature — 之後所有 Grid 都依賴它。",
    },
    {
      code: "4.3",
      titleZh: "Track Types",
      titleEn: "Audio、Software Instrument",
      focusZh:
        "Audio Track 錄製真實聲音；Software Instrument Track 播放虛擬樂器。兩者行為、編輯方式完全不同。",
    },
    {
      code: "4.4",
      titleZh: "Audio vs MIDI",
      titleEn: "音訊與音符資料",
      focusZh:
        "Audio 是實際的聲波錄音；MIDI 是音符指令（音高、力度、長度），可隨時更換樂器。這是製作人最重要的概念分界。",
    },
    {
      code: "4.5",
      titleZh: "建立及管理 Tracks",
      titleEn: "軌道管理",
      focusZh:
        "建立、命名、分組、上色、靜音與獨奏 — 有條理的 Track 管理是專業工作流的基礎。",
    },
    {
      code: "4.6",
      titleZh: "錄製 Audio",
      titleEn: "Recording Audio",
      focusZh:
        "設定輸入裝置 → 開啟 Record Enable → 聽取監聽音量 → 錄音。錄之前先試錄確認訊號強度（level）。",
    },
    {
      code: "4.7",
      titleZh: "MIDI Recording & Piano Roll",
      titleEn: "MIDI 錄音與鋼琴捲簾",
      focusZh:
        "用 MIDI Keyboard 或 Step Input 輸入音符；Piano Roll 左右 = 時間、上下 = 音高，是編曲的主要畫面。",
    },
    {
      code: "4.8",
      titleZh: "Quantization & Note Editing",
      titleEn: "量化與音符編輯",
      focusZh:
        "Quantize 把音符對齊 Grid（1/16、1/8…），修正演奏節奏；同時可編輯音高、力度（velocity）與長度。",
    },
    {
      code: "4.9",
      titleZh: "Audio Region Editing",
      titleEn: "音訊區塊剪輯",
      focusZh:
        "Region 是 Audio 的容器：可以拖曳、修剪頭尾、循環（loop）、淡入淡出（fade）處理爆音。",
    },
    {
      code: "4.10",
      titleZh: "MIDI Region Editing",
      titleEn: "MIDI 區塊剪輯",
      focusZh:
        "MIDI Region 可整體移調、複製樂句、拉伸長度 — 修改時音符資料保持完整可逆。",
    },
    {
      code: "4.11",
      titleZh: "Cut、Copy、Paste、Split、Join",
      titleEn: "五大剪輯操作",
      focusZh:
        "所有 DAW 剪輯都由這五個操作組合而成：剪下 / 複製 / 貼上 / 切開（Split at playhead）/ 接合（Join）。",
    },
    {
      code: "4.12",
      titleZh: "Flex Time 基礎",
      titleEn: "時間伸縮",
      focusZh:
        "Flex Time 可以在不影響音高的情況下拉伸 Audio 時長，用於對齊節奏或改變速度感。",
    },
    {
      code: "4.13",
      titleZh: "Loop、Cycle、Arrangement Window",
      titleEn: "循環與編排",
      focusZh:
        "Cycle Mode 讓指定小節反覆播放供錄音；Arrangement Window 是宏觀整首歌結構的視角。",
    },
    {
      code: "4.14",
      titleZh: "Basic Automation",
      titleEn: "基本自動化",
      focusZh:
        "Automation 記錄參數隨時間的變化：音量、Pan、效果開關 — 讓混音「活起來」的第一步。",
    },
    {
      code: "4.15",
      titleZh: "Export & Bounce",
      titleEn: "匯出與縮混",
      focusZh:
        "Bounce = 把 Project 輸出成一個 Audio 檔（WAV/MP3）。理解 Offline Bounce 與 Realtime Bounce 的分別。",
    },
  ],
  appPractice: [
    { labelZh: "Audio / MIDI 概念測試", kind: "mcq", quizSet: "logic-pro" },
    { labelZh: "Logic Pro 工具圖示辨認", kind: "matching", quizSet: "logic-pro" },
    { labelZh: "Signal Flow 基礎測試", kind: "ordering", quizSet: "logic-pro" },
    { labelZh: "操作步驟排序", kind: "ordering", quizSet: "logic-pro" },
    { labelZh: "專案設定知識測試", kind: "mcq", quizSet: "logic-pro" },
  ],
  assignment: {
    code: "AS-04",
    titleZh: "建立完整 Logic Pro Project",
    tool: "Logic Pro",
    deliverableZh:
      "建立一個 Logic Pro Project，包含一條 Audio Track、一條 MIDI Track，並完成 8 小節編輯。",
    stepsZh: [
      "建立 Project：48 kHz、4/4、自選 Tempo",
      "建立一條 Audio Track 並錄製 8 小節人聲或樂器",
      "刪除錯誤部分，修剪 Region 頭尾並加 Fade",
      "建立一條 Software Instrument Track，錄入 8 小節 MIDI",
      "Quantize MIDI 對齊節奏，修正錯音",
      "複製、延長 Region，將素材組合成完整 8 小節段落",
      "Bounce 輸出 WAV 檔案",
    ],
    linkedUnits: ["4.2", "4.6", "4.7", "4.8", "4.11", "4.15"],
  },
  playground: [],
};
