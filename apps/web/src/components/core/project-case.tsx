"use client"

import { motion } from "framer-motion"

export default function CaseStudy() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-1">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Case Study</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>
      
      <div className="space-y-8">
        {/* Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-xl border bg-cream-200 dark:bg-cream-dark hover:border-primary/40"
        >
          <h3 className="text-xl text-primary dark:text-gray-900 font-semibold mb-4">
            SLSU Clinic Appointment System
          </h3>

          <div className="space-y-4 text-sm text-gray-500 dark:text-gray-300">
            <p>
              <span className="font-semibold text-black dark:text-gray-900">Problem:</span>{" "}
              Manual appointment handling caused long queues and inefficient
              scheduling.
            </p>

            <p>
              <span className="font-semibold text-black dark:text-gray-900">Solution:</span>{" "}
              Built a web-based system using Laravel + MySQL to digitize
              booking and streamline clinic operations.
            </p>

            <p>
              <span className="font-semibold text-black dark:text-gray-900">Challenges:</span>{" "}
              Handling concurrent bookings and ensuring data consistency.
            </p>

            <p>
              <span className="font-semibold text-black dark:text-gray-900">Outcome:</span>{" "}
              Reduced manual workload and improved scheduling efficiency.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}