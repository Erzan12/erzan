"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, MapPin, Facebook } from "lucide-react"
// import ThemeToggle from "@/components/dark-mode-toggle/theme-toggle"

// 1. Define the animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This makes cards pop in one by one
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About() {
  return (
    <div className="min-h-screen pt-10 md:pt-20 pb-10">
      {/* Added px-4 sm:px-6 to give breathing room on mobile devices */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div> */}

        {/* Removed fixed heights. Switched to a 1-col (mobile) -> 2-col (tablet) -> 5-col (desktop) grid layout */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          
          <motion.div variants={item} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            {/* About Me - Tall Card (Top Left) */}
            <Card
              id="about"
              className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-primary font-sans">EJD</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-card-foreground font-sans">About Me</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-sans">Philippines</span>
                    </div>
                  </div>
                </div>
                <p className="text-card-foreground leading-relaxed font-sans flex-1 text-sm space-y-4">
                  <span className="block mb-3">
                    I'm Earl Jan Do, a passionate web developer from the Philippines with over 4 years of experience
                    building scalable web applications, systems, and API solutions. I specialize in both backend and frontend development,
                    focusing on creating efficient, maintainable, and user-friendly applications.
                  </span>
                  <span className="block mb-3">
                    I approach development with a strong emphasis on scalability, performance, and clean architecture. I constantly ask:
                    Is this solution scalable? Can it be improved? How can it be optimized? This mindset has evolved throughout my journey
                    from building what's trendy to focusing on what truly works and lasts.
                  </span>
                  <span className="block mb-3">
                    Through collaboration with other developers, It teaches me a lot I always value opinions and feedbacks from others and
                    I've learned the value of going deep into a technology and mastering it. I believe that depth creates long-term growth
                    and opens opportunities for innovation.
                  </span>
                  <span className="block">
                    Outside of coding, I enjoy exploring new web technologies and diving to open-source projects, continuously learning and
                    continuosly growing and giving back to the developer community.
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="font-sans text-xs rounded-full">Laravel</Badge>
                  <Badge variant="secondary" className="font-sans text-xs rounded-full">NestJS</Badge>
                  <Badge variant="secondary" className="font-sans text-xs rounded-full">React</Badge>
                  <Badge variant="secondary" className="font-sans text-xs rounded-full">NextJS</Badge>
                  <Badge variant="secondary" className="font-sans text-xs rounded-full">Codeigniter</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={item} className="md:col-span-2 lg:col-span-2 lg:row-span-1">
            {/* Experience - Medium Card (Top Middle) */}
            <Card
              id="experience"
              className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-card-foreground mb-4 font-sans">Experience</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary font-sans">AV</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground text-sm">Full Stack Developer</h4>
                      <p className="text-xs text-muted-foreground font-sans">Avega Bros. Shipping Integrated Corp • 2025 - Present</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary font-sans">MS</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground font-sans text-sm">IT Technician</h4>
                      <p className="text-xs text-muted-foreground font-sans">Municipality of Silago So. Leyte • 2023 - 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary font-sans">DW</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground font-sans text-sm">Freelance Web Developer</h4>
                      <p className="text-xs text-muted-foreground font-sans">DevWave • 2022 - Present</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item} className="md:col-span-1 lg:col-span-1 lg:row-span-1">
            {/* Status - Square Card (Top Right) */}
            {/* <Card className="md:col-span-1 lg:col-span-2 p-6 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none"> */}
            <Card className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                  <h3 className="font-semibold text-card-foreground font-sans">Available</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 font-sans">Open to new opportunities</p>
                <p className="text-sm text-muted-foreground mb-4 font-sans">Upskill</p>
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground font-sans">Projects</span>
                    <span className="font-semibold text-card-foreground font-sans">10+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground font-sans">Experience</span>
                    <span className="font-semibold text-card-foreground font-sans">4 years</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="md:col-span-1 lg:col-span-1 lg:row-span-1">
            {/* Social Links - Square Card (Bottom Left) */}
            <Card
              id="contact"
              className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            >
              <div className="relative z-10">
                <h3 className="font-semibold text-card-foreground mb-4 font-sans">Connect</h3>
                <div className="space-y-3">
                  <a href="https://github.com/Erzan12" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-sans">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ej-do/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm font-sans">LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm font-sans">Twitter</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-sans">Email</span>
                  </a>
                  <a href="https://www.facebook.com/erjan.do.7" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                    <Facebook className="w-4 h-4" />
                    <span className="text-sm font-sans">Facebook</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item} className="md:col-span-2 lg:col-span-2 lg:row-span-1">
            {/* Selected Projects - Large Card (Bottom Right) */}
            <Card
              id="projects"
              className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            >
              <div className="relative z-10 flex flex-col h-full justify-center">
                <h3 className="font-bold text-card-foreground mb-4 font-sans">Selected Projects</h3>
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground font-sans">SLSU Clinic Appointment System</h4>
                      <p className="text-sm text-muted-foreground mb-3 mt-1 font-sans">
                        Web App with Laravel framework, MySQL, Javascript, and Vite featuring paperless process and appointments online and scalability is possible.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs font-sans rounded-full">Laravel</Badge>
                        <Badge variant="outline" className="text-xs font-sans rounded-full">MySQL</Badge>
                        <Badge variant="outline" className="text-xs font-sans rounded-full">Vite</Badge>
                      </div>
                    </div>
                    {/* Fixed External Link Implementation */}
                    <a href="https://github.com/Erzan12/slsu-clinic-appointment-system" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="font-sans bg-transparent hover:bg-primary/10 hover:scale-105 transition-all duration-200 rounded-full shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground font-sans">QR Attendance Management System</h4>
                      <p className="text-sm text-muted-foreground mb-3 mt-1 font-sans">
                        For faculties and students scanning for generated qr code for convenient attendance during events, and scalability is possible.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs font-sans rounded-full">Laravel</Badge>
                        <Badge variant="outline" className="text-xs font-sans rounded-full">Vite</Badge>
                        <Badge variant="outline" className="text-xs font-sans rounded-full">PHP</Badge>
                      </div>
                    </div>
                    {/* Fixed External Link Implementation */}
                    <a href="https://github.com/Erzan12/qr-code-attendance-management-system" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="font-sans bg-transparent hover:bg-primary/10 hover:scale-105 transition-all duration-200 rounded-full shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="md:col-span-1 lg:col-span-2 lg:row-span-1">
            <Card
              id="my-approach"
              className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-card-foreground mb-4 font-sans">My approach</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span>⚡</span>
                    <span>Performance-focused development</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🧱</span>
                    <span>Scalable system design</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🧼</span>
                    <span>Clean and maintainable architecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🔍</span>
                    <span>Continuous optimization mindset</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="md:col-span-2 lg:col-span-3 lg:row-span-1">
            {/* Other Information - Medium Card (Top Middle) */}
            <Card
              id="experience"
              className="h-full w-full p-6 bg-olive-about-card/70 dark:bg-olive-dark-about-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-card-foreground mb-4 font-sans">Other Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span>🕒 Resume</span>
                      <span>Coming soon...</span>
                    </div>
                    <div className="flex-1">
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
        </motion.div>
      </div>
    </div>
  )
}