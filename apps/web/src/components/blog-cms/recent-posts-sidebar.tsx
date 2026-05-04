import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma/prisma"; // Adjust path to your singleton
import { cn } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

interface RecentPostsSidebarProps {
  currentSlug?: string;
}

// 1. Precise type definition using Prisma's helper
type PostPreview = Prisma.PostGetPayload<{
  select: { title: true; slug: true };
}>;

/**
 * Data Fetcher: Separating logic makes the component cleaner 
 * and easier to wrap in React 'cache' if needed later.
 */
async function getRecentPosts(): Promise<PostPreview[]> {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        title: true,
        slug: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch recent logs:", error);
    return [];
  }
}

export async function RecentPostsSidebar({ currentSlug }: RecentPostsSidebarProps) {
  const posts = await getRecentPosts();

  return (
    <nav className="flex flex-col gap-8" aria-label="Recent posts sidebar">
      {/* --- Navigation Back --- */}
      <Link
        href="/blog"
        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Mission Log
      </Link>

      {/* --- Recent Posts List --- */}
      <div className="space-y-4">
        <h4 className="px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
          Recent Logs
        </h4>
        
        <ul className="flex flex-col gap-1">
          {posts.map((post) => {
            const isActive = currentSlug === post.slug;

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-olive-about-card/30 hover:text-foreground"
                  )}
                >
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {posts.length === 0 && (
          <p className="px-2 text-xs text-muted-foreground">No recent logs found.</p>
        )}
      </div>
    </nav>
  );
}