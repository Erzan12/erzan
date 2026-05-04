"use client";

import { useState } from "react";
import Link from "next/link";

type Module = {
  title: string;
  href?: string;
  key?: string;
  children?: { title: string; href: string }[];
};

const modules: Module[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Blog",
    key: "blog",
    children: [
      { title: "All Posts", href: "/admin/posts" },
      { title: "Create Post", href: "/admin/posts/new" },
    ],
  },
];

export function AdminSidebar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <aside className="w-64 border-r p-6 space-y-4">
      <h2 className="font-bold text-lg mb-6">Portfolio CMS V1.5.0</h2>

      {modules.map((mod) => (
        <div key={mod.title} className="space-y-2">
          {/* If it's a direct link */}
          {mod.href ? (
            <Link
              href={mod.href}
              className="block text-sm hover:text-blue-500"
            >
              {mod.title}
            </Link>
          ) : (
            <>
              {/* Parent button */}
              <button
                onClick={() =>
                  setOpen(open === mod.key ? null : mod.key!)
                }
                className="w-full text-left text-sm font-medium hover:text-blue-500"
              >
                {mod.title}
              </button>

              {/* Children */}
              {open === mod.key && (
                <div className="ml-4 mt-2 space-y-2 border-l pl-3">
                  {mod.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block text-sm text-gray-500 hover:text-blue-500"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </aside>
  );
}