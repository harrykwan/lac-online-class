"use client";

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display?: string;
  disabled?: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="flex items-baseline justify-between text-xs text-[var(--color-ink-2)]">
        <span>{label}</span>
        <span className="font-mono text-[var(--color-ink)]">
          {display ?? value}
        </span>
      </span>
      <input
        type="range"
        className="range-dark w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </label>
  );
}
