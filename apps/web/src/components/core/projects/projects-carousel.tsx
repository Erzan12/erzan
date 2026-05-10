"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { Project } from "@/lib/types/project";
import Image from "next/image";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      {/* Section Header - Matching "How I Think" style */}
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-slate-900 to-slate-400 dark:from-white dark:to-slate-600 mb-6" />
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          A collection of my works, personal projects, and freelanced projects where I apply and prioritize scalable architectures, clean and readable codes, 
          sustainable systems, and developer experience when building applications.
        </p>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4">
          {projects.map((project, index) => (
            <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className="
                    group relative overflow-hidden h-[540px] flex flex-col
                    rounded-[2rem] border border-slate-500/10
                    bg-white/50 dark:bg-slate-900/40 backdrop-blur-md
                    transition-all duration-500 hover:y-[-8px]
                    hover:border-slate-400/20
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                    dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                  "
                >
                  {/* Ambient Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-slate-400/10 blur-3xl" />
                  </div>

                  <CardHeader className="p-0">
                    <div className="relative w-full h-52 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 h-full">
                          <span className="text-sm font-medium">No Preview Available</span>
                        </div>
                      )}
                      {/* Overlay gradient for image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-900/20 to-transparent" />
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 flex-1 flex flex-col">
                    <CardTitle className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      {project.title}
                    </CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="rounded-full bg-slate-900/5 dark:bg-white/5 border-slate-500/10 text-slate-700 dark:text-slate-300 text-[10px] px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-8 pt-0 flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 rounded-2xl gap-2 border-slate-500/20 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300" 
                      asChild
                    >
                      <a href={`https://github.com/${project.github}`} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    </Button>
                    
                    {project.demoLink ? (
                      <Button 
                        size="sm" 
                        className="flex-1 rounded-2xl gap-2 bg-slate-900 dark:bg-white dark:hover:bg-slate-500/50 text-white dark:text-slate-900 dark:hover:text-white hover:bg-slate-500/70 hover:opacity-90 transition-all" 
                        asChild
                      >
                        <a href={project.demoLink} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4" /> Demo
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="flex-1 rounded-2xl gap-2 opacity-40 cursor-not-allowed" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-8 mt-12">
          {/* Progress Indicators */}
          <div className="flex gap-3">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500 bg-slate-200 dark:bg-slate-800"
                style={{ width: current === i + 1 ? "48px" : "12px" }}
              >
                {current === i + 1 && (
                  // <motion.div 
                  //   layoutId="activeProgress"
                  //   className="absolute inset-0 bg-slate-900 dark:bg-white"
                  //   initial={false}
                  // />
                  <div 
                    className="absolute inset-0 bg-slate-900 dark:bg-white"
                    style={{
                      animation: `progress-loop 4000ms linear forwards`
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-12 h-12 border-slate-500/20 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm hover:scale-110 transition-all" 
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-12 h-12 border-slate-500/20 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm hover:scale-110 transition-all" 
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </Button>
          </div>
        </div>
      </Carousel>
      <style jsx global>{`
        @keyframes progress-loop {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}