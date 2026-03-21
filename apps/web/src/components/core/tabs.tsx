"use client"

import CookingTab from "@/app/on-tabs/what-im-cooking";
import IntoTab from "@/app/on-tabs/what-im-into";
import LearningTab from "@/app/on-tabs/what-im-learning";
import { div } from "framer-motion/client";
import { BookIcon, Flame, Sparkles } from "lucide-react"
import { useState } from "react"

const tabs = [
    {
        id: "cooking",
        label: "What I'm Cooking",
        icon: Flame
    },
    {
        id: "learning",
        label: "What I'm Learning",
        icon: BookIcon
    },
    {
        id: "into",
        label: "What I'm Into",
        icon: Sparkles
    }
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("cooking");

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Tab headers */}
            <div className="flex gap-2 border-b border-gray-700">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm transition-all
                                ${isActive
                                    ? "border-b-2 border-white text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "cooking" && <CookingTab />}
                {activeTab === "learning" && <LearningTab />}
                {activeTab === "into" && <IntoTab />}
            </div>
        </div>
    );
}