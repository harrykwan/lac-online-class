import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  accent,
  className,
}: {
  children: ReactNode;
  /** CSS color string used for text + border tint */
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("pill", className)}
      style={
        accent
          ? {
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
