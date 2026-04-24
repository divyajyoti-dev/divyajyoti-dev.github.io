export interface Experience {
  id: string;
  title: string;
  organization: string;
  organizationUrl?: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  type: "work" | "education";
  highlights: string[];
  technologies?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  category: "ai-ml" | "data-eng" | "frontend" | "tools";
  featured: boolean;
}

export interface SkillCategory {
  label: string;
  icon: string;
  skills: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
