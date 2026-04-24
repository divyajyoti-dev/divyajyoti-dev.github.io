import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2520] py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#5a5048]">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="text-[#5a5048] hover:text-[#FDB515] transition-colors"
          >
            <Mail size={16} />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#5a5048] hover:text-[#FDB515] transition-colors"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#5a5048] hover:text-[#FDB515] transition-colors"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
