import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    label: "AI / ML",
    icon: "Brain",
    skills: ["Python", "PyTorch", "LangChain", "RAG", "Hugging Face", "NLP", "Transformers", "Jupyter"],
  },
  {
    label: "Data Engineering",
    icon: "Database",
    skills: ["Apache Kafka", "Kdb+/Q", "Azure Data Factory", "Terraform", "ARM Templates", "ETL Pipelines"],
  },
  {
    label: "Backend",
    icon: "Server",
    skills: ["Node.js", "TypeScript", "REST APIs", "Python", "SQL", "Validation Frameworks"],
  },
  {
    label: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: ["Azure", "Azure DevOps", "Infrastructure as Code", "CI/CD", "Monitoring & Alerting"],
  },
  {
    label: "Tools & Platforms",
    icon: "Wrench",
    skills: ["Git", "GitHub", "VS Code", "Linux", "Postman", "Jupyter Notebook"],
  },
];
