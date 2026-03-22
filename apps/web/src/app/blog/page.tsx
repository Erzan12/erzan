"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"
import { 
  Hammer, 
  Newspaper, 
  ArrowLeft, 
  Send, 
  Clock, 
  Wrench,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { main } from "framer-motion/client"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function BlogComingSoon() {
  return (
    <main>
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-sans text-sm group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Main Hero Card */}
            <motion.div variants={item} className="md:col-span-3">
              <Card className="p-8 md:p-12 bg-olive-about-card/70 dark:bg-olive-dark-about-card border-border rounded-3xl relative overflow-hidden shadow-none">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Newspaper size={120} className="text-primary rotate-12" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                  <Badge variant="secondary" className="mb-6 px-4 py-1 rounded-full font-sans bg-primary/10 text-primary border-primary/20">
                    <Clock className="w-3 h-3 mr-2 animate-spin-slow" />
                    Coming Soon
                  </Badge>
                  
                  <h1 className="text-4xl md:text-6xl font-bold font-sans tracking-tight mb-6">
                    Deep Dives & <span className="text-primary">Dev Log</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed font-sans mb-8">
                    I'm currently architecting a space to share my thoughts on NestJS, 
                    DevOps automation, and the lessons learned building scalable systems in the Philippines.
                  </p>

                  <div className="w-full max-w-md flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-2 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
                    />
                    <Button className="rounded-xl px-6 gap-2">
                      Notify Me
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Progress Card */}
            <motion.div variants={item}>
              <Card className="p-6 bg-olive-about-card/40 dark:bg-olive-dark-about-card/50 border-border rounded-2xl h-full shadow-none flex flex-col justify-center items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Hammer className="text-primary w-6 h-6" />
                </div>
                <h3 className="font-bold font-sans mb-1">Status</h3>
                <p className="text-sm text-muted-foreground font-sans">Drafting first articles & setting up the MDX engine.</p>
              </Card>
            </motion.div>

            {/* Feature Card */}
            <motion.div variants={item}>
              <Card className="p-6 bg-olive-about-card/40 dark:bg-olive-dark-about-card/50 border-border rounded-2xl h-full shadow-none flex flex-col justify-center items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="font-bold font-sans mb-1">What to expect</h3>
                <p className="text-sm text-muted-foreground font-sans">Prisma tricks, NestJS patterns, and AWS vs OCI value guides.</p>
              </Card>
            </motion.div>

            {/* Tech Stack Card */}
            <motion.div variants={item}>
              <Card className="p-6 bg-olive-about-card/40 dark:bg-olive-dark-about-card/50 border-border rounded-2xl h-full shadow-none flex flex-col justify-center items-center text-center group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="text-orange-500 w-6 h-6" />
                </div>
                <h3 className="font-bold font-sans mb-1">Stack</h3>
                <p className="text-sm text-muted-foreground font-sans">Built with Next.js, Contentlayer, and Framer Motion.</p>
              </Card>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </main>
    
  )
}