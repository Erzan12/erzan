"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Github, BookOpen } from "lucide-react";
import { NavLink } from "@/components/core/navbar/nav-link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/dark-mode-toggle/theme-toggle";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b bg-white/80 dark:bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {/* Light mode logo */}
            <Image
              src="/favicon.ico"
              alt="erzan.dev logo"
              width={32}
              height={32}
              className="dark:hidden"
            />

            {/* Dark mode logo */}
            <Image
              src="/favicon-light.ico"
              alt="erzan.dev logo"
              width={32}
              height={32}
              className="hidden dark:block"
            />

            <span className="font-semibold text-lg">erzan.dev</span>
          </div>
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

          {/* User avatar dropdown */}
          {session && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center rounded-full ring-2 ring-border hover:ring-primary/50 transition-all"
                aria-label="User menu"
              >
                <Image
                  src={session.user.image ?? "/fallback-avatar.png"}
                  alt={session.user.name ?? "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-52 bg-background border border-border rounded-xl shadow-sm overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium truncate">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>

                  {/* Admin */}
                  <button
                    onClick={() => { router.push("/admin"); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Github size={15} /> Admin panel
                  </button>

                  <div className="border-t border-border" />

                  {/* Sign out */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
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