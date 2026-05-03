import { prisma } from "@/lib/prisma/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogListAnimation } from "@/components/blog-cms/blog-animations";
import { AuthorCard } from "@/components/blog-cms/author-card";

export default async function BlogPage() {
  const [posts, profileRes] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: { author: true, tags: true },
    }),
    fetch("https://api.github.com/users/Erzan12", {
      next: { revalidate: 3600 },
    }),
  ]);

  const profile = await profileRes.json();

  const avatar = profile.avatar_url;

  const enrichedPosts = posts.map(post => ({
    ...post,
    author: {
      ...post.author,
      avatar: avatar, 
    },
  }));

  const featuredPost = enrichedPosts[0];
  const regularPosts = enrichedPosts.slice(1);

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section: Minimalist & Clean */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Mission <span className="text-primary italic">Log</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium border-l-2 border-primary/30 pl-6 py-1">
            Documentation of my journey through NestJS architecture, Next.js performance, 
            and the nuances of full-stack engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- MAIN FEED (8 columns) --- */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Featured Post: Big, Bold, and Interactive */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <Card className="relative overflow-hidden p-0 border-none bg-transparent shadow-none">
                  <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    <AuthorCard
                      name={featuredPost.author.name ?? "Unknown"}
                      role="Full-Stack Developer"
                      avatar={featuredPost.author.avatar}
                    />
                    
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs font-mono text-primary uppercase tracking-widest">
                      <Badge className="bg-primary/10 text-primary border-primary/20">Featured Entry</Badge>
                      <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-4xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground text-lg line-clamp-2 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            )}

            {/* Regular Post Feed: The "Mission Log" View */}
            <div className="space-y-8 pt-12 border-t border-border/50">
              <BlogListAnimation posts={regularPosts} />
            </div>
          </div>

          {/* --- SIDEBAR (4 columns) --- */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="sticky top-32 space-y-10">
              
              {/* Category Explorer */}
              <section className="bg-olive-about-card/30 dark:bg-olive-dark-about-card/40 p-8 rounded-3xl border border-border/50">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" /> Systems Explorer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "NestJS", "PostgreSQL", "Supabase", "Architecture"].map(tag => (
                    <button key={tag} className="px-4 py-2 text-sm rounded-full bg-background border border-border hover:border-primary/50 hover:text-primary transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
              </section>

              {/* Quick Connect / About Me Mini-Widget */}
              <section className="p-8 rounded-3xl border border-dashed border-primary/30">
                <div className="flex items-center gap-4 mb-4">
                  {/* <Image src="/avatar.png" width={48} height={48} className="rounded-full grayscale hover:grayscale-0 transition-all" alt="Earl" /> */}
                  <AuthorCard
                    name="Earl Jan Do"
                    role="Full-Stack Developer"
                    avatar={avatar}
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building high-performance applications in the Philippines. Currently scaling 
                  ShopStack and maintaining vessel maintenance systems.
                </p>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}