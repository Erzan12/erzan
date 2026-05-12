"use client";

import {
  Server,
  Layout,
  Database,
  Terminal,
  Sparkles,
  Cpu,
  Globe,
  Workflow,
} from "lucide-react";

import { ReactNode } from "react";
import SkillCard from "./skills/skill-card";

const skillData = [
  {
    category: "Backend Engineering",
    icon: <Server className="w-5 h-5 text-rose-400" />,
    items: [
      "NestJS",
      "PHP",
      "Laravel",
      "CodeIgniter",
      "Node.js",
      "Express",
    ],
    description:
      "Designing scalable APIs, authentication systems, and maintainable backend architectures focused on reliability and performance.",
    badge: "System Architecture",
    gridConfig: "md:col-span-7 min-h-[420px]",
  },

  {
    category: "Frontend Experience",
    icon: <Layout className="w-5 h-5 text-sky-400" />,
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    description:
      "Building immersive interfaces with responsive design, motion systems, and component-driven development.",
    badge: "Interactive UI",
    gridConfig: "md:col-span-5 min-h-[200px]",
  },

  {
    category: "Infrastructure & DevOps",
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    items: ["Docker", "Linux", "Git", "Vercel", "CI/CD"],
    description:
      "Managing deployments, automation pipelines, and modern cloud-native development workflows.",
    badge: "Deployment Workflow",
    gridConfig: "md:col-span-5 min-h-[200px]",
  },

  {
    category: "Data & Persistence",
    icon: <Database className="w-5 h-5 text-violet-400" />,
    items: ["PostgreSQL", "MySQL", "Prisma", "Redis"],
    description:
      "Designing relational data models, query optimization, caching, and persistence strategies.",
    badge: "Data Modeling",
    gridConfig: "md:col-span-7 min-h-[220px]",
  },

  // NEW CARD 1
  // {
  //   category: "Engineering Principles",
  //   icon: <Workflow className="w-5 h-5 text-amber-400" />,
  //   items: ["Scalability", "Maintainability", "Performance", "DX"],
  //   description:
  //     "I prioritize clean architecture, sustainable systems, and developer experience when building applications.",
  //   badge: "Core Philosophy",
  //   gridConfig: "md:col-span-7 min-h-[220px]",
  // },

  // // NEW CARD 2
  // {
  //   category: "Currently Exploring",
  //   icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
  //   items: ["AI Workflows", "System Design", "Web Security", "Microservices"],
  //   description:
  //     "Continuously learning advanced engineering concepts and modern distributed application patterns.",
  //   badge: "Growth Mindset",
  //   gridConfig: "md:col-span-5 min-h-[200px]",
  // },

  // // NEW CARD 3
  // {
  //   category: "Tooling & Workflow",
  //   icon: <Cpu className="w-5 h-5 text-fuchsia-400" />,
  //   items: ["VSCode", "Postman", "GitHub", "Prisma Studio"],
  //   description:
  //     "Efficient tooling and streamlined workflows help maintain productivity and code quality.",
  //   badge: "Developer Toolkit",
  //   gridConfig: "md:col-span-5 min-h-[200px]",
  // },

  // // NEW CARD 4
  // {
  //   category: "Full Stack Focus",
  //   icon: <Globe className="w-5 h-5 text-blue-400" />,
  //   items: ["APIs", "Auth", "CMS", "Responsive UX"],
  //   description:
  //     "Bridging frontend experiences with robust backend systems to create cohesive applications.",
  //   badge: "End-to-End Systems",
  //   gridConfig: "md:col-span-7 min-h-[220px]",
  // },
];

export default function Skills() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-1">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Technical Stack
        </h2>

        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-slate-900 to-slate-400 dark:from-white dark:to-slate-600 mb-6" />

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          A collection of different technologies, workflows, tools and engineering principles I
          utilize to design, maintain and optimize scalable modern Web Applications and API's.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {skillData.map((skill, index) => (
          <SkillCard
            key={skill.category}
            skill={skill}
            index={index}
            className={skill.gridConfig}
          />
        ))}
      </div>
    </section>
  );
}