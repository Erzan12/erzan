"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowRightLeft } from "lucide-react";
import { Project } from "@/lib/types/project";
import Image from "next/image";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Initialize the Autoplay plugin
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
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
    <div className="w-full px-4 py-12">
      <Carousel
        setApi={setApi}
        // Attach the plugin here
        plugins={[plugin.current]} 
        // Manual Hover logic for pausing
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        opts={{ 
          align: "start", 
          loop: true 
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {projects.map((project, index) => (
            <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
               <Card className="h-[480px] flex flex-col bg-cream-100 dark:bg-cream-50/70 border-border rounded-2xl overflow-hidden shadow-none transition-all duration-300 hover:border-primary/50 group">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      /> 
                    ) : (
                      <div className="flex items-center justify-center bg-gray-200 text-foreground h-full text-center p-4">
                        {project.title}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 flex-1">
                  <CardTitle className="text-xl font-bold mb-2 text-primary font-sans">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-foreground dark:text-gray-900 line-clamp-4 font-sans leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="rounded-full text-[10px] font-sans px-2.5 py-0.5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full gap-2" asChild>
                    <a href={`https://github.com/${project.github}`} target="_blank" rel="noreferrer">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  </Button>
                  {project.demoLink ? (
                    <Button size="sm" className="flex-1 rounded-full gap-2" asChild>
                      <a href={project.demoLink} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="flex-1 rounded-full gap-2 cursor-not-allowed opacity-50" disabled>
                      <ExternalLink className="w-4 h-4" /> Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop Arrows (Floating on sides) */}
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </div>

        {/* Mobile Controls & Dots (Placed below content but INSIDE Carousel) */}
        <div className="flex flex-col items-center gap-6 mt-10">

          {/* REUSED PAGINATION AS PROGRESS BAR */}
          <div className="flex gap-2.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className="relative h-2 bg-primary/20 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: current === i ? "40px" : "8px" }}
              >
                {/* The Progress Fill */}
                {current === i && (
                  <div 
                    className="absolute inset-0 bg-primary origin-left"
                    style={{
                      animation: `progress-loop 4000ms linear forwards`
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Arrows Row */}
          <div className="flex gap-4 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-12 h-12 border-border" 
              onClick={() => api?.scrollPrev()}
            >
              <ArrowRightLeft className="w-4 h-4 rotate-180" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full w-12 h-12 border-border" 
              onClick={() => api?.scrollNext()}
            >
              <ArrowRightLeft className="w-4 h-4" />
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
    </div>
  );
}