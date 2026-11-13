import type { Lesson } from "../types";

/** Series 01 深度課文 — 模板批次，style 過 Harry 目先至套落其餘 Series。 */
export const RHYTHM_LESSONS: Record<string, Lesson> = {
  "1.1": {
    conceptZh: [
      "音樂入面所有嘢都行喺時間上面，而 Beat（拍）就係時間嘅地基。你 clap 唔 clap 到拍、跟唔跟到歌，靠嘅唔係數字，係身體對 Pulse（脈搏）嘅感覺 — 一個穩定、重複、令你想點吓頭嘅律動感。",
      "Tempo（BPM，Beats Per Minute）決定拍子行幾快。流行歌大概 60–180 BPM：慢歌 Ballad 約 60–80，CantoPop 中板約 90–110，Dance Pop 成 120–130。做製作第一步就係揀 BPM — 佢決定成首歌嘅能量級別。",
      "重要概念：Tempo 係絕對嘅（一分鐘幾多拍），但「快慢感覺」係相對嘅 — 同一個 100 BPM，用全音符寫會覺得好慢，用 16 分音符填滿會覺得好急。所以聽歌嗰陣，先問自己：呢首歌嘅 Pulse 喺邊？BPM 大約幾多？",
    ],
    pointsZh: [
      "Beat 係音樂嘅心跳；Pulse 係佢畀你嘅持續律動感",
      "Tempo = BPM；流行音樂常見範圍 60–180",
      "唔使數住聽 — 身體感覺到嘅「點頭位」就係 Beat",
      "同一 BPM，音符時值唔同，快慢感覺可以完全兩樣",
    ],
    listenZh: "隨便播三首你鍾意嘅歌，唔好用任何工具，估 BPM（誤差 ±10 之內算合格）。練得多會自動校準。",
    practiceZh: "開手機 timer，跟住一首 100 BPM 左右嘅歌拍手一分鐘 — 目標係唔甩拍、唔搶拍。",
  },
  "1.2": {
    conceptZh: [
      "時值（Note Value）係一個音「佔幾多拍」。Whole Note 佔 4 拍、Half Note 佔 2 拍、Quarter Note 佔 1 拍 — 每一級就係切半。喺 4/4 嘅世界，一個 Bar 正好裝下一粒 Whole、兩粒 Half 或者四粒 Quarter。",
      "記住一個原則：時值講嘅係長度，同音高完全無關。一粒 Whole Note 可以係好低音嘅鼓，都可以係好高音嘅 string — 佢哋時值一樣。讀節奏譜嗰陣，淨睇個音符嘅「形狀」，唔好理佢擺喺邊條線。",
      "對 DAW 製作人嚟講，呢啲名詞直接變成 Grid 嘅長度單位：你喺 Logic Pro 拉一個 4/4 Loop，入面就係 4 個 Quarter。識咗時值，你先至可以同鼓手、同其他製作人溝通「呢度要一個 half-note 嘅尾音」。",
    ],
    pointsZh: [
      "Whole = 4 拍 · Half = 2 拍 · Quarter = 1 拍（每級切半）",
      "時值 = 長度，同音高無關",
      "4/4 一個 Bar = 1 Whole = 2 Half = 4 Quarter",
      "DAW Grid 就係用呢套語言 — 呢啲係行內溝通單位",
    ],
    listenZh: "聽任何慢歌嘅 intro（例如鋼琴 intro 嘅 CantoPop ballad），留意啲音「叉開幾遠」— 嗰啲就係長時值嘅實際聽感。",
    practiceZh: "喺紙上畫四個格（代表 4 拍），用 W / H / Q 三種符號填滿四個格，畫五個唔同組合 — 呢個就係節奏寫作嘅第一步。",
  },
  "1.3": {
    conceptZh: [
      "把一拍再切細：Eighth Note（八分音符）係半拍，一拍裝兩粒；Sixteenth Note（十六分音符）係四分之一拍，一拍裝四粒。呢個動作叫 Subdivision（細分）— 佢係節奏感嘅核心技術。",
      "點解 Subdivision 咁重要？因為「夾拍唔準」嘅人九成唔係拍子感差，係心入面冇細分。你個腦齋跟「1-2-3-4」行，遇到半拍位就要靠估；但如果你心入面行緊「1-and-2-and」甚至「1-e-and-a」，半拍四分一位就變咗確定座標，唔使估。",
      "聽感上：8th notes 俾你「行路」嘅感覺（大部份 Pop 歌 hi-hat 都係 8ths），16th notes 俾你「急促、推進」嘅感覺（Funk、R&B、快歌 rap 底）。同一個 groove，hi-hat 由 8ths 變 16ths，能量即刻升一級。",
    ],
    pointsZh: [
      "Eighth = 半拍（1 拍 2 粒）；Sixteenth = 四分之一拍（1 拍 4 粒）",
      "數法：8ths 數「1-and-2-and」；16ths 數「1-e-and-a」",
      "拍子準唔準，取決於你心入面有冇細分緊",
      "Hi-hat 由 8ths 變 16ths = 能量提升嘅最平手段",
    ],
    listenZh: "搵一首 Funk 或者 Khalil Fong 嘅 R&B（例如《Love Song》類型嘅 groove），聽吓 hi-hat 係咪行緊 16ths — 仲要留意佢哋大細聲唔均等（呢個係之後 Groove 課嘅伏線）。",
    practiceZh: "用下面個 Rhythm Player：設定 90 BPM，行 8ths 打拍口，然後切 16ths — 目標係口數「1-e-and-a」唔亂。",
  },
  "1.4": {
    conceptZh: [
      "三個修飾時值嘅工具：Dot（附點）把音符延長原本時值嘅一半 — 附點 Quarter = 1.5 拍；Tie（連結線）把兩個同音高音符焊成一粒長音，通常用嚟跨 Bar；Rest（休止符）係「有計劃嘅靜默」，佔時值但唔出聲。",
      "Dot 同 Tie 常常搞亂人，記住分別：Dot 係「呢粒音本身變長」；Tie 係「兩粒音連埋變一粒」。實際寫歌嗰陣，Tie 嘅意義多數係唔想寫出一粒怪時值（例如 3 拍喺 4/4 要跨小節線嗰陣）。",
      "休止符係節奏嘅另一半宇宙。新手寫鼓鍾意填滿晒，大師就識留空 — 一個突然嘅靜默（例如 snare 前面偷走一個 8th）比加嘢更有推進力。記住呢句：節奏唔係由你打咗幾多嘢組成，係由你打嘅嘢同你冇打嘅嘢一齊組成。",
    ],
    pointsZh: [
      "附點 = 原時值 × 1.5（附點 Quarter = 1.5 拍）",
      "Tie 焊接兩個同音高音符；主要用嚟處理跨小節長音",
      "Rest 佔時值嘅靜默 — 係設計，唔係漏咗",
      "「偷走一個音」係編節奏嘅進階武器",
    ],
    listenZh: "聽任何有「頓」位嘅 CantoPop 副歌（唱完一句停半拍再入嗰種）— 嗰個位就係 Rest 喺做嘢。",
    practiceZh: "用 Rhythm Grid：編一個 4/4 pattern，規則係每小節必須有至少一個 8th rest — 感受下「空」點樣令 groove 呼吸。",
  },
  "1.5": {
    conceptZh: [
      "Time Signature（拍號）係分數：上面數字 = 每小節幾拍，下面數字 = 用咩音符做一拍。4/4 即係「以 Quarter 為一拍，每 Bar 四拍」— 佢係流行音樂嘅預設值，霸咗市面上九成以上嘅歌。",
      "3/4 係 Waltz 感覺：強-弱-弱，數「1-2-3」。佢喺流行樂唔常見，所以一用就自帶特色（想想《Counting Stars》intro 嗰種或者華爾滋式嘅 CantoPop 側田《好人》intro 類型）。6/8 就係搖籃曲同 blues ballad 嘅拍號：佢有兩組三連音嘅流動感（1-2-3-4-5-6，重音喺 1 同 4），同 3/4 嘅分別要靠「重音分組」去聽，唔好齋數拍數。",
      "製作人視角：揀拍號係編曲級嘅決定。4/4 係安全、身體本能識跟；非 4/4 自帶識別度但觀眾跳舞會亂。改拍號最實際嘅場景係 bridge 嗰段想「斷氣再起」— 例如 4/4 唱完突然一小節 2/4 再入最後副歌。",
    ],
    pointsZh: [
      "拍號 = 每小節拍數（上）／咩音符做一拍（下）",
      "4/4 係流行樂預設；3/4 = 華爾滋強弱弱；6/8 = 兩組三連音流動感",
      "3/4 定 6/8：睇重音分組（3/4 一組起跌；6/8 兩大組）",
      "橋段插一小節短拍號（2/4）係常見嘅「重新起步」技巧",
    ],
    listenZh: "搵一首 6/8 歌（大部分 blues ballad，例如《All of Me》類型）同一首 3/4 歌對比住聽 — 手唔好數，身體感覺佢「分幾大組」。",
    practiceZh: "Rhythm Player 分別設定 4/4、3/4、6/8 各行八個 Bar，每個都 clap 一次 — clap 錯嗰個就係你下次聽歌要特登留意嘅拍號。",
  },
  "1.6": {
    conceptZh: [
      "Bar（小節 / Measure）係音樂嘅時間容器，由拍號決定容量。喺 DAW 世界，Bar 係你嘅工作單位：一句歌詞通常 2 或 4 Bars，一段 verse 通常 8 或 16 Bars，編曲就係喺呢啲容器之間分配能量。",
      "DAW 嘅 Grid 系統：Bar → Beat → Subdivision。Logic Pro 快捷鍵由粗到幼咁跳 Grid，你就係喺呢個層級之間zoom。識得「聽住 bar 諗編曲」係業餘同職業嘅分水嶺 — 新手聽到「呢句好正」，職業聽到「呢句喺第 9 小節嘅第 3 拍出現，即係第 3 個 bar 嘅反拍」。",
      "實戰智慧：流行結構幾乎所有嘢都係 2 嘅次方（2/4/8/16/32 bars），因為人耳習慣咗呢種對稱。當你想 surprise 聽眾，就玩弄呢個預期 — 早一小節入副歌（15 而唔係 16）係 CantoPop hook 常用嘅小詭計。",
    ],
    pointsZh: [
      "Bar 由拍號定容量；DAW Grid = Bar → Beat → Subdivision",
      "流行結構密碼：乜都係 2 嘅次方 bars（4/8/16/32）",
      "職業耳 = 識講「第幾小節第幾拍」，唔係淨係「呢度好正」",
      "早一小節入副歌係最常用嘅結構驚喜",
    ],
    listenZh: "聽一首熟悉嘅 CantoPop，由 intro 開始數 Bar，數住哂 verse 幾多 bars、副歌幾多 bars — 之後你冇法唔咁樣聽歌，恭喜。",
    practiceZh: "攞紙筆聽一首歌畫「結構圖」：每 8 bars 一格，寫低入面發生咩事（intro/verse/pre-chorus/chorus…）。呢個練習做十次，你編曲眼界會完全唔同。",
  },
  "1.7": {
    conceptZh: [
      "Straight（直拍）：一拍切成兩粒 8ths，長短完全均等 — 「1-and-2-and」每個位一樣重。Swing（搖擺）：成對 8ths 前長後短，第一粒佔咗約 2/3，第二粒縮到 1/3 — 變成「1...and-2...and」嗰種拖住行嘅感覺。",
      "聽感上嘅分別：Straight 似行軍、似電子音樂、似「正路」Pop；Swing 似盪韆韆、似 Jazz、似好多人講嘅「有魂」。方大同 Khalil Fong 成個人都係 Swing 教材 — 佢啲 R&B groove 同 vocal phrasing 大量用 swing，呢個係佢聽落「油」嘅核心原因之一。",
      "數值化：DAW 入面 Swing 通常用百分比表示（50% = straight，66% = classic triplet swing，75% = 極搖擺）。做 Beat 嗰陣唔好齋開一個 swing preset 就算 — 試吓由 55% 慢慢推上 70%，聽住個 groove 由「直」變「油」，你會搵到自己首歌想要嘅嗰個位。",
    ],
    pointsZh: [
      "Straight = 均等分割；Swing = 前長後短（約 2:1）",
      "DAW：50% = straight；66% ≈ 經典 triplet swing",
      "Swing 係「油」感嘅來源 — Khalil Fong 係活教材",
      "Hi-hat 同 vocal 先 swing，kick/snare 可以照直 — 混搭先有層次",
    ],
    listenZh: "用下面個 player 切換 Straight/Swing 同一段節奏，專登聽 hi-hat 嘅「第二下」幾時出現 — 聽得出遲咗，你就聽得出 swing。",
    practiceZh: "播一首你鍾意嘅歌，判斷佢 straight 定 swing；再估 DAW swing % 大約幾多。用 Khalil Fong 嘅歌對答案（多數有明顯 swing）。",
  },
  "1.8": {
    conceptZh: [
      "Syncopation（切分）= 把重音由強拍搬去弱拍或者反拍。Offbeat（反拍）= 拍與拍之間嘅位（8th 位嘅「and」）。Accent（重音）= 人為整大聲嘅某個位。三件事夾埋，就係「groove 點樣同你嘅預期玩遊戲」。",
      "點解切分咁正？因為聽眾嘅身體自動預期強拍會喺 1 同 3（或者 backbeat 嘅 2 同 4）。你將重音放喺「and」位，身體預期落空，即刻產生張力同推進感 — 好多「呢個 groove 好有嘢」嘅感覺，拆開其實就係幾個 offbeat accent。",
      "最簡單嘅入門切分：SKA / reggae 嘅完全反拍吉他（所有 strum 都喺「and」位）；Funk 嘅 16th offbeat；仲有 CantoPop 唱歌嘅「搶半拍入」— 人聲喺 and 位入句而唔係等拍頭，成句嘅 feel 立刻唔同。",
    ],
    pointsZh: [
      "切分 = 重音搬去弱拍/反拍；反拍 = 「and」位",
      "預期落空 → 推進感：groove 嘅張力來源",
      "Reggae 反拍吉他 / Funk 16th offbeat = 切分教科書",
      "人聲搶半拍入句係 CantoPop phrasing 常用技倆",
    ],
    listenZh: "聽任何 funk（Bruno Mars《Uptown Funk》）— clap 住 1-2-3-4，你會發現自己 clap 嘅拍頭同佢嘅重音成日唔疊 — 嗰啲錯位就係切分。",
    practiceZh: "Rhythm Grid：編一個 pattern，snare 唔准放 2、4，只可以放「and」位 — 聽吓成個 groove 點樣即刻「企唔定」但同時好有推進力。",
  },
  "1.9": {
    conceptZh: [
      "三個必修 groove 模板。Pop：四分音符骨架，kick 喺 1 同 3、snare 喺 2 同 4、hi-hat 行 8ths — 姜濤、ERROR 呢類主流 CantoPop 仲有 K-pop 底都係呢個變奏。佢嘅優點係身體本能識跟，係「安全 + 大合唱」嘅選擇。",
      "Rock：同樣 backbeat（2、4 snare），但能量來自 8th notes 嘅連續性 — guitar 同 bass 一齊行 8ths（所謂 driving 8ths），snare 打大啲、hi-hat open 多啲。分 Pop 定 Rock 唔係睇速度，係睇嗰種「一路推唔停」嘅 8th 能量。",
      "Funk：世界觀完全唔同 — 16th notes 做底，但係「疏落嘅 16ths」：成個 pattern 充滿空位同切分，kick 同 snare 出現喺你唔覺意嘅位。空拍係 funk 嘅主角。一個練習：將任何 pop groove 嘅 kick 搬一個去「e」或者「a」位，刪走一兩個 hi-hat — 佢即刻 funk 化。",
    ],
    pointsZh: [
      "Pop = 4 分骨架 + backbeat，身體本能識跟",
      "Rock = 8th 推進能量，唔係睇快慢係睇「唔停」",
      "Funk = 疏落 16ths + 切分，空拍係主角",
      "Pop groove 搬一個 kick 去 e/a 位 = 即刻 funk 化",
    ],
    listenZh: "順序聽：一首主流 CantoPop dance track、一首 rock（任何 rock ballad 嘅 chorus）、一首 funk — 淨係聽鼓，用文字形容三個「能量分佈」嘅分別。",
    practiceZh: "Rhythm Grid 編三個 2-bar pattern：pop / rock / funk 版本同一 100 BPM — 自己彈唔夠胆用滑鼠點都要點出嚟，手感之後先講。",
  },
  "1.10": {
    conceptZh: [
      "總結課：由「識聽」去到「識做」。職業流程係咁：一，拆解 — 數 bar 數、拍號、BPM、邊個鼓喺邊個位；二，重現 — 喺 Grid 上面盡量還原佢；三，變奏 — 改動幾個位，變成你自己嘅 groove。呢個循環就係所有 producer 學節奏嘅真實路徑，冇捷徑。",
      "拆解嘅次序好重要：先鎖定 BPM（用 DAW tap 或者跟住 clap），再確認拍號（九成 4/4），再逐件樂器拆 — kick 先，因為佢通常最清楚；然後 snare；hi-hat 最後，因為佢最密。人聲 groove 都要拆：佢啲字落喺拍頭定反拍？定搶半拍？",
      "最後一個心法：抄係學習，唔係呃。所有大師都抄過 — 重點係抄完成唔明白「點解要咁擺」。每抄一個 groove，逼自己寫低一句「呢個位咁擺係因為 ___」。寫唔出，即係未明，再聽。",
    ],
    pointsZh: [
      "拆解流程：BPM → 拍號 → kick → snare → hi-hat → 人聲位置",
      "重現之後必須變奏 — 咁樣先由「抄」變「學」",
      "每拆一個 groove 寫低一個「點解」— 寫唔出即係未明",
      "拆十個歌嘅節奏，強過亂咁創作一百個",
    ],
    listenZh: "揀一首你極鍾意嘅歌，做完整拆解：BPM、拍號、鼓嘅每個位、人聲 phrasing — 寫滿一版紙。",
    practiceZh: "做下面 AS-01 功課：Logic Pro 起一個 4-bar project，先還原你啱啱拆嗰首歌嘅鼓，再變奏成自己版本。",
  },
};
