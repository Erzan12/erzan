"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects"; // Your data
import { Project } from "@/lib/types/project"; // Your type

interface ProjectsCarouselProps {
  projects: Project[];
  repos: any; //or use the specific type from your hook
}

export default function ProjectCarousel({ projects, repos }: ProjectsCarouselProps) {
  return (
    <div className="w-full px-4 py-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {projects.map((project: Project, index: number) => (
            <CarouselItem 
              key={`${project.repo}-${index}`} 
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-[480px] flex flex-col bg-cream-100 dark:bg-cream-50/70 border-border rounded-2xl overflow-hidden shadow-none transition-all duration-300 hover:border-primary/50 group">
                <CardHeader className="p-0">
                  {/* Project Image Placeholder */}
                  <div className="w-full h-48 bg-muted flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:scale-105 transition-transform duration-500" />
                    <span className="text-muted-foreground relative z-10 font-sans text-sm italic">
                      {project.title} Preview
                    </span>
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
                    {project.stack.map((tech: string) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="rounded-full text-[10px] font-sans px-2.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-3">
                  <a 
                    href={`https://github.com/${project.github}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full rounded-full gap-2 font-sans">
                      <Github className="w-4 h-4" /> Code
                    </Button>
                  </a>
                  <Button size="sm" className="flex-1 rounded-full gap-2 font-sans">
                    <ExternalLink className="w-4 h-4" /> Demo
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation - Hidden on mobile, shown on md+ screens */}
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12 border-border" />
          <CarouselNext className="-right-12 border-border" />
        </div>
      </Carousel>
    </div>
  );
}