import { cn } from "@/lib/cn";

export function ProgressRing({
  value,
  size = 56,
  accent = "var(--color-accent)",
  labelZh,
  className,
}: {
  value: number;
  size?: number;
  accent?: string;
  labelZh?: string;
  className?: string;
}) {
  const stroke = Math.max(3, size / 14);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(100, Math.max(0, value)) / 100);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={labelZh ?? `進度 ${value}%`}
      className={cn("shrink-0 -rotate-90", className)}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 400ms ease-out" }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90 fill-current text-[10px] font-semibold"
        style={{ transformOrigin: "center" }}
      >
        {value}%
      </text>
    </svg>
  );
}
