"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./project-card";
import { Project } from "@/lib/types/project";

type Props = {
  projects: Project[];
  repos: any;
};

export default function ProjectsCoverflowCarousel({ projects, repos }: Props) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(360); // default desktop

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length); // auto-next
    }, 5000); // 5000ms = 5 seconds per card

    return () => clearInterval(interval); // cleanup on unmount
  }, [projects.length]);

  //update card width on client only
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) setCardWidth(280);      // mobile
      else if (window.innerWidth < 1024) setCardWidth(320); // tablet
      else setCardWidth(360);                               // desktop
    };

    updateWidth(); // initial
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const SPACING = cardWidth + 80; // spacing between cards
  const SCALE_SIDE = 0.75;
  const ROTATION = 25;

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  const getPosition = (i: number) => {
    let diff = i - index;
    if (diff > 1) diff = diff - projects.length;
    if (diff < -1) diff = diff + projects.length;

    if (diff === 0) return { x: 0, scale: 1, opacity: 1, rotateY: 0, zIndex: 10 };
    if (diff === 1) return { x: SPACING, scale: SCALE_SIDE, opacity: 0.7, rotateY: -ROTATION, zIndex: 5 };
    if (diff === -1) return { x: -SPACING, scale: SCALE_SIDE, opacity: 0.7, rotateY: ROTATION, zIndex: 5 };

    return { x: diff * SPACING, scale: 0.6, opacity: 0, rotateY: 0, zIndex: 0 };
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
      <div className="relative w-full h-[440px] flex items-center justify-center perspective-[1200px] overflow-visible md:overflow-hidden">
        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronRight size={28} />
        </button>

        {/* Cards */}
        <div className="relative w-full flex justify-center items-center">
          {projects.map((project, i) => {
            const pos = getPosition(i);
            return (
              <motion.div
                key={project.title}
                animate={pos}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute h-[420px] origin-center md:mx-2"
                style={{ width: cardWidth, zIndex: pos.zIndex, perspective: 1200 }}
              >
                <ProjectCard {...project} repos={repos} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}