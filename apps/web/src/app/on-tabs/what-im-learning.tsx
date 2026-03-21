"use client"

import { motion } from "framer-motion";
import { 
    Check, 
    Server, 
    Gauge, 
    Rocket, 
    GitBranch, 
    Network, 
    Wrench 
} from "lucide-react";

const learnings = [
  { id: 1, label: "Backend architecture with NestJS", icon: Server, status: "ongoing" },
  { id: 2, label: "Performance optimization techniques", icon: Gauge, status: "ongoing" },
  { id: 3, label: "NextJS framework", icon: Rocket, status: "ongoing" },
  { id: 4, label: "CI/CD workflows", icon: GitBranch, status: "ongoing" },
  { id: 5, label: "Advanced system design", icon: Network, status: "onhold" },
  { id: 6, label: "Building developer tools", icon: Wrench, status: "onhold" }
];

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

export default function LearningTab() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <p className="text-xl text-gray-400 font-sans mb-8 leading-relaxed">
        Currently leveling up these skills ⚡
      </p>

      {/* large card container */}
      <div className="bg-gray-900/40 border border-white/10 hover:border-primary/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        <ul className="divide-y divide-white/5">
          {learnings.map((item) => {
            const Icon = item.icon;
            const isOngoing = item.status === "ongoing";

            return (
              <motion.li
                key={item.id}
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                className="flex items-center gap-4 p-5 group transition-all"
              >
                 {/* animated checkbox */}
                <div className="relative flex items-center justify-center">
                   <div className={`w-6 h-6 rounded-lg border-2 transition-all 
                    ${isOngoing ? "border-primary bg-primary/10" : "border-gray-700"}`} 
                   />
                   {isOngoing && (
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
                <div className={`p-2 rounded-lg ${isOngoing ? "bg-gray-800 text-white" : "text-gray-600"}`}>
                  <Icon size={20} />
                </div>

                {/* label */}
                <span className={`text-lg font-medium tracking-tight transition-colors
                  ${isOngoing ? "text-gray-100" : "text-gray-500"}`}>
                  {item.label}
                </span>

                {/* status badge */}
                <div className="ml-auto">
                  {isOngoing ? (
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
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}