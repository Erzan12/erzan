"use client";

import { motion } from "framer-motion";
import { Brain, Layers3, Gauge, Sparkles } from "lucide-react";

const points = [
  {
    title: "Scalability First",
    desc: "I design systems that can grow, evolve, and remain maintainable long after the first deployment.",
    icon: Layers3,
  },
  {
    title: "Clean Architecture",
    desc: "Readable structure and long-term maintainability matter more than temporary shortcuts.",
    icon: Brain,
  },
  {
    title: "Performance Mindset",
    desc: "I constantly look for optimizations, efficient rendering, and better user experience.",
    icon: Gauge,
  },
  {
    title: "Depth Over Trends",
    desc: "I prefer mastering fundamentals and deeply understanding tools instead of chasing every trend.",
    icon: Sparkles,
  },
];

export default function HowIThink() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-1">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          How I Think
        </h2>

        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-slate-900 to-slate-400 dark:from-white dark:to-slate-600 mb-6" />

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          My approach to development focuses on thoughtful architecture,
          long-term scalability, and building experiences that remain
          maintainable as products evolve over time.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {points.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
              }}
              className="
                relative overflow-hidden rounded-[2rem]
                border border-slate-500/10
                bg-white/50 dark:bg-slate-900/40
                backdrop-blur-md
                p-8
                group
                transition-all duration-300
                hover:border-slate-400/20
                hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              "
            >
              {/* Background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-slate-400/10 blur-3xl" />
              </div>

              {/* Quote-style decorative icon */}
              <div className="absolute top-5 right-5 opacity-[0.03] group-hover:opacity-[0.05] transition">
                <Icon className="w-24 h-24 text-slate-900 dark:text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="
                  w-12 h-12 rounded-2xl
                  flex items-center justify-center
                  bg-slate-900/5 dark:bg-white/5
                  border border-slate-500/10
                  mb-6
                ">
                  <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}