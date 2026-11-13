# IAC 音樂製作課程 — IAC Music Education System

一套由零開始的 **Practical Music Production System** 網上課程：從音樂基礎到完整音樂製作。
內容源自《整理IAC課程系列》課程設計文件，包含五個獨立 Series、統一的六部份教學格式、
Beta App 互動練習與 AI 學習平台願景。

## 課程架構

| Series | 名稱 | 內容 |
|---|---|---|
| 01 | Rhythm & Groove 節奏與律動 | 拍子、音符時值、Straight/Swing、切分、Groove |
| 02 | Music Theory 樂理基礎 | 音程、三和弦、七和弦、音階、調性、借用和弦 |
| 03 | Composition 旋律創作 | Motif、樂句問答、和弦音、調性色彩 |
| 04 | DAW Skills: Logic Pro | Project、Audio vs MIDI、剪輯、Quantize、Bounce |
| 05A | Arrangement 編曲基礎 | Drum & Bass 編排 |
| 05B | Mixing 混音基礎 | EQ、Compressor、Reverb |

每個系列頁面依 IAC Standard Lesson Format 組織：Concept → Visual Notes → Demonstration →
App Practice → Practical Assignment → Assessment。

## 互動功能（全部 Web Audio API 合成，無需音訊檔案）

- **節奏播放器** — 節拍器、8/16 分音符細分、Straight vs Swing 對比（可調 swing 比例）
- **鼓組編程格線** — 16-step grid，內建 Pop / Rock / Funk 預設
- **互動鍵盤** — 可彈奏，支援和弦音/音階/根音高亮
- **音程 / 和弦品質聽辨訓練** — 真實合成音色即時回饋
- **音階探索器** — 十二調 × 四種音階，顯示 Relative / Parallel 調
- **EQ 頻率探索** — 三段 EQ + 噪音源 + 頻譜顯示 + 頻率掃描
- **壓縮器視覺化** — Threshold/Ratio/Attack/Release 即時傳輸曲線與 Gain Reduction
- **混響示範** — Room / Hall / Plate 程序化 IR，Wet/Dry 交叉淡化
- **測驗引擎** — 選擇、聽力、配對、排序、聽寫題型，即時講解
- 學習進度儲存於瀏覽器 localStorage，不上傳任何資料

## 開發

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npx tsc --noEmit   # 型別檢查
npm run build      # 靜態匯出至 out/
npx serve out      # 本地預覽靜態版本
```

技術棧：Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · TypeScript ·
Web Audio API。零額外 runtime 依賴。

部署：`out/` 是純靜態網站，可部署到任何靜態主機（GitHub Pages、Netlify、Cloudflare Pages、S3）。
