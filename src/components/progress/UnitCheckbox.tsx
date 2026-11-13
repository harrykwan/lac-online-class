"use client";

import { cn } from "@/lib/cn";

export function UnitCheckbox({
  done,
  onToggle,
  label,
  accent = "var(--color-accent)",
}: {
  done: boolean;
  onToggle: () => void;
  label: string;
  accent?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors duration-150",
        done ? "border-transparent" : "border-white/20 bg-transparent hover:border-white/40",
      )}
      style={done ? { background: accent } : undefined}
    >
      {done && (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M2 6.5 4.8 9.2 10 3.5"
            fill="none"
            stroke="#0b0d12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
