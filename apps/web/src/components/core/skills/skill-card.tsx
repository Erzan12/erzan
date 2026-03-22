import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPrisma, 
  SiPostgresql, SiDocker, SiTailwindcss, SiPhp, SiLaravel, 
  SiCodeigniter, SiNodedotjs, SiExpress, SiLinux, SiGit, 
  SiVercel, SiMysql, SiRedis, SiFramer, SiTestinglibrary 
} from "react-icons/si";

export default function SkillCard({ skill, index }: { skill: any; index: number }) {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const techIcons: Record<string, { icon: ReactNode, color: string }> = {
        "React": { icon: <SiReact />, color: "#61DAFB" },
        "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
        "NextJS": { icon: <SiNextdotjs />, color: "#FFFFFF" },
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
        "Express": { icon: <SiExpress />, color: "#FFFFFF" },
        "Git": { icon: <SiGit />, color: "#F05032" },
        "Framer Motion": { icon: <SiFramer />, color: "#0055FF" },
        "Linux": { icon: <SiLinux />, color: "#FCC624" },
        "Vercel": { icon: <SiVercel />, color: "#FFFFFF" },
        "MySQL": { icon: <SiMysql />, color: "#4479A1" },
        "Redis": { icon: <SiRedis />, color: "#DC382D" },
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn("flex", skill.className)}
    >
      <Card className="bg-cream-200 dark:bg-cream-dark group relative w-full h-full overflow-hidden border-border backdrop-blur-md rounded-[2rem] shadow-none hover:border-primary/30 transition-all duration-500">
        
        {/* Dynamic Glow Layer */}
        <AnimatePresence>
          {activeColor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none blur-[100px] rounded-full"
              style={{ backgroundColor: activeColor }}
            />
          )}
        </AnimatePresence>

        <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-primary dark:text-gray-900 font-bold font-sans tracking-tight">
            {skill.category}
          </CardTitle>
          <div className="p-2 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors duration-500">
            {skill.icon}
          </div>
        </CardHeader>

        <CardContent className="relative z-10 flex flex-col justify-between h-[calc(100%-80px)]">
          <p className="text-sm text-black dark:text-white/90 font-sans leading-relaxed">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {skill.items.map((tech: string) => {
              const data = techIcons[tech];
              return (
                <motion.div
                  key={tech}
                  className="flex flex-col items-center gap-2 group/icon"
                  onMouseEnter={() => setActiveColor(data?.color || "#ffffff")}
                  onMouseLeave={() => setActiveColor(null)}
                  whileHover={{ y: -3 }}
                >
                  <div 
                    className="text-2xl transition-all duration-300 grayscale opacity-70 group-hover/icon:grayscale-0 group-hover/icon:opacity-100"
                    style={{ color: data?.color }}
                  >
                    {data?.icon || <SiTypescript />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
                    {tech}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}