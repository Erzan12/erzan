"use client"

import { motion } from "framer-motion"

const points = [
  {
    title: "Scalability First",
    desc: "I design systems that can grow, not just work for today.",
  },
  {
    title: "Clean Architecture",
    desc: "Maintainability and structure matter more than quick hacks.",
  },
  {
    title: "Performance Mindset",
    desc: "I constantly look for optimizations and efficiency improvements.",
  },
  {
    title: "Depth Over Trends",
    desc: "I focus on mastering tools instead of chasing every new tech.",
  },
]

export default function HowIThink() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-1">
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4 tracking-tight font-sans">How I Think</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {points.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl border bg-card"
          >
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}