"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { getRelativeTime } from "@/lib/helper/date-format.helper";

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

type Props = {
    title: string;
    description: string;
    stack?: string[];
    topics?: string[];
    stars?: number;
    forks?: number;
    language?: string | null;
    last_update?: string;
    link?: string;
    issues?: boolean;
    showArchitectureLink: boolean;
    showRepositoryLink: boolean;
    techColors: Record<string, string>;
};

export default function SystemCard({
    title,
    description,
    stack,
    topics,
    language,
    stars,
    forks,
    last_update,
    link,
    issues,
    showArchitectureLink = true,
    showRepositoryLink = true,
    techColors,
}: Props) {
    return (
        <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold">{title}</h3>

            <p className="mt-2 text-sm text-gray-500">{description}</p>

            <motion.div
                className="mt-4 flex flex-wrap gap-2 overflow-auto max-h-16"
                variants={container}
            >
                {stack?.map((tech) => (
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
                {topics?.map((topic) => (
                    <motion.span
                        key={topic}
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    >
                        {topic}
                    </motion.span>
                ))}
            </motion.div>
            {showArchitectureLink && link &&(
                <Link href={link} className="inline-block mt-4 underline" target="_black">
                    Read Architecture
                </Link>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {language && (
                    <span className="font-medium">{language}</span>
                )}
                {stars !== undefined && (
                    <span>⭐ {stars}</span>
                )}
                {forks !== undefined && (
                    <span>🍴 {forks}</span>
                )}
                {last_update && ( 
                    <span> Updated {getRelativeTime(last_update)} </span> 
                )}
                
            </div>
            {showRepositoryLink && link && (
                <Link
                    href={link}
                    target="_blank"
                    className="inline-block mt-4 text-sm font-medium underline"
                >
                    View Repository
                </Link>
            )}
        </div>
    );
}