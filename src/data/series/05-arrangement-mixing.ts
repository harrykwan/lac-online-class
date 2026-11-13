import type { Series } from "../types";

export const arrangementSeries: Series = {
  id: "arrangement",
  number: "05A",
  slug: "arrangement",
  titleZh: "編曲基礎",
  titleEn: "Arrangement Fundamentals",
  taglineZh: "鼓、Bass、樂器編排",
  goalZh:
    "編曲和混音是兩種不同的能力，這個 Sub-series 先集中 Drum & Bass — 節奏組是所有編曲的地基。",
  phase: 4,
  dependsOn: ["rhythm", "logic-pro"],
  accent: "sarrangement",
  units: [
    {
      code: "5A.1",
      titleZh: "Introduction to Arrangement",
      titleEn: "甚麼是編曲？",
      focusZh:
        "編曲決定「誰在甚麼時候演奏甚麼」：選擇樂器、安排聲部、設計段落層次，把旋律與和弦變成完整音樂。",
    },
    {
      code: "5A.2",
      titleZh: "Drum Kit",
      titleEn: "Kick、Snare、Hi-hat、Cymbals",
      focusZh:
        "認識鼓組四個核心部件的音色與角色：Kick 負責低頻脈衝、Snare 是反拍骨幹、Hi-hat 維持細分律動、Cymbals 標記段落。",
      widget: "rhythm-grid",
    },
    {
      code: "5A.3",
      titleZh: "Basic Pop Drum Pattern",
      titleEn: "基本流行鼓節奏",
      focusZh:
        "經典骨架：Kick 在 1 和 3，Snare 在 2 和 4，Hi-hat 維持八分音符。這個 pattern 是 90% 流行歌的起點。",
      widget: "rhythm-grid",
    },
    {
      code: "5A.4",
      titleZh: "Rock & Funk Drum Groove",
      titleEn: "Rock 與 Funk 節奏",
      focusZh:
        "Rock：Snare 強調 2 & 4、Kick 更密集；Funk：16 分 Hi-hat + 幽靈音（ghost notes）+ 切分 Kick。",
      widget: "rhythm-grid",
    },
    {
      code: "5A.5",
      titleZh: "8th Note & 16th Note Drum Programming",
      titleEn: "八分與十六分音符編程",
      focusZh:
        "在 Piano Roll / Step Sequencer 以 1/8 與 1/16 Grid 排列鼓組，感受細分密度對能量的影響。",
      widget: "rhythm-grid",
    },
    {
      code: "5A.6",
      titleZh: "Syncopated Drum Patterns",
      titleEn: "切分鼓節奏",
      focusZh:
        "把 Kick 或 Snare 移到反拍與弱拍，製造期待感與律動。空拍（不放在哪裡）同樣重要。",
      widget: "rhythm-grid",
    },
    {
      code: "5A.7",
      titleZh: "Drum Fills & Transitions",
      titleEn: "過門與段落過渡",
      focusZh:
        "Fill 佔據小節尾段（通常最後 1 或 2 拍），用 Snare/Tom 組合引導聽眾進入下一段落 — 簡短比複雜有效。",
      widget: "rhythm-grid",
    },
    {
      code: "5A.8",
      titleZh: "Bass Fundamentals",
      titleEn: "Bass 基礎",
      focusZh:
        "Bass 佔據低頻並連接節奏與和聲：它既要跟 Kick 對話，也要交代和弦的根音。",
    },
    {
      code: "5A.9",
      titleZh: "Root Notes & Chord Tones",
      titleEn: "根音與和弦音",
      focusZh:
        "入門編 Bass：強拍彈根音，過渡時可用和弦音（3rd / 5th）或半音趨近連接下一個和弦。",
    },
    {
      code: "5A.10",
      titleZh: "Bass & Kick Relationship",
      titleEn: "Bass 與 Kick 的關係",
      focusZh:
        "Kick 與 Bass 共享低頻空間：要麼同時打擊增強衝擊，要麼互相錯開保持清晰 — 這是編曲與混音共同的課題。",
    },
    {
      code: "5A.11",
      titleZh: "Bass Groove & Rhythm",
      titleEn: "Bass 律動",
      focusZh:
        "Bass 的節奏位置決定 Groove 性格：跟 Kick 同步 = 穩定；切分 = 推進；反拍 = 搖擺。",
    },
    {
      code: "5A.12",
      titleZh: "Drum & Bass Arrangement Project",
      titleEn: "節奏組編排實踐",
      focusZh:
        "把鼓組與 Bass 結合，配合指定和弦進行，完成一段有層次的 16 小節節奏組編排。",
    },
  ],
  appPractice: [
    { labelZh: "Drum Pattern 辨認", kind: "identify", widget: "rhythm-grid", quizSet: "arrangement" },
    { labelZh: "Bass Pattern 辨認", kind: "identify", quizSet: "arrangement" },
    { labelZh: "鼓組部件與角色配對", kind: "matching", quizSet: "arrangement" },
  ],
  assignment: {
    code: "AS-05",
    titleZh: "16 小節 Drum & Bass Groove",
    tool: "Logic Pro",
    deliverableZh: "使用 Logic Pro 製作一段 16 小節 Drum & Bass Groove，並配合指定和弦進行。",
    stepsZh: [
      "以 Basic Pop Pattern 建立前 4 小節鼓組",
      "在第 5–8 小節加入切分與 Hi-hat 變化",
      "依指定和弦進行編寫 Bass 根音線",
      "調整 Bass 節奏位置，找到與 Kick 的配合",
      "在第 8 與 12 小節加入 Drum Fill 過門",
      "Loop 16 小節，檢查整體 Groove 的推進感",
    ],
    linkedUnits: ["5A.3", "5A.6", "5A.7", "5A.9", "5A.10"],
  },
  playground: ["rhythm-grid"],
};

export const mixingSeries: Series = {
  id: "mixing",
  number: "05B",
  slug: "mixing",
  titleZh: "混音基礎",
  titleEn: "Mixing Fundamentals",
  taglineZh: "EQ、Compressor、Reverb",
  goalZh:
    "這個系列先不涉及複雜的 Mastering，集中建立三個最重要的基本工具概念：EQ、Compressor 與 Reverb。",
  phase: 5,
  dependsOn: ["arrangement", "logic-pro"],
  accent: "smixing",
  units: [
    {
      code: "5B.1",
      titleZh: "Introduction to Mixing",
      titleEn: "甚麼是混音？",
      focusZh:
        "混音 = 把多軌素材平衡、塑形、定位成一個完整作品。目標是清晰、平衡、有情感，而非「加效果」。",
    },
    {
      code: "5B.2",
      titleZh: "Gain Staging & Volume Balance",
      titleEn: "增益管理與音量平衡",
      focusZh:
        "混音第一步是用音量推子（fader）讓每軌互相協調 — 先做平衡，才考慮效果器。避免任何一級訊號過載（clipping）。",
      widget: "eq-explorer",
    },
    {
      code: "5B.3",
      titleZh: "Frequency Spectrum",
      titleEn: "頻率頻譜",
      focusZh:
        "20 Hz–20 kHz 是人耳聽域：Low（低頻/力量）、Mid（中頻/主體）、High（高頻/空氣感）。混音就是在頻率上分配空間。",
      widget: "eq-explorer",
    },
    {
      code: "5B.4",
      titleZh: "EQ：Frequency、Cut、Boost",
      titleEn: "等化器基礎",
      focusZh:
        "EQ 選擇一個頻率點（Frequency），再決定衰減（Cut）或增強（Boost）多少 dB。先 Cut 再 Boost — 減法混音更乾淨。",
      widget: "eq-explorer",
    },
    {
      code: "5B.5",
      titleZh: "EQ：Low、Mid、High",
      titleEn: "三段等化",
      focusZh:
        "Low shelf 控制低頻厚度，Peaking 控制中頻主體，High shelf 控制明亮度。Kick 要 60–100 Hz，人聲主體在 1–4 kHz。",
      widget: "eq-explorer",
    },
    {
      code: "5B.6",
      titleZh: "Compressor：基本原理",
      titleEn: "壓縮器入門",
      focusZh:
        "Compressor 自動降低超過 Threshold 的訊號：縮小動態範圍（大聲與小聲的差距），讓聲音更穩定、更貼近。",
      widget: "compressor-visualizer",
    },
    {
      code: "5B.7",
      titleZh: "Threshold、Ratio、Attack、Release",
      titleEn: "壓縮四大參數",
      focusZh:
        "Threshold 決定何時啟動；Ratio 決定壓多少；Attack 決定多快反應（慢 Attack 保留瞬態）；Release 決定多快恢復。",
      widget: "compressor-visualizer",
    },
    {
      code: "5B.8",
      titleZh: "Reverb：Room、Hall、Plate",
      titleEn: "混響空間類型",
      focusZh:
        "Reverb 模擬空間：Room 小而真實、Hall 大而宏偉、Plate 明亮緻密。選擇空間 = 選擇樂器的距離感。",
      widget: "reverb-demo",
    },
    {
      code: "5B.9",
      titleZh: "Reverb：Wet / Dry",
      titleEn: "乾濕比例",
      focusZh:
        "Dry 是原始訊號，Wet 是效果訊號。濕度決定樂器在空間中的遠近 — 100% Wet 通常用於 Send/Return 工作流。",
      widget: "reverb-demo",
    },
    {
      code: "5B.10",
      titleZh: "EQ + Compressor + Reverb 實際應用",
      titleEn: "三件套組合",
      focusZh:
        "典型訊號鏈：EQ 修頻率 → Compressor 控動態 → Reverb 造空間。順序與每步的量都影響最終結果。",
    },
    {
      code: "5B.11",
      titleZh: "Basic Mixing Workflow",
      titleEn: "基本混音流程",
      focusZh:
        "順序：整理軌道與 Gain Staging → 音量平衡 → EQ 清理 → 壓縮控制 → Reverb 定位 → 對照參考歌曲檢查。",
    },
    {
      code: "5B.12",
      titleZh: "Mixing Project",
      titleEn: "混音實踐",
      focusZh: "對一段完整音樂應用所有工具，完成第一次有意的混音實踐。",
    },
  ],
  appPractice: [
    { labelZh: "EQ 頻率概念測試", kind: "mcq", widget: "eq-explorer", quizSet: "mixing" },
    { labelZh: "Compressor 參數測試", kind: "mcq", widget: "compressor-visualizer", quizSet: "mixing" },
    { labelZh: "Reverb 概念配對", kind: "matching", widget: "reverb-demo", quizSet: "mixing" },
  ],
  assignment: {
    code: "AS-06",
    titleZh: "Drum & Bass 混音處理",
    tool: "Logic Pro",
    deliverableZh: "將一段 Drum & Bass 音樂進行基本音量平衡、EQ、Compression 及 Reverb 處理。",
    stepsZh: [
      "整理軌道並設定 Gain Staging，避免過載",
      "用推子完成初步音量平衡",
      "對 Kick 與 Bass 做 EQ 清理（Cut 衝突頻段）",
      "對 Snare 加 Compression（Slow Attack 保留瞬態）",
      "對人聲或主奏樂器加 Room Reverb（低濕度）",
      "與參考歌曲對照，記錄三個改善點",
    ],
    linkedUnits: ["5B.2", "5B.4", "5B.6", "5B.8", "5B.11"],
  },
  playground: ["eq-explorer", "compressor-visualizer", "reverb-demo"],
};
