"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Layout, Database, Terminal, Code2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPrisma, 
  SiPostgresql, SiDocker, SiTailwindcss, SiPhp, SiLaravel, 
  SiCodeigniter, SiNodedotjs, SiExpress, SiLinux, SiGit, 
  SiVercel, SiMysql, SiRedis, SiFramer 
} from "react-icons/si";
import { ReactNode } from "react";
import SkillCard from "./skills/skill-card";

const item: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" //TypeScript now knows this is a valid Easing string
    } 
  },
};

const techIcons: Record<string, { icon: ReactNode, color: string }> = {
  "React": { icon: <SiReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#000000" },
  "NextJS": { icon: <SiNextdotjs />, color: "#000000" },
  "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
  "NestJS": { icon: <SiNestjs />, color: "#E0234E" },
  "Prisma": { icon: <SiPrisma />, color: "#2D3748" },
  "PostgreSQL": { icon: <SiPostgresql />, color: "#4169E1" },
  "Docker": { icon: <SiDocker />, color: "#2496ED" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "PHP": { icon: <SiPhp />, color: "#777BB4" },
  "Laravel": { icon: <SiLaravel />, color: "#FF2D20" },
  "CodeIgniter": { icon: <SiCodeigniter />, color: "#EE4323" },
  "Node.js": { icon: <SiNodedotjs />, color: "#339933" },
  "Express": { icon: <SiExpress />, color: "#000000" },
  "Git": { icon: <SiGit />, color: "#F05032" },
  "Framer Motion": { icon: <SiFramer />, color: "#0055FF" },
  // ... add the rest as needed
};

const skillData = [
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6 text-red-500" />,
    items: ["NestJS", "PHP", "Laravel", "CodeIgniter", "Node.js", "Express"],
    description: "Architecting scalable server-side systems and RESTful APIs with a focus on performance and clean code.",
    gridConfig: "md:col-span-3 lg:col-span-3 lg:row-span-2",
  },
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6 text-blue-500" />,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "Building interactive, high-performance web interfaces.",
    gridConfig: "md:col-span-2 lg:col-span-2 lg:row-span-2 auto-rows",
  },
  {
    category: "DevOps",
    icon: <Terminal className="w-6 h-6 text-teal-500" />,
    items: ["Docker", "Linux", "Git", "Vercel", "CI/CD"],
    description: "Streamlining deployment workflows.",
    gridConfig: "md:col-span-2 lg:col-span-2 lg:row-span-1 auto-rows",
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    items: ["PostgreSQL", "MySQL", "Prisma", "Redis"],
    description: "Relational modeling and query optimization.",
    gridConfig: "md:col-span-3 lg:col-span-3 lg:row-span-1 auto-rows",
  },
];


  // const skillData = [
  //   {
  //     category: "Backend Development",
  //     icon: <Server className="w-6 h-6 text-red-500" />,
  //     items: ["NestJS", "PHP", "Laravel", "Node.js"],
  //     description: "Architecting scalable server-side systems.",
  //     // CUSTOMIZABLE LAYOUT DATA
  //     gridConfig: "lg:col-span-3 lg:row-span-2", 
  //   },
  //   {
  //     category: "Frontend",
  //     icon: <Layout className="w-6 h-6 text-blue-500" />,
  //     items: ["React", "Next.js", "TypeScript"],
  //     description: "Building interactive web interfaces.",
  //     gridConfig: "lg:col-span-2 lg:row-span-1",
  //   },
  //   {
  //     category: "Databases",
  //     icon: <Database className="w-6 h-6 text-indigo-500" />,
  //     items: ["PostgreSQL", "MySQL", "Prisma"],
  //     description: "Relational modeling.",
  //     gridConfig: "lg:col-span-2 lg:row-span-1", // This will sit under Frontend
  //   },
  //   {
  //     category: "DevOps",
  //     icon: <Terminal className="w-6 h-6 text-teal-500" />,
  //     items: ["Docker", "Linux", "Git", "Vercel", "CI/CD"],
  //     description: "Streamlining deployment workflows.",
  //     className: "lg:col-span-1 lg:row-span-1",
  //   },
  // ];

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="py-20 max-w-6xl mx-auto px-1">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Technical Stack</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-[230px]">
        {skillData.map((skill, i) => (
          <motion.div 
            key={skill.category} 
            // This line makes it customizable!
            className={cn("flex items-stretch", skill.gridConfig)} 
          >
            <SkillCard skill={skill} index={i} />
          </motion.div>
        ))}
      </div>

      {/* <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-[180px]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillData.map((skill, i) => (
          <motion.div 
            key={skill.category} 
            variants={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }} 
            className={cn("flex", skill.className)}
          >
            <Card className="group relative w-full h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm rounded-3xl shadow-none hover:border-primary/40 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold font-sans tracking-tight">
                  {skill.category}
                </CardTitle>
                <div className="p-2 rounded-2xl bg-muted group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  {skill.icon}
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col justify-between h-[calc(100%-70px)]">
                <p className="text-sm text-muted-foreground font-sans line-clamp-2 group-hover:line-clamp-none transition-all">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.items.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className={cn(
                        "rounded-full px-3 py-0.5 font-sans text-[10px] font-semibold border-none transition-transform hover:scale-105",
                        techIcons[tech] || "bg-muted text-muted-foreground"
                      )}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  {skill.items.map((tech) => {
                    const techData = techIcons[tech];
                    return (
                      <div 
                        key={tech} 
                        className="flex items-center gap-2 group/icon cursor-default"
                        title={tech}
                      >
                        <div 
                          className="text-xl transition-all duration-300 grayscale group-hover/icon:grayscale-0 group-hover/icon:scale-120"
                          style={{ color: techData?.color || "inherit" }}
                        >
                          {techData?.icon || <Code2 className="w-5 h-5" />}
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground group-hover/icon:text-foreground transition-colors">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div> */}
    </section>
  );
}