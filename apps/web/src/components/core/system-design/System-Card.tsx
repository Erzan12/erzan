"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure to import this
import { ExternalLink, Github } from "lucide-react";
import { getRelativeTime } from "@/lib/helper/date-format.helper";
import { formatCommitDate } from "@/lib/helper/format-commit-date.helper";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type Props = {
  title: string;
  description: string;
  stack?: string[];
  topics?: string[];
  stars?: number;
  forks?: number;
  language?: string | null;
  last_update?: string;
  link?: string;
  showArchitectureLink?: boolean;
  showRepositoryLink?: boolean;
  techColors?: Record<string, string>;
  icon?: React.ReactNode;
};

export default function SystemCard({
  title,
  description,
  stack,
  topics,
  language,
  stars,
  forks,
  last_update,
  link,
  showArchitectureLink = true,
  showRepositoryLink = true,
  techColors = {},
  icon,
}: Props) {
  return (
    <Card className="h-[480px] flex flex-col bg-card border-border rounded-2xl overflow-hidden shadow-none transition-all duration-300 hover:border-primary/50 group">
      <CardHeader className={icon ? "p-6 pb-0" : "p-6 pb-2"}>
        {icon && (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl font-bold font-sans text-card-foreground">
          {title}
        </CardTitle>
        
        {(stars !== undefined || language) && (
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground font-sans">
            {language && <span className="font-bold text-primary">{language}</span>}
            {stars !== undefined && <span>⭐ {stars}</span>}
            {forks !== undefined && <span>🍴 {forks}</span>}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground font-sans leading-relaxed line-clamp-4 mb-4">
          {description}
        </p>

        <motion.div 
          className="flex flex-wrap gap-2 mt-auto" 
          variants={container} 
          initial="hidden" 
          animate="visible"
        >
          {stack?.map((tech) => (
            <motion.div key={tech} variants={item} whileHover={{ scale: 1.05 }}>
              <Badge
                variant="secondary"
                className={`rounded-full text-[10px] font-sans px-2.5 py-0.5 border-none ${
                  techColors[tech] || "bg-secondary text-secondary-foreground"
                }`}
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        {last_update && (
          <div className="w-full text-[10px] text-muted-foreground font-sans flex flex-col mb-1">
            <span>Updated {getRelativeTime(last_update)}</span>
            <span className="opacity-70 text-[9px]">Last commit: {formatCommitDate(last_update)}</span>
          </div>
        )}

        <div className="flex gap-3 w-full">
          {showArchitectureLink && link && (
            <Button asChild variant="outline" size="sm" className="flex-1 rounded-full gap-2 font-sans text-xs">
              <Link href={link} target="_blank">
                <ExternalLink className="w-3.5 h-3.5" /> Case Study
              </Link>
            </Button>
          )}

          {showRepositoryLink && link && (
            <Button asChild size="sm" className="flex-1 rounded-full gap-2 font-sans text-xs">
              <Link href={link} target="_blank">
                <Github className="w-3.5 h-3.5" /> Repo
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Loading Skeleton Version
 */
// export function SystemCardSkeleton() {
//   return (
//     <Card className="h-[480px] flex flex-col bg-card border-border rounded-2xl overflow-hidden shadow-none">
//       <CardHeader className="p-6">
//         {/* Circle Icon Placeholder */}
//         <Skeleton className="w-12 h-12 rounded-full mb-4" />
//         {/* Title Placeholder */}
//         <Skeleton className="h-7 w-3/4 rounded-lg" />
//         {/* GitHub Stats Placeholder */}
//         <div className="flex gap-3 mt-2">
//           <Skeleton className="h-3 w-12" />
//           <Skeleton className="h-3 w-10" />
//         </div>
//       </CardHeader>

//       <CardContent className="p-6 flex-1 flex flex-col">
//         {/* Description Lines */}
//         <div className="space-y-2 mb-4">
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-[90%]" />
//           <Skeleton className="h-4 w-[95%]" />
//         </div>

//         {/* Badges Placeholder */}
//         <div className="flex flex-wrap gap-2 mt-auto">
//           <Skeleton className="h-6 w-16 rounded-full" />
//           <Skeleton className="h-6 w-20 rounded-full" />
//           <Skeleton className="h-6 w-14 rounded-full" />
//         </div>
//       </CardContent>

//       <CardFooter className="p-6 pt-0 flex flex-col gap-3">
//         {/* Date Placeholder */}
//         <div className="space-y-1 mb-1">
//           <Skeleton className="h-3 w-24" />
//           <Skeleton className="h-2 w-32 opacity-50" />
//         </div>
//         {/* Buttons Placeholder */}
//         <div className="flex gap-3 w-full">
//           <Skeleton className="h-9 flex-1 rounded-full" />
//           <Skeleton className="h-9 flex-1 rounded-full" />
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }