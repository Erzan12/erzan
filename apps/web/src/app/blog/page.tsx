"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getReadingTime } from "@/lib/helper/get-reading-time.helper"

// Mock data - replace this with your Prisma/MDX fetch later
const BLOG_POSTS = [
  {
    id: 1,
    title: "Building Scalable Systems in the Philippines: Lessons Learned",
    description: "An in-depth look at architecting robust CI/CD workflows and managing OCI infrastructure while navigating local technical constraints.",
    content: "full text here for reading time calculation...",
    date: "April 12, 2026",
    category: "DevOps",
    slug: "scalable-systems-philippines",
    author: {
      name: "Earl Jan Do",
      avatar: "/avatar.png", // Path to your photo
      role: "Full-Stack Developer"
    }
  },
  {
    id: 2,
    title: "Why I Switched from AWS to OCI Always Free",
    description: "Comparing compute power, egress costs, and the generous ARM shapes that make Oracle Cloud a winner for personal projects.",
    content: "short content...",
    date: "March 28, 2026",
    category: "Cloud",
    slug: "aws-vs-oci-free-tier",
    author: {
      name: "Earl Jan Do",
      avatar: "/avatar.png",
      role: "Full-Stack Developer"
    }
  }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-4">
            Mission <span className="text-primary">Log</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl font-sans">
            Technical deep dives into NestJS, Next.js, and the chaos of building scalable software.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Main Featured Post */}
          {BLOG_POSTS.slice(0, 1).map((post) => (
            <motion.div key={post.id} variants={item} className="md:col-span-8">
              <Link href={`/blog/${post.slug}`}>
                <Card className="group h-full p-8 bg-olive-about-card/70 dark:bg-olive-dark-about-card border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all shadow-none flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-primary/10 text-primary border-primary/20">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {getReadingTime(post.content)}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3 mb-8">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden border border-primary/20">
                         {/* Replace with <Image /> when you have your avatar */}
                         <div className="w-full h-full flex items-center justify-center text-primary font-bold">JB</div>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{post.author.name}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}

          {/* Sidebar Info/Tags (Right Side) */}
          <motion.div variants={item} className="md:col-span-4 space-y-6">
             <Card className="p-6 bg-olive-about-card/40 dark:bg-olive-dark-about-card/50 border-border rounded-3xl shadow-none">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" /> Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "NestJS", "DevOps", "OCI", "Prisma"].map(tag => (
                    <Badge key={tag} variant="outline" className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
             </Card>
             
             <Card className="p-6 bg-primary/5 border-primary/10 rounded-3xl shadow-none border-dashed border-2">
                <h3 className="font-bold mb-2 text-primary text-sm">Join the Dev Log</h3>
                <p className="text-xs text-muted-foreground mb-4">Get notified when I drop a new deep dive into architecture.</p>
                <div className="flex gap-2">
                  <input className="w-full bg-background border border-border rounded-lg px-3 py-1 text-xs" placeholder="email..." />
                  <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-bold">Join</button>
                </div>
             </Card>
          </motion.div>

          {/* Subsequent Posts Grid */}
          {BLOG_POSTS.slice(1).map((post) => (
            <motion.div key={post.id} variants={item} className="md:col-span-4">
              <Link href={`/blog/${post.slug}`}>
                <Card className="group p-6 bg-olive-about-card/40 dark:bg-olive-dark-about-card/50 border-border rounded-3xl h-full hover:border-primary/50 transition-all shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-[10px]">{post.category}</Badge>
                    <span className="text-[10px] text-muted-foreground">{getReadingTime(post.content)}</span>
                  </div>
                  <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                     <span className="text-[10px] text-muted-foreground">{post.date}</span>
                     <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}