"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Github, BookOpen } from "lucide-react";
import { NavLink } from "@/components/core/navbar/nav-link";
import { useState } from "react";
import ThemeToggle from "@/components/dark-mode-toggle/theme-toggle";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-white/80 dark:bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="erzan.dev logo"
            width={32}
            height={32}
          />
          <span className="font-semibold text-lg">erzan.dev</span>
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink href="/projects" onClick={() => setOpen(false)}> Projects </NavLink>
          <NavLink href="/system-design" onClick={() => setOpen(false)}> System Design </NavLink>
          <NavLink href="/about" onClick={() => setOpen(false)}> About </NavLink>
          <NavLink href="/blog" onClick={() => setOpen(false)}> Blog </NavLink>
          <a
            href="https://erzan-docs.vercel.app"
            target="_blank"
            className="flex items-center gap-1 hover:text-black dark:hover:text-white transition relative after:absolute 
            after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          >
            <BookOpen size={16} />
            Docs
          </a>

          <a
            href="https://github.com/Erzan12"
            target="_blank"
            className="flex items-center gap-1 hover:text-black dark:hover:text-white transition relative after:absolute 
            after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          >
            <Github size={16} />
            GitHub
          </a>
          <ThemeToggle />
        </div>

        {/* mobile hamburger button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>
      {/* mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        >
        <div className="border-t px-6 py-4 flex flex-col gap-4 text-sm">
            <NavLink href="/projects" onClick={() => setOpen(false)}>
              Projects
            </NavLink>

            <NavLink href="/system-design" onClick={() => setOpen(false)}>
              System Design
            </NavLink>

            <NavLink href="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>

            <NavLink href="/blog" onClick={() => setOpen(false)}>
              Blog
            </NavLink>

            <a
                href="https://erzan-docs.vercel.app"
                target="_blank"
                onClick={() => setOpen(false)}
            >
                Docs
            </a>

            <a
                href="https://github.com/Erzan12"
                target="_blank"
                onClick={() => setOpen(false)}
            >
                GitHub
            </a>

            <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}