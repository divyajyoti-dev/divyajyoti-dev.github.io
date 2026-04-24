"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";
import { BorderBeam } from "@/components/ui/21st/BorderBeam";
import FadeIn from "@/components/animations/FadeIn";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const categories = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "data-eng", label: "Data" },
  { id: "frontend", label: "Frontend" },
  { id: "tools", label: "Tools" },
] as const;

type CategoryId = "all" | "ai-ml" | "data-eng" | "frontend" | "tools";

const categoryColors: Record<string, string> = {
  "ai-ml": "#a855f7",
  "data-eng": "#22d3ee",
  "frontend": "#34d399",
  "tools": "#f97316",
};

// No `layout` prop — layout animations inside AnimatePresence mode="wait" can desync card content
function FeaturedCard({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      whileHover={prefersReduced ? {} : { y: -4 }}
      className="h-full"
    >
      <SpotlightCard
        className="h-full rounded-2xl border border-[#2a2520] bg-[#0f0e0c] p-6 flex flex-col"
        spotlightColor="rgba(253,181,21,0.12)"
      >
        <BorderBeam duration={14} size={180} colorFrom="#FDB515" colorTo="transparent" />

        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide uppercase"
            style={{
              color: categoryColors[project.category] ?? "#FDB515",
              background: `${categoryColors[project.category] ?? "#FDB515"}18`,
            }}
          >
            {project.category.replace("-", " ")}
          </span>
          <div className="flex gap-3 shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#5a5048] hover:text-[#FDB515] transition-colors"
            >
              <GithubIcon size={15} />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live"
                className="text-[#5a5048] hover:text-[#FDB515] transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#f5f0e8] mb-2 leading-tight" style={{ fontFamily: "var(--font-bricolage)" }}>
          {project.name}
        </h3>
        <p className="text-sm text-[#9a8f82] leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded bg-[#1a1815] text-[#5a5048] border border-[#2a2520]"
            >
              {tech}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

// Secondary card: no h-full — let the card size from its own content
function SecondaryCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
    >
      <SpotlightCard className="group rounded-xl border border-[#1e1b17] hover:border-[#2a2520] bg-[#0c0b09] p-5 flex flex-col transition-colors duration-200">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#f5f0e8] group-hover:text-[#FDB515] transition-colors duration-200 leading-snug">
            {project.name}
          </h3>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5a5048] hover:text-[#FDB515] transition-colors ml-2 shrink-0"
          >
            <GithubIcon size={13} />
          </a>
        </div>
        <p className="text-xs text-[#5a5048] leading-relaxed mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] text-[#5a5048] px-1.5 py-0.5 bg-[#141210] rounded border border-[#1e1b17]">
              {tech}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<CategoryId>("all");
  const prefersReduced = useReducedMotion();

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);
  const featured = filtered.filter((p) => p.featured);
  const secondary = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-[#5a5048] mb-3">Projects</p>
          <h2
            className="text-5xl sm:text-6xl font-extrabold text-[#f5f0e8] mb-10 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Things I&apos;ve built.
          </h2>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.08}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id as CategoryId)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  active === cat.id
                    ? "bg-[#FDB515] text-[#0c0b09]"
                    : "border border-[#2a2520] text-[#5a5048] hover:text-[#9a8f82] hover:border-[#3a3530]"
                }`}
                whileHover={prefersReduced ? {} : { scale: 1.04 }}
                whileTap={prefersReduced ? {} : { scale: 0.96 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Cards — AnimatePresence mode="wait" swaps the whole grid when filter changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {featured.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {featured.map((p) => (
                  <FeaturedCard key={p.id} project={p} />
                ))}
              </div>
            )}

            {secondary.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                {secondary.map((p) => (
                  <SecondaryCard key={p.id} project={p} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <p className="text-[#5a5048] py-16 text-sm">No projects in this category yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
