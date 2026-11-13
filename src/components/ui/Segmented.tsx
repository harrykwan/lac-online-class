"use client";

import { cn } from "@/lib/cn";

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150",
            value === o.value
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
