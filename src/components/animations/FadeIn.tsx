"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  margin?: string;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
  margin = "-80px",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once, margin: margin as any });

  const offsets = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, ...offset }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : prefersReduced
            ? { opacity: 1 }
            : { opacity: 0, ...offset }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
