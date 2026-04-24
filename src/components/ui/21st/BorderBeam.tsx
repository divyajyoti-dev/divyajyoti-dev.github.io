"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  delay = 0,
  colorFrom = "#FDB515",
  colorTo = "transparent",
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]",
        "[background:linear-gradient(#141210,#141210)_padding-box,linear-gradient(calc(var(--angle)*1deg),var(--color-from),var(--color-to),var(--color-from))_border-box]",
        "[animation:border-beam_calc(var(--duration)*1s)_var(--delay)_infinite_linear]",
        className
      )}
    />
  );
}
