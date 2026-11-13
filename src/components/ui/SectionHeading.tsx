import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  accent,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl", className)}>
      {eyebrow && (
        <p
          className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: accent ?? "var(--color-accent-2)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {desc && <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">{desc}</p>}
    </div>
  );
}
