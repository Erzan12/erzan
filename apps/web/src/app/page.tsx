"use client";

import Hero from "@/components/core/hero";
import ProjectCard from "@/components/core/project-card/project-card";
import Skills from "@/components/core/skills";
import { useGithubRepos } from "@/components/hooks/useGithubRepos";
import { projects } from "@/data/projects";

export default function Home() {
  const repos = useGithubRepos();
  return (
    <main className="container mx-auto px-6">
      <Hero />

      <section className="py-16">
        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <ProjectCard key={project.title} {...project}
              repos={repos} />
            ))}
        </div>
      </section>
      
       <Skills />
    </main>
  )
}