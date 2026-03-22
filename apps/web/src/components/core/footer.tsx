"use client";

import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-5 bg-footer-bg dark:bg-footer-bg/40">
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
          <a href="https://github.com/Erzan12" className="hover:text-primary flex items-center gap-1">
            <Github size={16} /> GitHub
          </a>
          <a href="https://erzan-docs.vercel.app" className="hover:text-primary" target="_blank">
            Docs
          </a>
          <a href="https://erzan-docs.vercel.app/blog" className="hover:text-primary" target="_black">
            Blog
          </a>
          <a href="/about" className="hover:text-primary">
            Contact
          </a>
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
          © {new Date().getFullYear()} erzan.dev. Built with NextJS ❤️
        </p>
      </div>
    </footer>

    // <footer className="bg-footer-bg dark:bg-footer-dark-bg py-12 border-t border-footer-border dark:border-cream-dark-700">
    //   <div className="max-w-7xl mx-auto px-6">
    //     {/* Main footer content */}
    //     <div className="text-footer-text dark:text-footer-dark-text grid md:grid-cols-4 gap-8 pb-8">
    //       <div>
    //         <h3 className="text-footer-accent dark:text-footer-dark-accent font-bold mb-4">
    //           Your Logo
    //         </h3>
    //         <p className="text-footer-text-muted dark:text-footer-dark-muted text-sm">
    //           Warm, inviting description...
    //         </p>
    //       </div>
          
    //       {/* Links column */}
    //       <div>
    //         <h4 className="text-cream-900 dark:text-footer-dark-text font-semibold mb-4">
    //           Links
    //         </h4>
    //         <ul className="space-y-2">
    //           <li>
    //             <a href="#" className="text-footer-text-muted dark:text-footer-dark-muted 
    //                 hover:text-footer-link-hover hover:underline text-sm transition-colors">
    //               Home
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
        
    //     {/* Bottom bar */}
    //     <div className="pt-8 border-t border-footer-border/50 dark:border-footer-dark-accent/20 
    //                     text-center text-footer-text-muted dark:text-footer-dark-muted text-xs">
    //       © 2026 Your Site
    //     </div>
    //   </div>
    // </footer>
  );
}