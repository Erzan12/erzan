"use client"

import { motion } from "framer-motion";
import { Check, Music, Dumbbell, Moon, BookOpen, Gamepad } from "lucide-react";

const items = [
    { id: 1, text: " Music while coding (casual listening)", icon: Music, status: "hobby"},
    { id: 2, text: " Late night building sessions", icon: Moon, status: "onbreak"},
    { id: 3, text: " Reading Books / Open Source / Browsing internet ", icon: BookOpen, status: "hobby"},
    { id: 4, text: " Gym ", icon: Dumbbell, status: "hobby"},
    { id: 5, text: " Casual gaming / chill breaks ", icon: Gamepad, status: "onbreak"}
]

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

export default function IntoTab() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <p className="text-xl text-gray-400 font-sans mb-8 leading-relaxed">
        Random things I’m into lately 👀
      </p>

      {/* large card container */}
      <div className="bg-gray-900/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="divide-y divide-white/5">
            {items.map((item) => {
                const Icon = item.icon;
                const isHobby = item.status === "hobby";

                return (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                        className="flex items-center gap-4 p-5 group transition-all"
                    >
                        {/* animated checkbox */}
                        <div className="relative flex items-center justify-center">
                            <div className={`w-6 h-6 rounded-lg border-2 transitioin-all
                                ${isHobby ? "border-primary bg-primary/10" : "border-gray-700"}`}
                            />
                            {item.status === 'hobby' && (
                                <motion.div
                                    initial= {{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute text-primary"
                                >
                                    <Check size={14} strokeWidth={4} />
                                </motion.div>
                            )}
                        </div>

                        {/* tech icon */}
                        <div className={`p-2 rounded-lg ${isHobby ? "bg-gray-800 text-white" : "text-gray-600"}`}>
                            <Icon size={20} />
                        </div>

                        {/* text content */}
                        <span className={`text-lg font-medium tracking-tight transition-colors
                            ${isHobby ? "text-gray-100" : "text-gray-500"}`}>
                            {item.text}
                        </span>

                        {/* status badge */}
                        <div className="ml-auto">
                            {isHobby ? (
                                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    Active
                                </span>
                            ) : (
                                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full border border-white/5">
                                    On break
                                </span>
                            )}
                        </div>
                    </motion.div>
                )
            })}   
        </div>
      </div>
    </motion.div>
  );
}