"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { SITE } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const w = window as typeof window & { lenis?: { scrollTo: (el: Element, opts?: object) => void } };
    if (w.lenis) {
      w.lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);

  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
        style={{}}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{ opacity: bgOpacity, backgroundColor: "#0c0b09" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#2a2520]"
          style={{ opacity: borderOpacity }}
        />

        <div className="relative flex h-16 items-center justify-between max-w-6xl mx-auto">
          <button
            onClick={() => scrollTo("#hero")}
            className="text-base font-bold text-[#f5f0e8] hover:text-[#FDB515] transition-colors duration-200 tracking-tight"
          >
            {SITE.name.split(" ")[0]}
            <span className="text-[#FDB515]">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.href}
                link={link}
                isActive={activeId === link.href.replace("#", "")}
              />
            ))}
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-1.5 text-sm font-medium border border-[#FDB515] text-[#FDB515] rounded-full hover:bg-[#FDB515] hover:text-[#0c0b09] transition-all duration-200"
            >
              Resume
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#9a8f82] hover:text-[#f5f0e8] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#141210] border-l border-[#2a2520] p-8 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="self-end text-[#9a8f82] hover:text-[#f5f0e8] mb-10 transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => scrollTo(link.href), 300);
                    }}
                    className="text-left text-lg font-medium text-[#9a8f82] hover:text-[#FDB515] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={SITE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-5 py-2.5 text-sm font-medium border border-[#FDB515] text-[#FDB515] rounded-full text-center hover:bg-[#FDB515] hover:text-[#0c0b09] transition-all"
                >
                  Resume
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLinkItem({
  link,
  isActive,
}: {
  link: { label: string; href: string };
  isActive: boolean;
}) {
  return (
    <motion.button
      onClick={() => scrollTo(link.href)}
      className={cn(
        "text-sm font-medium transition-colors duration-200 relative pb-1",
        isActive ? "text-[#FDB515]" : "text-[#9a8f82] hover:text-[#f5f0e8]"
      )}
      whileHover={{ x: 2 }}
    >
      {link.label}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-px bg-[#FDB515]"
        />
      )}
    </motion.button>
  );
}
