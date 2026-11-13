import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  max = 100,
  accent = "var(--color-accent)",
  labelZh,
  className,
}: {
  value: number;
  max?: number;
  accent?: string;
  labelZh?: string;
  className?: string;
}) {
  const pct = max === 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={labelZh}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-line)]", className)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-400 ease-out"
        style={{ width: `${pct}%`, background: accent }}
      />
    </div>
  );
}
