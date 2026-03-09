import Hero from "@/components/hero";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="container mx-auto px-6">
      <Hero />

      <section className="py-16">
        <h2 className="text-2x1 font-bold mb-8">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.featured)
            .map((projects) => (
              <ProjectCard key={projects.title} {...projects} />
            ))}
        </div>
      </section>
    </main>
  )
}