"use client"

import { motion } from "framer-motion"

const experiments = [
  {
    title: "Dev Tools Platform",
    desc: "Planning a collection of tools for developers.",
  },
  {
    title: "UI Component Experiments",
    desc: "Testing animations, layouts, and interaction patterns.",
  },
  {
    title: "API Playground",
    desc: "Exploring scalable API patterns and structures.",
  },
]

export default function Lab() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-1">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Experimental Lab</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {experiments.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl border bg-cream-200 dark:bg-cream-dark hover:border-primary/40"
          >
            <h3 className="font-semibold mb-2 text-primary dark:text-gray-900">{exp.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}