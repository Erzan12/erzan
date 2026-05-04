"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Plus } from "lucide-react";

type Module = {
  title: string;
  href?: string;
  key?: string;
  icon?: React.ReactNode;
  children?: { title: string; href: string; icon?: React.ReactNode }[];
};

const modules: Module[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Blog",
    key: "blog",
    icon: <FileText size={18} />,
    children: [
      { 
        title: "All Posts", 
        href: "/admin/blog/posts",

      },
      { 
        title: "Create Post", 
        href: "/admin/blog/posts/new",
        icon: <Plus size={16} />,
      },
    ],
  },
  {
    title: "Projects",
    key: "projects",
    children: [
      { title: "All Projects", href: "/admin/projects" },
      { title: "Add Project", href: "/admin/projects/new" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState<string | null>(null);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar");
    if (saved) setOpen(saved);
  }, []);

  // Save state
  useEffect(() => {
    if (open) {
      localStorage.setItem("admin-sidebar", open);
    }
  }, [open]);

   return (
    <aside className="w-64 border-r p-6 space-y-4">
      <h2 className="font-bold text-lg mb-6">CMS</h2>

      {modules.map((mod) => (
        <div key={mod.title} className="space-y-2">
          {/* Parent item */}
          {mod.href ? (
            <Link
              href={mod.href}
              className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md
              ${
                pathname === mod.href
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {mod.icon}
              {mod.title}
            </Link>
          ) : (
            <>
              <button
                onClick={() =>
                  setOpen(open === mod.key ? null : mod.key!)
                }
                className="flex items-center gap-2 text-sm font-medium w-full px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mod.icon}
                {mod.title}
              </button>

              {/* Children */}
              {open === mod.key && (
                <div className="ml-6 mt-2 space-y-2 border-l pl-3">
                  {mod.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md
                      ${
                        pathname === child.href
                          ? "bg-gray-200 dark:bg-gray-800"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {child.icon}
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