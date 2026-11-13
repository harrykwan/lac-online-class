"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SERIES, SERIES_ORDER } from "@/data/series";
import { site } from "@/data/site";
import { accentVar } from "@/lib/accents";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkCls = (href: string) =>
    cn(
      "rounded-lg px-3 py-1.5 text-sm transition-colors duration-150",
      pathname === href || pathname === href.replace(/\/$/, "")
        ? "bg-white/[0.08] text-[var(--color-ink)]"
        : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-base)]">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4" aria-label="主導覽">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs text-white"
            style={{
              background: "var(--color-accent)",
            }}
          >
            IA
          </span>
          <span className="hidden sm:inline">{site.brandZh}</span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <Link href="/" className={linkCls("/")}>
            首頁
          </Link>
          {SERIES_ORDER.map((id) => {
            const s = SERIES[id];
            return (
              <Link
                key={id}
                href={`/series/${s.slug}/`}
                className={linkCls(`/series/${s.slug}/`)}
                style={{ color: pathname === `/series/${s.slug}/` ? accentVar(s.accent) : undefined }}
              >
                <span className="font-mono text-[10px] opacity-70">{s.number}</span> {s.titleZh}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="btn-ghost ml-auto px-3 py-2 lg:hidden"
          aria-expanded={open}
          aria-label="開啟選單"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/" className={linkCls("/")} onClick={() => setOpen(false)}>
              首頁
            </Link>
            {SERIES_ORDER.map((id) => {
              const s = SERIES[id];
              return (
                <Link
                  key={id}
                  href={`/series/${s.slug}/`}
                  className={linkCls(`/series/${s.slug}/`)}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-[10px] opacity-70">{s.number}</span> {s.titleZh}{" "}
                  <span className="text-xs text-[var(--color-ink-3)]">{s.titleEn}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
