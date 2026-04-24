"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";

const stats = [
  { value: 94, suffix: "%", label: "reduction in manual reporting" },
  { value: 30, suffix: "%", label: "data accuracy gain at UBS" },
  { value: 93, suffix: "%", label: "processing time cut" },
  { value: 5, suffix: "", label: "APAC regions integrated" },
];

function AnimatedStat({
  value, suffix, label, delay,
}: {
  value: number; suffix: string; label: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref as any, { once: true, margin: "-40px" as any });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 55, damping: 18 });
  const rounded = useTransform(spring, Math.round);

  useEffect(() => {
    if (isInView && !prefersReduced) count.set(value);
  }, [isInView, count, value, prefersReduced]);

  return (
    <FadeIn delay={delay} direction="up">
      <div ref={ref} className="group relative">
        {/* Gold left accent */}
        <div className="absolute -left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FDB515] to-[#FDB515]/10 rounded-full" />
        <div className="pl-5 py-1">
          <div
            className="text-5xl sm:text-6xl font-extrabold text-[#f5f0e8] leading-none mb-1.5 tabular-nums"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            {prefersReduced ? value : <motion.span>{rounded}</motion.span>}
            <span className="text-[#FDB515]">{suffix}</span>
          </div>
          <p className="text-sm text-[#5a5048] leading-snug">{label}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-16 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-[#5a5048] mb-3">About</p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Left — headline + stats */}
          <div>
            <FadeIn delay={0.05}>
              <h2
                className="text-5xl sm:text-6xl font-extrabold text-[#f5f0e8] mb-14 leading-[0.92] tracking-tight"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                Caffeine-powered<br />
                <span className="text-[#FDB515]">engineer.</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((s, i) => (
                <AnimatedStat key={s.label} {...s} delay={0.1 + i * 0.08} />
              ))}
            </div>
          </div>

          {/* Right — bio */}
          <div className="space-y-6 lg:pt-20">
            <FadeIn delay={0.12} direction="left">
              <p className="text-[#9a8f82] text-base leading-[1.9]">
                I spent 3+ years at UBS as a Software Development Engineer, building systems that
                handle financial risk data at scale — Kafka pipelines across 5 APAC regions, Kdb+/Q
                dashboards that cut reporting overhead by 94%, and Azure infrastructure wrangled through
                Terraform. I care about systems that are fast, reliable, and actually used.
              </p>
            </FadeIn>
            <FadeIn delay={0.18} direction="left">
              <p className="text-[#9a8f82] text-base leading-[1.9]">
                Now at UC Berkeley&apos;s School of Information, I&apos;m focused on the part of AI that
                actually matters — making it do something useful. RAG systems, LLM-powered code tools,
                NLP pipelines. If it solves a real problem, I want to build it.
              </p>
            </FadeIn>

            <FadeIn delay={0.26} direction="left">
              <div className="flex items-center gap-3 pt-4">
                <div className="h-px w-8 bg-[#FDB515]" />
                <span className="text-sm text-[#FDB515] font-medium tracking-wide">
                  Open to Summer 2026 internships
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
