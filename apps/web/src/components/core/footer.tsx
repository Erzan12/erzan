"use client";

import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
        
        {/* Branding / copyright */}
        <p className="text-center">
          © {new Date().getFullYear()} erzan.dev. Built with NextJS ❤️
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://github.com/Erzan12" className="hover:text-blue-500 flex items-center gap-1">
            <Github size={16} /> GitHub
          </a>
          <a href="https://docs.erzan.dev" className="hover:text-blue-500">
            Docs
          </a>
          <a href="/blog" className="hover:text-blue-500">
            Blog
          </a>
          <a href="/contact" className="hover:text-blue-500">
            Contact
          </a>
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          <a href="https://github.com/Erzan12" className="hover:text-grey-500 dark:hover:text-grey-100">
            <Github size={20} />
          </a>
          <a href="https://twitter.com/yourhandle" className="hover:text-blue-400">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/yourhandle/" className="hover:text-blue-600">
            <Linkedin size={20} />
          </a>
        </div>

        {/* Optional newsletter subscription */}
        <form className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Subscribe to newsletter"
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}