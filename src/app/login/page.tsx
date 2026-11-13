"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doLogin, doSignup } from "@/lib/auth";

export default function LoginPage() {
  const { refresh } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      if (mode === "login") await doLogin(email, password);
      else await doSignup(email, password, name);
      await refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <p className="pill mb-6">{mode === "login" ? "STUDENT LOGIN" : "CREATE ACCOUNT"}</p>
      <h1 className="text-3xl font-bold tracking-tight">
        {mode === "login" ? "登入繼續學習" : "開始你嘅課程"}
      </h1>
      <p className="mt-2 text-sm text-[var(--color-ink-2)]">
        {mode === "login"
          ? "登入後進度自動雲端同步，任何裝置接得住。"
          : "建立帳號，進度永久保存。唔使 email 驗證，即刻開始。"}
      </p>
      <form onSubmit={submit} className="card card-raised mt-8 space-y-4 p-6">
        {mode === "signup" && (
          <label className="block text-sm">
            <span className="mb-1.5 block font-mono text-[11px] tracking-wider text-[var(--color-ink-3)] uppercase">Name 稱呼</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]" placeholder="你嘅名" />
          </label>
        )}
        <label className="block text-sm">
          <span className="mb-1.5 block font-mono text-[11px] tracking-wider text-[var(--color-ink-3)] uppercase">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]" placeholder="you@example.com" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-mono text-[11px] tracking-wider text-[var(--color-ink-3)] uppercase">Password</span>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface-2)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]" placeholder="最少 6 個字" />
        </label>
        {error && <p className="rounded-md border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-3 py-2 text-sm text-[var(--color-warn)]">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full py-3 text-base">
          {busy ? "…" : mode === "login" ? "登入" : "建立帳號"}
        </button>
        <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="w-full text-center text-sm text-[var(--color-ink-2)] underline-offset-4 hover:underline">
          {mode === "login" ? "冇帳號？建立一個 →" : "有帳號？去登入 →"}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-[var(--color-ink-3)]">
        <Link href="/" className="hover:underline">← 返回課程</Link>
      </p>
    </div>
  );
}
