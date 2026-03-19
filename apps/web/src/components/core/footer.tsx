"use client";

import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-5 bg-primary/8 dark:bg-card/50">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
        
        {/* Branding / copyright */}
        <p className="text-center">
          © {new Date().getFullYear()} erzan.dev. Built with NextJS ❤️
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://github.com/Erzan12" className="hover:text-primary flex items-center gap-1">
            <Github size={16} /> GitHub
          </a>
          <a href="https://erzan-docs.vercel.app" className="hover:text-primary" target="_blank">
            Docs
          </a>
          <a href="/blog" className="hover:text-primary">
            Blog
          </a>
          <a href="/contact" className="hover:text-primary">
            Contact
          </a>
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          <a href="https://github.com/Erzan12" className="hover:text-primary dark:hover:text-grey-100">
            <Github size={20} />
          </a>
          <a href="https://twitter.com/yourhandle" className="hover:text-primary">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/yourhandle/" className="hover:text-primary">
            <Linkedin size={20} />
          </a>
        </div>

        {/* Optional newsletter subscription */}
        <form className="mt-4 flex flex-col sm:flex-row gap-2">
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
        </form>
      </div>
    </footer>
  );
}