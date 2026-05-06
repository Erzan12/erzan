"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getReadingTime } from "@/lib/helper/get-reading-time.helper"; 
import { Post } from "@/lib/types/posts";
import { AuthorCard } from "./author-card";
import { BlogListAnimationProps } from "@/lib/types/blog-list-animation";

export function BlogListAnimation({ posts }: BlogListAnimationProps) {
  return (
    <>
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          
          <Link href={`/blog/${post.slug}`} className="group flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {getReadingTime(post.content)}</span>
              </div>
              {/* <AuthorCard
                name={post.author.name ?? "Unknown"}
                role="Full-Stack Developer"
                avatar={post.author.avatar}
              /> */}
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
              Read Log <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>
          <div className="h-[1px] w-full bg-border/40 mt-8" />
        </motion.div>
      ))}
    </>
  );
}