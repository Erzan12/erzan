"use client";

import Link from "next/link";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function SystemDesign() {

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
                System Design
            </h1>
            
            <p className="text-gray-500 mb-12">
                This section highlights architectural thinking behind the systems
                I design and build. It includes backend architecture, authentication
                systems, and platform infrastructure.
            </p>

            <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {systems.map((system) => (
                    <div
                        key={system.title}
                        className="border rounded-lg p-6"
                    >
                        <h3 className="text-xl font-semibold">
                            {system.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {system.description}
                        </p>

                        <motion.div
                            className="mt-4 flex flex-wrap gap-2 overflow-auto max-h-16"
                            variants={container}
                        >
                            {system.stack?.map((tech) => (
                                <motion.span
                                key={tech}
                                variants={item}
                                whileHover={{ scale: 1.05 }}
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    techColors[tech] ||
                                    "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                                }`}
                                >
                                {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.div
                            className="mt-4 flex flex-wrap gap-2 overflow-auto max-h-16"
                            variants={container}
                        >
                            {system.topics?.map((tech) => (
                                <motion.span
                                key={tech}
                                variants={item}
                                whileHover={{ scale: 1.05 }}
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    techColors[tech] ||
                                    "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                                }`}
                                >
                                {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        <Link
                            href={system.link}
                            className="inline-block mt-4 underline"
                            target="_blank"
                        >
                            Read Architecture
                        </Link>
                    </div>
                ))}
            </motion.div>
        </main>
    )
}