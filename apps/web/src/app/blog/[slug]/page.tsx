import { prisma } from "@/lib/prisma/prisma"
import { notFound } from "next/navigation"
import { TableOfContents } from "@/components/blog-cms/table-of-contents"
import { RecentPostsSidebar } from "@/components/blog-cms/recent-posts-sidebar"
import Image from "next/image"

export default async function BlogPostPage({ 
  params,
 }: { 
  params: Promise<{ slug: string }> 
 }) {

  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true }
  })

  if (!post) notFound()

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT SIDEBAR (Recent Posts) --- */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
               <RecentPostsSidebar currentSlug={post.slug} />
            </div>
          </aside>

          {/* --- CENTER CONTENT --- */}
          <article className="lg:col-span-6">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground border-b border-border pb-8">
                <Image 
                   src="/github-avatar.png" // Query this from your User table image field
                   alt={post.author.name || "Author"} 
                   width={40} height={40} 
                   className="rounded-full ring-2 ring-primary/20" 
                />
                <div className="text-sm">
                  <p className="font-bold text-foreground">{post.author.name}</p>
                  <p>{new Date(post.createdAt).toLocaleDateString()} · 5 min read</p>
                </div>
              </div>
            </header>

            {/* The Prose layer with your Olive accents */}
            <div 
              className="prose dark:prose-invert prose-olive max-w-none 
                         prose-headings:font-bold prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </article>

          {/* --- RIGHT SIDEBAR (Table of Contents) --- */}
          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-32 border-l border-border pl-6">
              <TableOfContents content={post.content} />
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}