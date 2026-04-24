"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { experiences } from "@/data/experience";
import type { Experience } from "@/types";

function ExperienceEntry({ exp }: { exp: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref as any, { once: true, margin: "-60px" as any });

  return (
    <motion.div
      ref={ref}
      className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-10 py-10 border-b border-[#1a1815] last:border-0"
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* Date + type */}
      <div className="flex sm:flex-col sm:items-end gap-3 sm:gap-2 pt-0.5 shrink-0">
        <span className="text-xs text-[#5a5048] leading-snug sm:text-right whitespace-nowrap">
          {exp.startDate} – {exp.endDate}
        </span>
        {exp.type === "education" && (
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#FDB515]/25 text-[#FDB515]/60 font-medium whitespace-nowrap">
            Education
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative pl-5 border-l border-[#2a2520]">
        {/* Gold dot */}
        <div className="absolute -left-[5px] top-[6px] w-[9px] h-[9px] rounded-full bg-[#0c0b09] border-2 border-[#FDB515]" />

        <h3
          className="text-[#f5f0e8] font-bold text-lg leading-tight mb-1"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {exp.title}
        </h3>

        <a
          href={exp.organizationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#FDB515]/80 hover:text-[#FDB515] hover:underline transition-colors font-medium block mb-4"
        >
          {exp.organization} &nbsp;·&nbsp; {exp.location}
        </a>

        <ul className="list-none space-y-2 mb-4">
          {exp.highlights.map((h, i) => (
            <motion.li
              key={i}
              className="flex gap-3 text-sm text-[#9a8f82] leading-relaxed"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 8 }}
              animate={isInView ? { opacity: 1, x: 0 } : prefersReduced ? { opacity: 1 } : { opacity: 0, x: 8 }}
              transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
            >
              {/* Simple styled dot — more reliable than ◆ at small sizes */}
              <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[#FDB515]/40 inline-block" />
              {h}
            </motion.li>
          ))}
        </ul>

        {exp.technologies && (
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded bg-[#141210] text-[#5a5048] border border-[#1e1b17]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-16 lg:px-24 bg-[#0a0908]">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-[#5a5048] mb-3">Experience</p>
          <h2
            className="text-5xl sm:text-6xl font-extrabold text-[#f5f0e8] mb-14 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Where I&apos;ve been.
          </h2>
        </FadeIn>

        <div>
          {experiences.map((exp) => (
            <ExperienceEntry key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
