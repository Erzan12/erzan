"use client";

import { Github, Twitter, Linkedin, ExternalLink, BookAIcon, Book, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerLinkClass = "hover:text-primary flex items-center gap-1";

  return (
    <footer className="border-t bg-footer-bg dark:bg-footer-bg/40">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-sm text-gray-600 dark:text-gray-400">

        <div className="flex flex-wrap justify-center items-center gap-6">
          {/* <h3 className="text-footer-accent dark:text-footer-dark-accent font-bold mb-4">
            Your Logo
          </h3> */}
          <blockquote className="italic text-center text-muted-foreground max-w-xl">
            “I don’t follow trends, I follow what’s important and what matters.”
          </blockquote>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://github.com/Erzan12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary flex items-center gap-1"
          >
            <Github size={16} />
            GitHub
          </a>

          <a
            href="https://erzan-docs.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary flex items-center gap-1"
          >
            <BookOpen size={16} />
            Docs
          </a>
          <Link href={`/blog`} className="hover:text-primary" target="_black">
            Blog
          </Link>
          <Link href={`/about`} className="hover:text-primary">
            Contact
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          <a href="https://github.com/Erzan12" className="hover:text-primary dark:hover:text-grey-100" target="_blank">
            <Github size={20} />
          </a>
          <a href="https://twitter.com/yourhandle" className="hover:text-primary">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ej-do/" className="hover:text-primary" target="_blank">
            <Linkedin size={20} />
          </a>
        </div>

        {/* Optional newsletter subscription */}
        {/* <form className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Subscribe to newsletter"
            className="px-4 py-2 rounded-lg border border-primary/10 dark:border-gray-700 bg-white dark:bg-primary/8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary dark:bg-primary/40  text-white hover:dark:bg-primary/60 transition"
          >
            Subscribe
          </button>
        </form> */}
        {/* Branding / copyright */}
        <p className="text-center">
          © {new Date().getFullYear()} erzan-dev.vercel.app built with NextJS ❤️
        </p>
      </div>
    </footer>
  );
}