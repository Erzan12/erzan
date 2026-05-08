"use client";

import { routeThemes } from "@/lib/constants/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  const theme = routeThemes[href] || routeThemes["default"];

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        px-4 h-full flex items-center transition-all duration-300 relative
        ${
          active
            ? `${theme} rounded-t-xl border-b-0 translate-y-[1px] z-10 shadow-[0_1px_0_0_rgba(0,0,0,0)]` 
            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent"
        }
      `}
    >
      {children}
    </Link>
  );
}