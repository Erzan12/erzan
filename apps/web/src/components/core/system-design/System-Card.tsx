"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

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
    last_update?: string;
    link?: string;
    showArchitectureLink: boolean;
    techColors: Record<string, string>;
};

export default function SystemCard({
    title,
    description,
    stack,
    topics,
    last_update,
    link,
    showArchitectureLink = true,
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
        </div>
    );
}