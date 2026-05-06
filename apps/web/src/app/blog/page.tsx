import BlogClient from "@/components/core/blog/blog-client";
import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";
import { requireAdmin } from "@/lib/route-protection/user-check";
import { getServerSession } from "next-auth";

export default async function BlogPage() {
  const session = await getServerSession(authOptions); // make a page accessible to other users regardless if admin or ordinary users, ordinary users can only view posts while admin can view and create posts

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