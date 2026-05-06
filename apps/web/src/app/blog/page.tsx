import BlogClient from "@/components/core/blog/blog-client";
import { prisma } from "@/lib/prisma/prisma";
import { requireAdmin } from "@/lib/route-protection/user-check";

export default async function BlogPage() {
  const session = await requireAdmin();

  const [posts, profileRes] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      include: { author: true, tags: true },
    }),
    fetch("https://api.github.com/users/Erzan12", {
      next: { revalidate: 3600 },
    }),
  ]);

  const profile = await profileRes.json();

  return (
    <BlogClient
      posts={posts}
      avatar={session?.user.image ?? undefined}
      profile={profile}
    />
  );
}