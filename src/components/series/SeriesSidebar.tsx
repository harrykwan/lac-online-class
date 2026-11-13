"use client";

import { useState } from "react";
import type { Series } from "@/data/types";
import { accentVar } from "@/lib/accents";
import { useProgress } from "@/context/ProgressContext";
import { ProgressRingLive } from "./ProgressRingLive";
import { cn } from "@/lib/cn";

/** Unit checklist: sticky sidebar on desktop, accordion above content on mobile. */
export function SeriesSidebar({ series }: { series: Series }) {
  const accent = accentVar(series.accent);
  const progress = useProgress();
  const [open, setOpen] = useState(false);

  const list = (
    <ol className="mt-4 flex flex-col gap-0.5">
      {series.units.map((u) => {
        const done = progress.isUnitDone(u.code);
        return (
          <li key={u.code}>
            <button
              type="button"
              onClick={() => progress.toggleUnit(u.code)}
              title={done ? "取消完成" : "標記完成"}
              aria-pressed={done}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors duration-150 hover:bg-white/[0.06]",
                done ? "text-[var(--color-ink-3)]" : "text-[var(--color-ink-2)]",
              )}
            >
              <span
                aria-hidden="true"
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[9px]"
                style={
                  done
                    ? { background: accent, borderColor: accent, color: "#0b0d12" }
                    : { borderColor: "var(--color-line)" }
                }
              >
                {done ? "✓" : ""}
              </span>
              <span className="font-mono text-[10px]" style={{ color: accent }}>
                {u.code}
              </span>
              <span className="truncate">{u.titleZh}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* mobile accordion */}
      <details
        className="card mx-4 mt-4 open:pb-4 lg:hidden"
        open={open}
        onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer list-none p-4 text-sm font-semibold">
          單元清單（點擊勾選完成）{" "}
          <span className="float-right text-[var(--color-ink-3)]">{open ? "▲" : "▼"}</span>
        </summary>
        <div className="px-2">{list}</div>
      </details>

      {/* desktop sticky */}
      <aside className="hidden lg:block">
        <div className="card card-raised sticky top-20 p-4">
          <p className="text-xs font-semibold tracking-widest text-[var(--color-ink-3)] uppercase">
            Units
          </p>
          <div className="mt-2 flex justify-center">
            <ProgressRingLive seriesId={series.id} accent={accent} size={56} />
          </div>
          <div className="mt-2 max-h-[60vh] overflow-y-auto scroll-slim">{list}</div>
          <p className="mt-2 px-2 text-[10px] leading-relaxed text-[var(--color-ink-3)]">
            點擊單元即可切換完成狀態（自動儲存）。
          </p>
        </div>
      </aside>
    </>
  );
}
