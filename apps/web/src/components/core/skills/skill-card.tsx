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

// export default function SkillCard({ skill, index }: { skill: any; index: number }) {
//   const [activeColor, setActiveColor] = useState<string | null>(null);

//   const techIcons: Record<string, { icon: ReactNode, color: string }> = {
//         "React": { icon: <SiReact />, color: "#61DAFB" },
//         "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
//         "NextJS": { icon: <SiNextdotjs />, color: "#FFFFFF" },
//         "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
//         "NestJS": { icon: <SiNestjs />, color: "#E0234E" },
//         "Prisma": { icon: <SiPrisma />, color: "#2D3748" },
//         "PostgreSQL": { icon: <SiPostgresql />, color: "#4169E1" },
//         "Docker": { icon: <SiDocker />, color: "#2496ED" },
//         "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
//         "PHP": { icon: <SiPhp />, color: "#777BB4" },
//         "Laravel": { icon: <SiLaravel />, color: "#FF2D20" },
//         "CodeIgniter": { icon: <SiCodeigniter />, color: "#EE4323" },
//         "Node.js": { icon: <SiNodedotjs />, color: "#339933" },
//         "Express": { icon: <SiExpress />, color: "#FFFFFF" },
//         "Git": { icon: <SiGit />, color: "#F05032" },
//         "Framer Motion": { icon: <SiFramer />, color: "#0055FF" },
//         "Linux": { icon: <SiLinux />, color: "#FCC624" },
//         "Vercel": { icon: <SiVercel />, color: "#FFFFFF" },
//         "MySQL": { icon: <SiMysql />, color: "#4479A1" },
//         "Redis": { icon: <SiRedis />, color: "#DC382D" },
//     };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       // FIXED: Remove flex + className, use fixed height classes
//       className="w-full h-[380px] md:h-[420px]" 
//     >
//       <Card className="group relative w-full h-full overflow-hidden border-border 
//                        bg-cream-200/90 dark:bg-cream-dark-900/20 
//                        backdrop-blur-xl rounded-3xl shadow-none 
//                        hover:border-primary/30 hover:bg-cream-300/90 dark:hover:bg-cream-dark-700/30 
//                        transition-all duration-500 h-full flex flex-col">
        
//         {/* Dynamic Glow Layer */}
//         <AnimatePresence>
//           {activeColor && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.12 }}
//               exit={{ opacity: 0 }}
//               className="absolute inset-0 pointer-events-none blur-[100px] rounded-full"
//               style={{ backgroundColor: activeColor }}
//             />
//           )}
//         </AnimatePresence>
        
//         <CardHeader className="pb-4 flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-xl text-primary dark:text-cream-dark-50 font-bold font-sans tracking-tight">
//               {skill.category}
//             </CardTitle>
//             <div className="p-3 rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-all duration-500">
//               {skill.icon}
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="flex-1 flex flex-col justify-between pt-0 h-[calc(100%-80px)]">
//           {/* FIXED: Fixed height for description */}
//           <div className="h-[120px] mb-6 pr-2">
//             <p className="text-sm text-foreground/80 dark:text-cream-dark-50/90 font-sans leading-relaxed line-clamp-4">
//               {skill.description}
//             </p>
//           </div>

//           {/* FIXED: Fixed height icon grid */}
//           <div className="grid grid-cols-3 gap-3 min-h-[140px]">
//             {skill.items.slice(0, 6).map((tech: string, i: number) => (
//               <motion.div
//                 key={tech}
//                 className="flex flex-col items-center gap-1 group/icon h-20 justify-center"
//                 onMouseEnter={() => setActiveColor(techIcons[tech]?.color || "#ffffff")}
//                 onMouseLeave={() => setActiveColor(null)}
//                 whileHover={{ y: -3 }}
//                 transition={{ delay: i * 0.05 }}
//               >
//                 <div 
//                   className="text-xl transition-all duration-300 grayscale opacity-70 
//                            group-hover/icon:grayscale-0 group-hover/icon:opacity-100"
//                   style={{ color: techIcons[tech]?.color }}
//                 >
//                   {techIcons[tech]?.icon || <SiTypescript />}
//                 </div>
//                 <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 
//                                group-hover/icon:opacity-100 transition-opacity duration-300 
//                                line-clamp-1 px-1 text-center">
//                   {tech}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

// Add className to the props
export default function SkillCard({ 
  skill, 
  index, 
  className 
}: { 
  skill: any; 
  index: number; 
  className?: string 
}) {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const techIcons: Record<string, { icon: ReactNode, color: string }> = {
    // Icons that stay the same color in both modes  
    "React": { icon: <SiReact />, color: "#61DAFB" },
    "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
    // "NextJS": { icon: <SiNextdotjs />, color: "#FFFFFF" },
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
      /* Use the passed className and ensure h-full for Bento spanning */
      className={cn("w-full h-full", className)} 
    >
      <Card className="group relative w-full h-full overflow-hidden border border-border 
                       bg-olive-about-card/40 dark:bg-olive-dark-about-card/50 border border-border 
                       backdrop-blur-xl rounded-3xl shadow-none 
                       hover:border-primary/40 hover:bg-olive-about-card/40
                       transition-all duration-500 flex flex-col min-h-[300px]">
        
        {/* Glow Layer and Header remain the same... */}
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
        
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-primary font-bold font-sans tracking-tight">
              {skill.category}
            </CardTitle>
            <div className="p-3 rounded-2xl bg-primary group-hover:bg-primary/10 transition-all duration-500">
              {skill.icon}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col justify-between pt-0">
          <div className="mb-4">
            <p className="text-sm text-foreground/80 dark:text-cream-dark-50/90 font-sans leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Grid for icons - changed to flex-wrap to better handle various card widths */}
          <div className="flex flex-wrap gap-4 mt-auto">
            {skill.items.map((tech: string, i: number) => (
              <motion.div
                key={tech}
                className="flex items-center gap-2 group/icon"
                onMouseEnter={() => setActiveColor(techIcons[tech]?.color || "#ffffff")}
                onMouseLeave={() => setActiveColor(null)}
                whileHover={{ y: -2 }}
              >
                <div 
                  className="text-2xl transition-all duration-300 grayscale opacity-70 
                             group-hover/icon:grayscale-0 group-hover/icon:opacity-100"
                  style={{ color: techIcons[tech]?.color }}
                >
                  {techIcons[tech]?.icon || <SiTypescript />}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 
                               group-hover/icon:opacity-100 transition-opacity duration-300 
                               line-clamp-1 px-1 text-center">
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