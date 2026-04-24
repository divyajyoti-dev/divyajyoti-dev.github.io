"use client";

import { motion, useReducedMotion } from "motion/react";
import { Brain, Database, Server, Cloud, Wrench } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Brain, Database, Server, Cloud, Wrench,
};

export default function Skills() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-[#5a5048] mb-3">Skills</p>
          <h2
            className="text-5xl sm:text-6xl font-extrabold text-[#f5f0e8] mb-16 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            What I work with.
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Brain;
            return (
              <FadeIn key={cat.label} delay={i * 0.06}>
                <div className="group grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-10 py-7 border-b border-[#1a1815] last:border-0 items-start">
                  {/* Category */}
                  <div className="flex items-center gap-2.5">
                    <Icon
                      size={13}
                      className="text-[#FDB515] shrink-0"
                    />
                    <span className="text-sm font-semibold text-[#f5f0e8] tracking-wide">
                      {cat.label}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <motion.span
                        key={skill}
                        className="text-sm text-[#9a8f82] hover:text-[#FDB515] transition-colors duration-200 cursor-default"
                        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + j * 0.03, duration: 0.35 }}
                        whileHover={prefersReduced ? {} : { y: -2 }}
                      >
                        {skill}
                        {j < cat.skills.length - 1 && (
                          <span className="text-[#2a2520] ml-2">·</span>
                        )}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
