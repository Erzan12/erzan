"use client"

import { motion } from "framer-motion";
import { Check, LayoutDashboard, Lightbulb, Bell, Cpu, Book } from "lucide-react";

const items = [
  { id: 1, text: "Portfolio revamp (this one)", icon: LayoutDashboard, status: "cooking" },
  { id: 2, text: "Personal Docs on Docusaurus (already deployed)", icon: Book, status: "cooking" },
  { id: 3, text: "Blog Page section in development and will be self-Hosted CMS with Supabase and Drizzle ORM", icon: Bell, status: "cooking" },
  { id: 4, text: "Simple dev tools (experimenting)", icon: Cpu, status: "todo" },
  { id: 5, text: "Side project — Product Inventory System ERP", icon: Lightbulb, status: "cooking" },
  { id: 6, text: "Side project — Laravel Projects", icon: Lightbulb, status: "todo" },
];

//stagger container variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function CookingTab() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <p className="text-xl text-gray-400 font-sans mb-8 leading-relaxed">
        Stuff I’m currently building or messing around with 👇
      </p>

      {/* large card container */}
      <div className="bg-cream dark:bg-cream-dark border border-white/10 hover:border-primary/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        <ul className="divide-y divide-white/5 ">
          {items.map((item) => {
            const Icon = item.icon;
            const isCooking = item.status === "cooking";

            return (
              <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                  className="flex items-center gap-4 p-5 group transition-all"
              >
                  {/* animated checkbox */}
                  <div className="relative flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all 
                        ${isCooking ? "border-primary bg-primary/10" : "border-gray-700"}`}
                      />
                      {isCooking  && (
                          <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute text-primary"
                          >
                              <Check size={14} strokeWidth={4} />
                          </motion.div>
                      )}
                  </div>

                  {/* tech icon */}
                  <div className={`p-2 rounded-lg ${isCooking ? "bg-gray-800 text-white" : "text-gray-400"}`}>
                      <Icon size={20} />
                  </div>

                  {/* text content */}
                  <span className={`text-lg font-medium tracking-tight transition-colors
                      ${isCooking ? "text-gray-900 dark:text-white/90" : "text-gray-400"}`}>
                      {item.text}
                  </span>

                  {/* status badge */}
                  <div className="ml-auto">
                      {isCooking ? (
                          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              Ongoing
                          </span>
                      ) : (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full border border-white/5">
                              Queue
                          </span>
                      )}
                  </div>
              </motion.div>
            )
          })}
        </ul>
      </div>
    </motion.div>
  );
}