"use client";

import { useMemo } from "react";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  items: any[];
}

function TestimonialCard({ t }: { t: any }) {
  // Determine size dynamically: content > 100 chars gets 'wide'
  const size = t.content.length > 100 ? 'wide' : 'normal';

  const widths = ['w-[280px]', 'w-[320px]', 'w-[360px]', 'w-[420px]'];


  const randomWidth =
    widths[t.name.charCodeAt(0) % widths.length];

  return (
    // <div className={`
    //   relative p-6 my-3 rounded-3xl bg-white/50 dark:bg-slate-900/40 
    //   border border-slate-500/10 backdrop-blur-md flex flex-col justify-between
    //   ${size === 'wide' ? 'w-[450px]' : 'w-[320px]'}
    // `}>
    <div className={`
      relative p-6 my-3 rounded-3xl
      bg-white/50 dark:bg-slate-900/40
      border border-slate-500/10
      backdrop-blur-md
      flex flex-col justify-between
      ${randomWidth}
    `}>
      <Quote className="absolute top-4 right-6 text-slate-500/10 w-12 h-12 -z-10" />
      <div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-sm">
          "{t.content}"
        </p>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={t.user?.image || "/images/person.png"}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover grayscale-[0.5]"
        />
        <div>
          <h4 className="font-medium text-sm text-slate-900 dark:text-white">{t.name}</h4>
          <p className="text-[11px] uppercase tracking-wider text-slate-500">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ items }: TestimonialsProps) {


  // Split items into two rows for the marquee
  // const row1 = useMemo(() => items.slice(0, Math.ceil(items.length / 2)), [items]);
  // const row2 = useMemo(() => items.slice(Math.ceil(items.length / 2)), [items]);
  const row1 = items.filter((_, i) => i % 2 === 0);
  const row2 = items.filter((_, i) => i % 2 !== 0);

  const shouldAnimate = items.length > 4;

  const displayRow1 = shouldAnimate ? [...row1, ...row1] : row1;
  const displayRow2 = shouldAnimate ? [...row2, ...row2] : row2;

  // if (items.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden mx-auto max-w-6xl mb-10">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Testimonies
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Kind words from colleagues, coworkers, clients and readers about my work and contributions.
        </p>
      </div>

      <div className="relative w-full overflow-hidden 
            /* This mask makes the content itself transparent at the edges */
            /* No 'before:' element needed, so it matches your bg-slate-500/10 perfectly */
            [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
        <div className="flex flex-col gap-6 min-h-[520px] justify-center">
          {/* Row 1: Left to Right */}
          {/* <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] cursor-pointer"> */}
          <div
            className={`
              flex gap-6
              ${shouldAnimate
                ? "w-max animate-marquee"
                : "flex-wrap justify-center"}
            `}
          >
            {displayRow1.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>

          {/* Row 2: Right to Left */}
          {/* <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused] cursor-pointer"> */}
          <div
            className={`
              flex gap-6
              ${shouldAnimate
                ? "w-max animate-marquee-reverse"
                : "flex-wrap justify-center"}
            `}
          >
            {displayRow2.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}