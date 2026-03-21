"use client"

import CookingTab from "@/app/on-tabs/what-im-cooking";
import IntoTab from "@/app/on-tabs/what-im-into";
import LearningTab from "@/app/on-tabs/what-im-learning";
import { motion } from "framer-motion";
import { BookOpen, Flame, Sparkles } from "lucide-react"
import { useState } from "react"

//burning flame animation
const AnimatedFlame = ({ isActive }: { isActive: boolean }) => (
  <motion.div
    animate={isActive ? {
      scale: [1, 1.2, 1.1, 1.25, 1],
      color: ["#ef4444", "#f97316", "#ef4444"], // Red to Orange flickering
      filter: ["drop-shadow(0 0 2px #ef4444)", "drop-shadow(0 0 8px #f97316)", "drop-shadow(0 0 2px #ef4444)"]
    } : { color: "#9ca3af" }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    <Flame size={22} fill={isActive ? "currentColor" : "none"} />
  </motion.div>
);

//opening book animation
const AnimatedBook = ({ isActive }: { isActive: boolean }) => (
  <motion.div
    animate={isActive ? {
      rotateY: [0, -20, 0],
      scale: [1, 1.1, 1]
    } : {}}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    style={{ transformOrigin: "left center" }}
  >
    <BookOpen size={22} className={isActive ? "text-primary" : "text-gray-400"} />
  </motion.div>
);

//twinkling sparkles animation
const AnimatedSparkles = ({ isActive }: { isActive: boolean }) => (
  <motion.div
    animate={isActive ? {
      scale: [1, 1.2, 0.9, 1.2, 1],
      opacity: [1, 0.7, 1],
      rotate: [0, 10, -10, 0]
    } : {}}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  >
    <Sparkles size={22} className={isActive ? "text-yellow-400" : "text-gray-400"} />
  </motion.div>
);

const tabs = [
    {
        id: "cooking",
        label: "What I'm Cooking",
        icon: AnimatedFlame
    },
    {
        id: "learning",
        label: "What I'm Learning",
        icon: AnimatedBook
    },
    {
        id: "into",
        label: "What I'm Into",
        icon: AnimatedSparkles
    }
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("cooking");

    return (
        <section className="py-20 max-w-6xl mx-auto px-1">
            {/* tab as header */}
            <div className="mt-16">
                <div className="flex flex-wrap gap-8 items-center">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon; // Renamed for clarity
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative flex flex-col items-start group"
                            >
                            <div
                                className={`flex items-center gap-3 text-2xl font-bold tracking-tight font-sans transition-all
                                ${isActive ? "scale-105 text-black" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                {/* Pass isActive to trigger the internal Framer Motion logic */}
                                <IconComponent isActive={isActive} />
                                {tab.label}
                            </div>

                            {/* Underline Logic remains the same */}
                            {isActive && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="h-1 w-20 bg-primary rounded-full mt-2"
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                />
                            )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "cooking" && <CookingTab />}
                {activeTab === "learning" && <LearningTab />}
                {activeTab === "into" && <IntoTab />}
            </div>
        </section>
    );
}