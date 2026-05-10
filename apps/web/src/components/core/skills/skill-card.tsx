import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPrisma, 
  SiPostgresql, SiDocker, SiTailwindcss, SiPhp, SiLaravel, 
  SiCodeigniter, SiNodedotjs, SiExpress, SiLinux, SiGit, 
  SiVercel, SiMysql, SiRedis, SiFramer, 
} from "react-icons/si";

type Skills = {
  category: string;
  badge: string;
  icon: ReactNode;
  description: string;
  items: string[];
}

export default function SkillCard({ 
  skill, 
  index, 
  className 
}: { 
  skill: Skills; 
  index: number; 
  className?: string 
}) {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const techIcons: Record<string, { icon: ReactNode, color: string }> = { 
    "React": { icon: <SiReact />, color: "#61DAFB" },
    "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
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
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      /* use the passed className and ensure h-full for bento spanning */
      className={cn("w-full h-full", className)} 
    >
      <Card
        className="
          group relative overflow-hidden
          rounded-[2rem]
          border border-slate-500/10
          bg-white/50 dark:bg-slate-900/40
          backdrop-blur-md
          transition-all duration-500
          hover:border-slate-400/20
          hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          h-full

          before:absolute before:inset-0
          before:bg-gradient-to-br
          before:from-white/[0.03]
          before:to-transparent
          before:pointer-events-none
        "
      >
        
        {/* glow Layer and Header remain the same */}
        {/* dynamic glow layer */}
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
        
        <CardHeader className="pb-5 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className="
                  inline-flex items-center gap-2
                  px-3 py-1 rounded-full
                  border border-slate-500/10
                  bg-slate-900/5 dark:bg-white/5
                  text-[10px] uppercase tracking-[0.2em]
                  text-slate-500 mb-4
                "
              >
                {skill.badge}
              </div>

              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {skill.category}
              </CardTitle>
            </div>

            <div
              className="
                w-14 h-14 rounded-2xl
                flex items-center justify-center
                border border-slate-500/10
                bg-white/30 dark:bg-white/[0.03]
              "
            >
              {skill.icon}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col justify-between pt-0">
          <div className="mb-4">
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {skill.description}
            </p>
          </div>

          {/* grid for icons changed to flex-wrap to better handle various card widths */}
          <div className="flex flex-wrap gap-3 mt-8">
            {skill.items.map((tech: string) => (
              <motion.div
                key={tech}
                onMouseEnter={() =>
                  setActiveColor(techIcons[tech]?.color || "#ffffff")
                }
                onMouseLeave={() => setActiveColor(null)}
                whileHover={{ y: -2 }}
                className="
                  flex items-center gap-2
                  px-3 py-2 rounded-2xl
                  border border-slate-500/10
                  bg-slate-500/[0.03]
                  dark:bg-white/[0.03]
                  text-xs text-slate-600 dark:text-slate-300
                  transition-all duration-300
                  hover:border-slate-400/20
                "
              >
                <div
                  className="text-lg"
                  style={{ color: techIcons[tech]?.color }}
                >
                  {techIcons[tech]?.icon || <SiTypescript />}
                </div>

                <span className="font-medium tracking-wide">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}