"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function StaggerChildren({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
  margin = "-80px",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once, margin: margin as any });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={
        prefersReduced
          ? {}
          : {
              hidden: {},
              visible: { transition: { staggerChildren: staggerDelay } },
            }
      }
    >
      {children}
    </motion.div>
  );
}
