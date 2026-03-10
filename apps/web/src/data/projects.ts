import { Project } from "@/lib/types/project";

export const projects: Project[] = [
  {
    title: "Portfolio",
    description: "My portfolio website built with React, Next.js, and TailwindCSS",
    stack: ["React", "NextJS", "TypeScript", "Tailwind"],
    repo: "portfolio-v2",
    github: "Erzan12/portfolio-v2",
    featured: true,
  },
  {
    title: "Product Inventory",
    description: "Inventory management system with NestJS, Prisma, and PostgreSQL",
    stack: ["NestJS", "Prisma", "PostgreSQL", "Docker"],
    repo: "Product-Inventory-System",
    github: "Erzan12/Product-Inventory-System",
    featured: true,
  },
  {
    title: "Docs Platform",
    description: "Developer documentation platform using Docusaurus",
    stack: ["Docusaurus", "TypeScript", "React"],
    repo: "portfolio-v2",
    github: "Erzan12/portfolio-v2/tree/master/apps/docs",
    featured: true,
  },
  {
    title: "Livestock Tagging and Profiling Management System",
    description: "Livestock management system",
    stack: ["Laravel", "PHP", "Blade", "Vite", "SaaS"],
    repo: "ltpms-web",
    github: "Erzan12/ltpms-web",
    featured: true,
  },
  {
    title: "QR-Code Attendance Management System",
    description: "This project are for faculties and students scanning for generated qr code for convenient attendance during events",
    stack: ["Laravel", "PHP", "Blade", "Vite"],
    repo: "qr-code-attendance-management-system",
    github: "Erzan12/qr-code-attendance-management-system",
    featured: true,
  },
  {
    title: "SLSU Clinic Appointment System",
    description: "This project is intended for the uninersity clinic to be paperless and all the appointments will be made online",
    stack: ["Laravel", "PHP", "Blade", "Vite"],
    repo: "slsu-clinic-appointment-system",
    github: "Erzan12/slsu-clinic-appointment-system",
    featured: true,
  },
  // Add more projects as needed
];