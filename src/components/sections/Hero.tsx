"use client";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/21st/Marquee";
import { SITE } from "@/lib/constants";

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const w = window as typeof window & { lenis?: { scrollTo: (el: Element, opts?: object) => void } };
  if (w.lenis) w.lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

// Word-by-word spring reveal — NO perspective on parent (causes 3D bleed)
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  };

  if (prefersReduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.22em] ${className ?? ""}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block">
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Magnetic button
function MagneticButton({
  children, className, onClick, href, external,
}: {
  children: React.ReactNode; className?: string;
  onClick?: () => void; href?: string; external?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={prefersReduced ? {} : { scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href)
    return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{inner}</a>;
  return <button onClick={onClick}>{inner}</button>;
}

const marqueeItems = [
  "Apache Kafka", "Kdb+/Q", "RAG Systems", "LangChain",
  "Azure", "Terraform", "Python", "TypeScript",
  "NLP", "LLMs", "Data Engineering", "UC Berkeley",
];

// Quick stats shown in the right column
const heroStats = [
  { value: "3+", label: "Years at UBS" },
  { value: "94%", label: "Reporting reduction" },
  { value: "5", label: "APAC regions" },
  { value: "↑30%", label: "Data accuracy gain" },
];

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // Mouse position as 0–1 values
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 35, damping: 28 });
  const springY = useSpring(rawY, { stiffness: 35, damping: 28 });

  // Map [0,1] → position across the section (in vw/vh units via pixels)
  // We use left/top directly so percentages are relative to the viewport, not the orb
  const orbLeft = useTransform(springX, [0, 1], ["-10vw", "110vw"]);
  const orbTop  = useTransform(springY, [0, 1], ["-10vh", "90vh"]);

  useEffect(() => {
    if (prefersReduced) return;
    const handler = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [rawX, rawY, prefersReduced]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Dot grid with radial fade */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #2a2520 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 40% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 40% 50%, black 20%, transparent 80%)",
          opacity: 0.55,
        }}
      />

      {/* Mouse-reactive gold orb — positioned with left/top, centered via translate */}
      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: orbLeft,
            top: orbTop,
            width: 700,
            height: 700,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, rgba(253,181,21,0.15) 0%, rgba(253,181,21,0.04) 50%, transparent 70%)",
            filter: "blur(72px)",
          }}
        />
      )}

      {/* Static ambient glow — top-left corner, contained inside the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-96 h-96 opacity-10 rounded-full"
        style={{
          background: "radial-gradient(circle, #FDB515 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-30%, -30%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 px-6 md:px-16 lg:px-24 pt-28 pb-12">

        {/* Left column — name + CTAs */}
        <div className="flex-1">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={prefersReduced ? {} : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FDB515]" style={{ boxShadow: "0 0 6px #FDB515" }} />
            <span className="text-xs tracking-[0.3em] uppercase text-[#5a5048] font-medium">
              Available · Berkeley, CA
            </span>
          </motion.div>

          {/* Name */}
          <h1
            className="font-extrabold leading-[0.88] tracking-tight mb-8"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              fontFamily: "var(--font-bricolage)",
            }}
          >
            <WordReveal text="Divya" delay={0.15} />
            <br />
            <WordReveal text="Jyoti" delay={0.32} className="text-[#FDB515]" />
          </h1>

          {/* Role */}
          <motion.p
            className="text-[#9a8f82] text-base sm:text-lg mb-10 max-w-md leading-relaxed"
            initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Software Engineer &amp; AI/Data MS student at{" "}
            <span className="text-[#f5f0e8] font-medium">UC Berkeley</span>.
            Previously SDE at{" "}
            <span className="text-[#f5f0e8] font-medium">UBS</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-10"
            initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <MagneticButton
              href={SITE.resume}
              external
              className="px-7 py-3 bg-[#FDB515] text-[#0c0b09] rounded-full text-sm font-bold hover:bg-[#e8a512] transition-colors duration-200 tracking-wide whitespace-nowrap"
            >
              View Resume
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("#contact")}
              className="px-7 py-3 border border-[#3a3530] text-[#9a8f82] rounded-full text-sm font-medium hover:border-[#FDB515]/60 hover:text-[#FDB515] transition-all duration-200 tracking-wide whitespace-nowrap"
            >
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Social row */}
          <motion.div
            className="flex items-center gap-5"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="h-px w-6 bg-[#3a3530]" />
            {[
              { icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
              { icon: GithubIcon, href: SITE.github, label: "GitHub" },
              { icon: LinkedinIcon, href: SITE.linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-[#5a5048] hover:text-[#FDB515] transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right column — quick stats (desktop only) */}
        <motion.div
          className="hidden lg:flex flex-col gap-6 w-64 shrink-0"
          initial={prefersReduced ? {} : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="border-l-2 border-[#FDB515]/25 pl-5"
              initial={prefersReduced ? {} : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.08 }}
            >
              <div
                className="text-3xl font-extrabold text-[#f5f0e8] leading-none mb-1 tabular-nums"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                {stat.value}
              </div>
              <p className="text-xs text-[#5a5048]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee strip */}
      <motion.div
        className="relative z-10 border-t border-[#1e1b17] py-4"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Marquee items={marqueeItems} />
      </motion.div>

      {/* Scroll cue */}
      {!prefersReduced && (
        <motion.button
          onClick={() => scrollTo("#about")}
          className="absolute bottom-20 right-8 md:right-16 flex flex-col items-center gap-2 text-[#5a5048] hover:text-[#9a8f82] transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ writingMode: "vertical-rl" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
}
