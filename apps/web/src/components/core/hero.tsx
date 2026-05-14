"use client"

import { motion, Variants } from "framer-motion";
import HeroButton from "../ui/hero-button/hero-button";
import { Cpu, GitBranch, Hammer, Wrench, Rocket, Server, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

type HeroProps = {
  token?: string;
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function Hero({ token }: HeroProps) {
  const fullText = "Hi I'm Earl Jan Do! [Erzan] I'm a FullStack Developer, Welcome!";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    if (phase === 'typing') {
      const timeout = setTimeout(() => {
        const next = fullText.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === fullText) setPhase('pausing');
      }, 100);
      return () => clearTimeout(timeout);
    }

    if (phase === 'pausing') {
      const timeout = setTimeout(() => setPhase('deleting'), 8000);
      return () => clearTimeout(timeout);
    }

    if (phase === 'deleting') {
      const timeout = setTimeout(() => {
        if (displayText.length === 1) {
          setDisplayText("");
          setPhase('typing');
        } else {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [displayText, phase]);

  //colorize parts of the typed text
  const renderBadgeText = () => {
    const text = displayText;

    //segments with their highlight rules
    const segments: { text: string; className: string }[] = [];

    //simple range-based coloring by matching substrings
    const nameMatch = "Earl Jan Do!";
    const tagMatch = "[Erzan]";
    const roleMatch = "Fullstack Developer";

    let cursor = 0;

    const fullSegments = [
      { value: "Hi I'm ", type: "muted" },
      { value: nameMatch, type: "name" },
      { value: " ", type: "muted" },
      { value: tagMatch, type: "tag" },
      { value: " I'm a ", type: "muted" },
      { value: roleMatch, type: "role" },
      { value: ", Welcome!", type: "muted" },
    ];

    for (const seg of fullSegments) {
      if (cursor >= text.length) break;
      const available = text.length - cursor;
      const chunk = seg.value.slice(0, available);
      segments.push({ text: chunk, className: seg.type });
      cursor += chunk.length;
    }

    return segments;
  };

  const colorMap: Record<string, string> = {
    muted: "text-emerald-300/70",
    name: "text-white font-semibold",
    tag: "text-amber-400 font-mono",
    role: "text-emerald-400 font-semibold",
  };

  const hasScrolled = useRef(false);

  useEffect(() => {
    if (!token) return;
    if (hasScrolled.current) return;

    const id = setTimeout(() => {
      const el = document.getElementById("testimonials");
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "start" });

      hasScrolled.current = true;
    }, 800);

    return () => clearTimeout(id);
  }, [token]);

  console.log("Hero token:", token);

  return (
    <main>
      <div className="pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* introduction hero card */}
            <motion.div variants={item} className="md:col-span-3">
              <Card className="p-8 md:p-12 bg-olive-about-card/70 dark:bg-olive-dark-about-card border-border rounded-3xl relative overflow-hidden shadow-none">
                {/* background icons */}
                <div className="absolute top-[5%] right-[10%] opacity-10">
                  <GitBranch className="w-16 h-16 md:w-[110px] md:h-[110px] text-primary rotate-[18deg]" />
                </div>
                <div className="absolute top-[30%] left-[9%] opacity-10">
                  <Wrench size={90} className="text-primary -rotate-[95deg]" />
                </div>
                <div className="absolute bottom-[35%] left-[60%] opacity-10">
                  <Hammer className="w-14 h-14 md:w-[80px] md:h-[80px] text-primary rotate-[160deg]" />
                </div>
                <div className="absolute top-[60%] right-[15%] opacity-10">
                  <Cpu className="w-20 h-20 md:w-[120px] md:h-[120px] text-primary -rotate-[8deg]" />
                </div>
                <div className="absolute bottom-[10%] left-[25%] opacity-10">
                  <Rocket size={80} className="text-primary -rotate-[8deg]" />
                </div>
                <div className="absolute top-[6%] left-[30%] opacity-10">
                  <Server className="w-12 h-12 md:w-[80px] md:h-[80px] text-primary -rotate-[8deg]" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">

                  {/* change max-w-lg to max-w-full or max-w-2xl -> for increase lenght of terminal*/}
                  <div className="mb-6 w-full max-w-2xl"> 
                    
                    {/* terminal chrome bar */}
                    <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-t-lg px-3 py-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="ml-4 text-zinc-500 text-[10px] md:text-xs font-mono flex items-center gap-1 truncate">
                        <Terminal size={10} />
                        erzan@Projects\portfolio-v2\apps\web ~ 
                      </span>
                    </div>

                    {/* terminal body */}
                    <div className="bg-zinc-950 border border-t-0 border-zinc-700 rounded-b-lg px-5 py-6 text-left font-mono text-sm overflow-hidden">
                      {/* prompt line */}
                      <div className="flex items-start gap-2 relative">
                        <span className="text-emerald-500 shrink-0">❯</span>

                        {/* <div className="flex flex-wrap items-center"> */}
                        <div className="relative w-full">
                          <div className="opacity-0 select-none pointer-events-none break-words whitespace-pre-wrap">
                            <span className="text-sky-400 mr-2">echo</span>
                            &quot;{fullText}&quot;
                          </div>

                          <div className="absolute top-0 left-0 w-full flex flex-wrap items-center">
                            <span className="text-sky-400 mr-2">echo</span>
                            <span className="text-zinc-400">&quot;</span>
                            
                            {/* using break-all or whitespace-pre-wrap that ensures text stays inside */}
                            <span className="text-zinc-100 break-words">
                              {renderBadgeText().map((seg, i) => (
                                <span key={i} className={colorMap[seg.className]}>
                                  {seg.text}
                                </span>
                              ))}
                            </span>

                            {/* blinking cursor */}
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                              className="inline-block w-[7px] h-[14px] bg-emerald-400 ml-1 translate-y-[2px]"
                            />
                            <span className="text-zinc-400">&quot;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                            
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-black dark:text-white">I build scalable backend </span>
                    <span className="text-primary">systems</span>
                    <span className="text-black dark:text-white"> &amp; modern </span>
                    <span className="text-primary">web platforms</span>
                  </h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    Full-stack developer specializing in ERP systems, APIs, and developer platforms —
                    focused on performance, clean architecture, and real-world scalability.
                  </motion.p>

                  <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <HeroButton href="/projects" variant="primary">
                      View Projects
                    </HeroButton>
                    <HeroButton
                      href="https://erzan-docs.vercel.app/docs/architecture"
                      variant="secondary"
                      external
                    >
                      Engineering Docs
                    </HeroButton>
                  </div>
                </div>
              </Card>
            </motion.div>
            {token && (
              <button
                onClick={() =>
                  document.getElementById("testimonials")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                          rounded-full bg-emerald-500/10 border border-emerald-400/30
                          px-5 py-3 text-sm text-emerald-300 backdrop-blur-md"
              >
                ↓ Leave Your Testimonial
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
