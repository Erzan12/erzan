"use client";

import { useMemo } from "react";
import { Quote } from "lucide-react";
import { routeThemes } from "@/lib/constants/themes";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Frontend Engineer",
    content: "The system design insights on erzan.dev are top-notch. The clear visualizations helped me grasp complex architectural patterns in minutes.",
    avatar: "https://i.pravatar.cc/150?u=alex",
    size: "wide" // Bento effect: some cards are wider
  },
  {
    name: "Sarah Chen",
    role: "Fullstack Developer",
    content: "I love the clean aesthetic of this portfolio. Thoughtful UX and attention to detail.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    size: "normal"
  },
  {
    name: "Marcus Thorne",
    role: "Tech Lead",
    content: "The blog posts are consistently high-quality. Erzan has a way of explaining technical concepts that just clicks.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    size: "wide"
  },
  {
    name: "Elena Rodriguez",
    role: "Product Designer",
    content: "The seamless transitions are addictive. This is how modern web apps should feel.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    size: "normal"
  },
];

function TestimonialCard({ t }: { t: any }) {
  return (
    <div className={`
      relative p-6 my-3 rounded-3xl bg-white/50 dark:bg-slate-900/40 
      border border-slate-500/10 backdrop-blur-md flex flex-col justify-between
      ${t.size === 'wide' ? 'w-[450px]' : 'w-[320px]'}
    `}>
      {/* Quote Icon Decoration */}
      <Quote className="absolute top-4 right-6 text-slate-500/10 w-12 h-12 -z-10" />
      
      <div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          "{t.content}"
        </p>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all"
        />
        <div>
          <h4 className="font-medium text-sm text-slate-900 dark:text-white leading-tight">
            {t.name}
          </h4>
          <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const theme = routeThemes["default"] || "bg-slate-500/10 text-slate-600";
  
  // Create three rows for a "fuller" bento look
  const row1 = useMemo(() => [...testimonials, ...testimonials], []);
  const row2 = useMemo(() => [...testimonials].reverse().concat([...testimonials].reverse()), []);

  return (
    <section className={`py-24 overflow-hidden mx-auto max-w-6xl mb-10`}>
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Testimonies
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Kind words from colleagues and readers about my work and contributions.
          </p>
        </div>

      {/* 🔥 SUPABASE-STYLE MASKED AREA */}
        <div className="relative w-full overflow-hidden 
            /* This mask makes the content itself transparent at the edges */
            /* No 'before:' element needed, so it matches your bg-slate-500/10 perfectly */
            [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
            <div className="flex flex-col gap-2">
                {/* Row 1 */}
                <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] cursor-pointer">
                    {row1.map((t, i) => (
                        <TestimonialCard key={`r1-${i}`} t={t} />
                    ))}
                </div>

                {/* Row 2 */}
                <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused] cursor-pointer">
                    {row2.map((t, i) => (
                        <TestimonialCard key={`r2-${i}`} t={t} />
                    ))}
                </div>
            </div>
        </div>
      {/* </div> */}
    </section>
  );
}