import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-6xl font-bold text-[var(--color-accent)]">404</p>
      <h1 className="mt-4 text-2xl font-bold">找不到這一頁</h1>
      <p className="mt-2 text-sm text-[var(--color-ink-2)]">
        這個拍子不在小節裡 — 回到課程首頁重新對齊。
      </p>
      <Link href="/" className="btn-primary mt-6">
        ← 返回首頁
      </Link>
    </div>
  );
}
