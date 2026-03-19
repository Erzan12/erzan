"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { useGithubRepos } from "@/hooks/useGithubRepos";

type Props = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  repo: string;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectCard({ title, description, stack, repo, github }: Props) {
  const { repos } = useGithubRepos();

  const currentRepo = repos?.find((r) => r.name === repo);

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

  return (
    <motion.div
      className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-300
             w-full h-[420px] flex flex-col justify-between overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Title */}
      <h3 className="text-xl font-semibold text-black dark:text-white relative after:block after:h-0.5 after:w-0 after:bg-gradient-to-r 
          after:from-blue-400 after:to-purple-500 after:absolute after:-bottom-1 after:left-0 after:transition-all hover:after:w-full">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed overflow-hidden line-clamp-5">
        {description}
      </p>

      {/* Tech Stack */}
      <motion.div
        className="mt-4 flex flex-wrap gap-2 overflow-auto max-h-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {stack.map((tech) => (
          <motion.span
            key={tech}
            variants={item}
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              techColors[tech] ||
              "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* GitHub link */}
      <a
        href={`https://github.com/${github}`}
        target="_blank"
        className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <Github size={16} />
        View Repository
        {/* {repos && repos[repo] && (
          <>
            <span>⭐ {repos[repo].stars}</span>
            <span>🍴 {repos[repo].forks}</span>
          </>
        )} */}
        {currentRepo && (
          <>
            <span>⭐ {currentRepo.stars}</span>
            <span>🍴 {currentRepo.forks}</span>
          </>
        )}
      </a>
    </motion.div>
  );
}