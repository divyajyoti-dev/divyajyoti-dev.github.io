"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import FadeIn from "@/components/animations/FadeIn";
import { SITE } from "@/lib/constants";

const links = [
  { label: "Email", href: `mailto:${SITE.email}`, icon: Mail, value: SITE.email, external: false },
  { label: "GitHub", href: SITE.github, icon: GithubIcon, value: "divyajyoti-dev", external: true },
  { label: "LinkedIn", href: SITE.linkedin, icon: LinkedinIcon, value: "divya--jyoti", external: true },
];

export default function Contact() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="contact" className="py-32 px-6 md:px-16 lg:px-24 bg-[#0a0908] relative overflow-hidden">
      {/* Large faint text watermark */}
      <div
        className="pointer-events-none absolute -bottom-6 -right-4 text-[clamp(6rem,18vw,14rem)] font-extrabold text-[#FDB515]/[0.03] leading-none select-none"
        aria-hidden
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        HELLO
      </div>

      <div className="relative max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-[#5a5048] mb-3">Contact</p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#f5f0e8] mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Let&apos;s build<br />
            <span className="text-[#FDB515]">something.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="text-[#9a8f82] text-base mb-14 max-w-md leading-relaxed">
            Open to {SITE.openTo} and interesting problems. If you&apos;re working on something
            that matters — reach out.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <FadeIn key={link.label} delay={0.16 + i * 0.08}>
                <motion.a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-4 py-3 text-[#9a8f82] hover:text-[#f5f0e8] transition-colors duration-200"
                  whileHover={prefersReduced ? {} : { x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Icon size={16} className="text-[#FDB515] shrink-0" />
                  <span className="text-base font-medium">{link.value}</span>
                  {link.external && (
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#FDB515]"
                    />
                  )}
                </motion.a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
