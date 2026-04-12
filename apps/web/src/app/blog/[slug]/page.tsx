import { prisma } from "@/lib/prisma/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      tags: true,
    },
  });

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { title: true, slug: true, createdAt: true },
  });

  if (!post) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:grid lg:grid-cols-12 lg:gap-12">
      {/* --- Sticky Sidebar --- */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Recent Posts
            </h3>
            <ul className="space-y-3">
              {recentPosts.map((rp) => (
                <li key={rp.slug}>
                  <Link 
                    href={`/blog/${rp.slug}`}
                    className="text-sm hover:text-primary transition-colors line-clamp-2"
                  >
                    {rp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="lg:col-span-9">
        <header className="mb-8 border-b pb-8 border-border">
          <h1 className="text-4xl font-extrabold mb-6 text-foreground">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-3">
            {post.author.image && (
              <Image 
                src={post.author.image} 
                alt={post.author.name || "Author"} 
                width={40} 
                height={40} 
                className="rounded-full border border-border"
              />
            )}
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>
        </header>

        {/* --- Rendered Content --- */}
        <article 
          className="prose dark:prose-invert prose-orange max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </main>
    </div>
  );
}