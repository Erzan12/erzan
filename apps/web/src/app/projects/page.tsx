"use client";

import { motion } from "framer-motion";
import SystemCard from "@/components/core/system-design/System-Card";

export default function ProjectsPage() {

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
              "Architecture behind the ERP backend API including modules, database design, and role-based access control.",
          stack: ["NestJS", "PostgreSQL", "Prisma", "JWT"],
          topics: ["RBAC", "REST APIs", "Modular Architecture"],
          link: "/docs/Case-studies/erp-backend-api",
      },
      {
          title: "Authentication System",
          description:
              "JWT authentication flow and role-based permission model used in enterprise backend systems.",
          link: "http://localhost:3000/docs/Case-studies/erp-backend-api",
      },
      {
          title: "Portfolio Monorepo Architecture",
          description:
              "Design of the monorepo platform powering this portfolio and documentation system.",
          link: "http://localhost:3000/docs/Case-studies/portfolio-platform",
      },
  ];

  return (
    <main className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-8">
          Projects
        </h1>

        <p className="text-gray-500 mb-12">
          This section higglights all my development projects.
        </p>

        <motion.div className="grid md:grid-cols-2 gap-6">
          {systems.map((system) => (
            <SystemCard
              key={system.title}
              {...system}
              techColors={techColors}
            />
          ))}
        </motion.div>
    </main>
  );
}