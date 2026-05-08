"use client";

import Hero from "@/components/core/hero";
import Skills from "@/components/core/skills";
import { projects } from "@/data/projects";
import ProjectsCarousel from "@/components/core/projects/projects-carousel";
import HowIThink from "@/components/core/how-i-think";
import CaseStudy from "@/components/core/project-case";
import Lab from "@/components/core/experimental-lab";
import Tabs from "@/components/core/tabs";
import Testimonials from "@/components/core/testimonies/testimony";

export default function Home() {
  return (
    <main className="container mx-auto px-6 overflow-x-hidden">
      <Hero />
      <Tabs />
      <section className="py-20 max-w-6xl mx-auto px-1">
        <div className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
          <ProjectsCarousel
            projects={projects.filter((p) => p.featured)}
          />
        </div>
      </section>
      <Skills />
      <CaseStudy />
      <HowIThink />
      
      <Lab />
      <Testimonials />
    </main>
  )
}