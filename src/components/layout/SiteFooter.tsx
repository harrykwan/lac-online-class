import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-semibold text-[var(--color-ink-2)]">{site.brandZh}</p>
        <p className="mt-1 text-xs text-[var(--color-ink-3)]">
          {site.brandEn} — 從音樂基礎到完整音樂製作
        </p>
        <p className="mt-4 text-xs text-[var(--color-ink-3)]">
          學習進度儲存於你的瀏覽器（localStorage），不會上傳到任何伺服器。
        </p>
      </div>
    </footer>
  );
}
