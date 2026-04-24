import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "macromind",
    name: "MacroMind",
    description:
      "RAG-powered nutrition assistant that retrieves and reasons over nutritional data to answer health-related queries with grounded, accurate responses.",
    githubUrl: "https://github.com/divyajyoti-dev/MacroMind",
    technologies: ["Python", "RAG", "LangChain", "Jupyter", "NLP"],
    category: "ai-ml",
    featured: true,
  },
  {
    id: "crosswalk-ai",
    name: "crosswalk-ai",
    description:
      "Automated cost code reconciliation system using AI to map and validate financial entries, reducing manual effort and improving accuracy.",
    githubUrl: "https://github.com/divyajyoti-dev/crosswalk-ai",
    technologies: ["Python", "LLMs", "NLP", "Data Processing"],
    category: "ai-ml",
    featured: true,
  },
  {
    id: "llm-reviewer",
    name: "LLM-Reviewer",
    description:
      "Automated code review tool powered by large language models. Analyzes diffs and pull requests to surface issues, suggest improvements, and enforce best practices.",
    githubUrl: "https://github.com/divyajyoti-dev/LLM-Reviewer",
    technologies: ["Python", "LLMs", "GitHub API", "Code Analysis"],
    category: "tools",
    featured: true,
  },
  {
    id: "negotiator",
    name: "Negotiator",
    description:
      "TypeScript application exploring AI-driven negotiation mechanics and decision-making under uncertainty.",
    githubUrl: "https://github.com/divyajyoti-dev/Negotiator",
    technologies: ["TypeScript", "AI", "Decision Systems"],
    category: "ai-ml",
    featured: true,
  },
  {
    id: "civicnudge",
    name: "CivicNudge",
    description:
      "TypeScript application designed to nudge civic engagement and awareness through intelligent information surfacing.",
    githubUrl: "https://github.com/divyajyoti-dev/CivicNudge",
    technologies: ["TypeScript", "React", "Civic Tech"],
    category: "frontend",
    featured: false,
  },
  {
    id: "anlp",
    name: "ANLP",
    description:
      "Applied Natural Language Processing coursework at UC Berkeley — implementations of core NLP techniques from tokenization to neural models.",
    githubUrl: "https://github.com/divyajyoti-dev/ANLP",
    technologies: ["Python", "NLP", "PyTorch", "Transformers"],
    category: "ai-ml",
    featured: false,
  },
  {
    id: "audio-viz",
    name: "audio-viz",
    description:
      "Real-time audio visualization built with JavaScript — translates sound frequencies and amplitude into dynamic visual output.",
    githubUrl: "https://github.com/divyajyoti-dev/audio-viz",
    technologies: ["JavaScript", "Web Audio API", "Canvas", "Visualization"],
    category: "frontend",
    featured: false,
  },
  {
    id: "autodoc",
    name: "AutoDoc",
    description:
      "Automated documentation generation tool that analyzes codebases and produces structured, readable docs from source code.",
    githubUrl: "https://github.com/divyajyoti-dev/AutoDoc",
    technologies: ["Python", "AST Parsing", "LLMs", "Documentation"],
    category: "tools",
    featured: false,
  },
];
