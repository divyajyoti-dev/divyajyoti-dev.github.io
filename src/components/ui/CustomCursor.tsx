"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot snaps fast
  const dotX = useSpring(mx, { stiffness: 600, damping: 38 });
  const dotY = useSpring(my, { stiffness: 600, damping: 38 });

  // Ring lags behind for the trail effect
  const ringX = useSpring(mx, { stiffness: 120, damping: 16 });
  const ringY = useSpring(my, { stiffness: 120, damping: 16 });

  useEffect(() => {
    if (prefersReduced) return;

    // Only activate on pointer devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleEnter = (e: Event) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "a" || tag === "button") setHovered(true);
    };
    const handleLeave = (e: Event) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "a" || tag === "button") setHovered(false);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <>
      {/* Small gold dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#FDB515]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 10 : 6,
          height: hovered ? 10 : 6,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-[#FDB515]/35"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          opacity: visible ? (hovered ? 0.9 : 0.5) : 0,
          borderColor: hovered ? "rgba(253,181,21,0.7)" : "rgba(253,181,21,0.35)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />
    </>
  );
}
