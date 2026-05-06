import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma/prisma";
import { cn } from "@/lib/utils";
import { RecentPostsSidebarProps } from "@/lib/interface/global.interface";
import { unstable_cache } from "next/cache";

const getRecentPosts = unstable_cache(
  async () => {
    return prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true },
    })
  },
  ["recent-posts"],
  { revalidate: 60 }
)

export default async function RecentPostsSidebar({
  currentSlug,
  showBackButton = false,
}: RecentPostsSidebarProps) {
  const getPosts = await getRecentPosts();

  return (
    <nav className="flex flex-col gap-8">
      
      {showBackButton && (
        <Link href="/blog" className="flex items-center gap-2 text-sm">
          <ChevronLeft className="w-4 h-4" />
          Back to Mission Log
        </Link>
      )}

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase text-muted-foreground">
          Recent Logs
        </h4>

        <ul className="flex flex-col gap-1">
          {getPosts.map((post) => {
            const isActive = currentSlug === post.slug;

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}