"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, ShieldCheck, Box } from "lucide-react";
import SystemCard from "@/components/core/system-design/system-card";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { SystemCardSkeleton } from "@/components/core/system-design/system-card-skeleton";

export default function SystemDesign() {
    const { repos, loading } = useGithubRepos();

    const techColors: Record<string, string> = {
        React: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
        NextJS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
        NestJS: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
        Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
        PostgreSQL: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
        Docker: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
        Docusaurus: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
        Tailwind: "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
        PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
        Laravel: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
        CodeIgniter: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
    };
  const systems = [
    {
      title: "ERP Backend Architecture",
      description:
        "Deep dive into the architecture behind a scalable ERP backend. Includes database normalization, role-based access control (RBAC), and modular service design for enterprise resource planning.",
      stack: ["NestJS", "PostgreSQL", "Prisma", "JWT"],
      topics: ["RBAC", "REST APIs", "Modular"],
      link: "https://erzan-docs.vercel.app/docs/Case-studies/erp-backend-api",
      icon: <Database className="w-6 h-6 text-primary" />,
    },
    {
      title: "Authentication System",
      description:
        "A robust authentication flow utilizing JWT, refresh tokens, and a granular permission model. Designed to handle secure session management across multiple microservices.",
      stack: ["JWT", "NodeJS", "Redis"],
      topics: ["Security", "OAuth2", "Sessions"],
      link: "https://erzan-docs.vercel.app/docs/Case-studies/auth-flow",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "Portfolio Monorepo Design",
      description:
        "The architectural layout of a monorepo platform. Leverages shared UI components and centralized documentation to power a developer-centric portfolio and technical blog.",
      stack: ["Next.js", "Turborepo", "Tailwind"],
      topics: ["Monorepo", "Architecture", "CI/CD"],
      link: "https://erzan-docs.vercel.app/docs/Case-studies/portfolio-platform",
      icon: <Box className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section matching your style */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-card-foreground font-sans tracking-tight">
            System Design
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl font-sans leading-relaxed">
            Architectural thinking behind the systems I design and build. This section explores 
            backend structures, authentication models, and platform infrastructure 
            with a focus on scalability and clean code.
          </p>
        </div>

        {/* Grid Layout matching About Page grid behavior */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading || !repos || repos.length === 0 ? (
            // 1. Loading State: Show 6 Skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <SystemCardSkeleton key={`project-skeleton-${i}`} />
            ))
          ) : (
            systems.map((system) => (
              <SystemCard
                  key={system.title}
                  title={system.title}
                  description={system.description}
                  stack={system.stack}
                  link={system.link}
                  icon={system.icon} // Pass the lucide icon here
                  techColors={techColors}
                  showArchitectureLink={true}
                  showRepositoryLink={false}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}