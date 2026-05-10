"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  ClipboardList,
  Activity,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const caseStudy = {
  title: "SLSU Clinic Appointment System",
  subtitle:
    "A modernized clinic scheduling platform designed to reduce manual workflows and improve appointment management efficiency.",

  sections: [
    {
      label: "Problem",
      text: "Manual appointment handling caused long queues, inconsistent scheduling, and inefficient patient management.",
      icon: ClipboardList,
    },
    {
      label: "Solution",
      text: "Developed a centralized web-based appointment system using Laravel and MySQL to streamline clinic operations and automate booking workflows.",
      icon: ShieldCheck,
    },
    {
      label: "Challenges",
      text: "Managing concurrent bookings, preventing schedule conflicts, and maintaining reliable database consistency across requests.",
      icon: Activity,
    },
    {
      label: "Outcome",
      text: "Reduced administrative workload, improved scheduling efficiency, and delivered a smoother appointment experience for both staff and students.",
      icon: CheckCircle2,
    },
  ],
};

export default function CaseStudy() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-1">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Case Study
        </h2>

        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-slate-900 to-slate-400 dark:from-white dark:to-slate-600 mb-6" />

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          A closer look into how I approach real-world system design,
          problem-solving, and scalable application development.
        </p>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="
          relative overflow-hidden rounded-[2.5rem]
          border border-slate-500/10
          bg-white/50 dark:bg-slate-900/40
          backdrop-blur-md
          p-8 md:p-10
        "
      >
        {/* Ambient Glow */}
        <div className="absolute -top-20 right-0 w-72 h-72 bg-slate-400/10 blur-3xl rounded-full pointer-events-none" />

        {/* Top */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <div className="
              inline-flex items-center gap-2
              px-3 py-1 rounded-full
              border border-slate-500/10
              bg-slate-900/5 dark:bg-white/5
              text-xs tracking-wider uppercase
              text-slate-500
              mb-5
            ">
              Featured System Project
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {caseStudy.title}
            </h3>

            <p className="max-w-2xl leading-relaxed text-slate-500 dark:text-slate-400">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Floating CTA */}
          <div className="
            hidden md:flex
            w-14 h-14 rounded-2xl
            items-center justify-center
            border border-slate-500/10
            bg-white/40 dark:bg-white/[0.03]
            backdrop-blur-md
          ">
            <ArrowUpRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {caseStudy.sections.map((section, i) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.35,
                }}
                whileHover={{ y: -4 }}
                className="
                  group relative overflow-hidden
                  rounded-3xl
                  border border-slate-500/10
                  bg-slate-500/[0.03]
                  dark:bg-white/[0.02]
                  p-6
                  transition-all duration-300
                  hover:border-slate-400/20
                "
              >
                {/* Glow */}
                <div className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-500
                ">
                  <div className="absolute -top-12 right-0 w-32 h-32 rounded-full bg-slate-300/10 blur-2xl" />
                </div>

                <div className="relative z-10">
                  <div className="
                    w-12 h-12 rounded-2xl
                    flex items-center justify-center
                    bg-slate-900/5 dark:bg-white/5
                    border border-slate-500/10
                    mb-5
                  ">
                    <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </div>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {section.label}
                  </h4>

                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {section.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}