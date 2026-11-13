"use client";
import { useState } from "react";

const WEEKS = [
  ["W1", "節奏解密", "拍感、Subdivision、Groove 點樣由「跟歌」變「控制」"],
  ["W2", "樂理落地", "音程、和弦、調性 — 全部畫喺樂器上，零五線譜恐懼"],
  ["W3", "聽出所以然", "Interval/Chord 聽辨訓練 — 平台互動練習由呢週開始每日 15 分鐘"],
  ["W4", "寫你第一段", "動機發展、 chord progression 點解會「順」"],
  ["W5", "Logic Pro 實戰 I", "由 idea 到 demo：編曲環境、快捷鍵、midi 打磨"],
  ["W6", "Logic Pro 實戰 II", "鼓組、bass line、人聲錄製同執靚"],
  ["W7", "混音入門", "EQ/Compressor/Reverb — 用平台實驗室逐個 parameter 拆"],
  ["W8", "你嘅作品發佈會", "完成一首完整 demo，全班互評 + 導師逐個 mix point 講"],
];

const CREDITS = [
  ["陳柏宇《一天》", "作曲"],
  ["林奕匡《無題時想起的人》", "作曲"],
  ["姜濤《以父之名》演唱會", "和音"],
  ["全民造星 VI", "Top 30 決賽選手"],
  ["KKBOX 音樂風雲榜", "編曲+和音"],
  ["Sandy Lam 演唱會", "和音樂手"],
];

export default function CohortPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const r = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, note }),
      });
      setState(r.ok ? "done" : "err");
    } catch { setState("err"); }
  };

  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-14 text-center">
        <p className="pill mx-auto">FLAGSHIP COHORT · 第一屆 · 2月開學</p>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          靠耳彈咗十年，
          <br />
          <span className="text-[var(--color-accent)]">係時候知自己彈緊咩。</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[var(--color-ink-2)]">
          IAC 旗艦班 — 8 星期，由「跟感覺」去到「識計識砌」。
          每週一堂 live，落堂用互動平台做功課，畢業出品一首完整作品。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#enroll" className="btn-primary px-6 py-3 text-base">留位（早鳥 HK$3,880）</a>
          <a href="/series/rhythm/" className="btn-ghost px-5 py-3 text-sm">試玩課程平台 →</a>
        </div>
        <p className="mt-4 font-mono text-xs tracking-wider text-[var(--color-ink-3)]">
          20 SEATS · FIRST COME FIRST SERVED
        </p>
      </section>

      {/* CREDITS */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <p className="text-center font-mono text-[10px] tracking-widest text-[var(--color-ink-3)] uppercase">
            導師實績 — 唔係齋教書，係行內做緊嘢
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CREDITS.map(([work, role]) => (
              <div key={work} className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-2.5 text-center">
                <p className="text-sm font-medium">{work}</p>
                <p className="font-mono text-[10px] tracking-wider text-[var(--color-ink-3)]">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 WEEKS */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="section-title">8 星期課表</h2>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {WEEKS.map(([w, title, desc]) => (
            <div key={w} className="card p-4">
              <span className="font-mono text-xs text-[var(--color-accent)]">{w}</span>
              <span className="ml-2 font-medium">{title}</span>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-3)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM DIFFERENTIATOR */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:grid-cols-2">
          <div>
            <h2 className="section-title">唔係網課，係訓練系統</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-2)]">
              一般網課：睇片 → 覺得識咗 → 完。
              IAC：每堂概念 → 即場互動示範 → 落堂喺平台做聽辨/節奏/混音練習（瀏覽器即刻玩）→ 交功課 → 導師批。
              你嘅進度、練習紀錄、功課全部喺系統度，唔靠自覺。
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-[var(--color-ink-2)]">
              <li>🎧 瀏覽器互動練習 — 聽音、節奏、EQ/Compressor/Reverb 實驗室</li>
              <li>📊 進度同步 — 換機唔會冇紀錄</li>
              <li>📝 每週實戰功課 — 導師逐份批</li>
              <li>👥 全班群組 + 畢業作品互評</li>
            </ul>
          </div>
          <div className="card card-raised p-6">
            <p className="font-mono text-[10px] tracking-widest text-[var(--color-ink-3)] uppercase">Investment</p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[var(--color-accent)]">HK$3,880</span>
              <span className="text-sm line-through text-[var(--color-ink-3)]">HK$4,800</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-ink-3)]">早鳥價至 1月15日 · 之後正價</p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-[var(--color-ink-2)]">
              <p>✓ 8 堂 live（每堂 90 分鐘 + Q&A）</p>
              <p>✓ 課程平台完整使用權（5 大系列）</p>
              <p>✓ 每週功課批改</p>
              <p>✓ 畢業 demo 完成指導</p>
              <p>✓ 缺堂有錄影補</p>
            </div>
            <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-xs leading-relaxed text-[var(--color-ink-3)]">
              計落 HK$485/堂 — 香港琴行 1 對 1 學費一半，但你得到嘅係成個系統。
            </p>
          </div>
        </div>
      </section>

      {/* ENROLL FORM */}
      <section id="enroll" className="mx-auto max-w-xl px-4 py-16">
        <h2 className="section-title text-center">早鳥留位</h2>
        <p className="mt-2 text-center text-sm text-[var(--color-ink-2)]">
          留低資料，開售嗰刻優先通知你（早鳥價限 20 位）。
        </p>
        {state === "done" ? (
          <div className="card card-raised mt-8 p-8 text-center">
            <p className="text-2xl font-bold text-[var(--color-accent)]">✓ 留位成功</p>
            <p className="mt-3 text-sm text-[var(--color-ink-2)]">開售前你會第一個收到通知。而家可以先免費試玩平台：</p>
            <a href="/series/rhythm/" className="btn-primary mt-5 inline-block px-5 py-2.5">試玩課程 →</a>
          </div>
        ) : (
          <form onSubmit={submit} className="card card-raised mt-8 space-y-4 p-6">
            <input
              required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="稱呼"
              className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-3 outline-none focus:border-[var(--color-accent)]"
            />
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email（開售通知用）"
              className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-3 outline-none focus:border-[var(--color-accent)]"
            />
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="你而家玩咩樂器/軟件？想學到咩？（選填，幫我調整課程內容）"
              rows={3}
              className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-3 outline-none focus:border-[var(--color-accent)]"
            />
            {state === "err" && <p className="text-sm text-[var(--color-warn)]">出咗小問題，試多一次或者直接 WhatsApp 我哋。</p>}
            <button type="submit" disabled={state === "busy"} className="btn-primary w-full py-3.5 text-base">
              {state === "busy" ? "…" : "留位 · HK$3,880 早鳥"}
            </button>
            <p className="text-center text-xs text-[var(--color-ink-3)]">而家唔使俾錢 — 開售先通知，付款屆時先。</p>
          </form>
        )}
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="section-title">常見問題</h2>
        <div className="mt-6 flex flex-col gap-2">
          {[
            ["我完全零基礎得唔得？", "得。W1-W2 由零教起；有得玩嘅，堂上會有進階挑戰版功課。"],
            ["要有咩設備？", "一部電腦 + 一對耳機 +（最好有）一個 midi keyboard。Logic Pro 有 1 個月免費試用。"],
            ["Live 堂幾點？", "逢週一或週三夜晚（香港時間），報名人數齊後投票定。全部有錄影。"],
            ["真係學得識？", "每堂有功課、有批改、有練習紀錄 — 唔靠你自己自覺。畢業嗰週你會有一首自己嘅完整作品做證明。"],
          ].map(([q, a]) => (
            <details key={q} className="card p-4 [&_summary]:cursor-pointer">
              <summary className="font-medium">{q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-2)]">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
