import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({ items, className, separator = "·", speed = "normal" }: MarqueeProps) {
  const duration = speed === "slow" ? "40s" : speed === "fast" ? "18s" : "28s";
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden select-none", className)}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-3">
            <span>{item}</span>
            <span className="text-[#FDB515] text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
