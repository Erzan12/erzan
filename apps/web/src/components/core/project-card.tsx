"use client";

import { Github } from "lucide-react";
import { useGithubStars } from "../hooks/github-stars";

type Props = {
  title: string;
  description: string;
  stack: string[];
  github: string;
};

export default function ProjectCard({ title, description, stack, github }: Props) {
    const techColors: Record<string, string> = {
        NestJS: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
        Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
        PostgreSQL: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
        NextJS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
        Tailwind: "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
        Docusaurus: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
        Laravel: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
        CodeIgniter: "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50",
        PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
    };

    const stars = useGithubStars(github); 

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-300">
        
        {/* Project Title */}
        <h3 className="text-xl font-semibold text-black dark:text-white relative after:block after:h-0.5 after:w-0 after:bg-gradient-to-r 
            after:from-blue-400 after:to-purple-500 after:absolute after:-bottom-1 after:left-0 after:transition-all hover:after:w-full">
            {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
        </p>

        {/* Stack badges */}
        <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((tech) => (
            <span
                key={tech}
                className={`text-xs font-medium px-2 py-1 rounded-full ${techColors[tech] || "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
            >
                {tech}
            </span>
            ))}
        </div>

        {/* GitHub link */}
        <a
            // href={github}
            href={`https://github.com/${github}`}
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
            <Github size={16} />
            View Repository
            {stars !== null && <span className="ml-1 text-gray-600 dark:text-gray-300">⭐ {stars}</span>}
        </a>
        </div>
    );
}