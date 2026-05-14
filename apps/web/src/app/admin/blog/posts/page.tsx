import { prisma } from "@/lib/prisma/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming shadcn/ui or similar
import BlogModerationList from "@/components/core/blog/blog-cms/blog-moderation-list";

export const dynamic = "force-dynamic";

export default async function ManagePostsAdminPage() {
  // Fetch data on the server
  const draft = await prisma.post.findMany({
    // where: { status: "DRAFT", is_active: true },
    where: { status: "DRAFT" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const published = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const rejected = await prisma.post.findMany({
    where: { status: "REJECTED" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Post Management</h1>
        <p className="text-slate-500 text-sm mt-2">Manage and review your Blog posts.</p>
      </header>

      <Tabs defaultValue="draft" className="w-full">
        <TabsList className="bg-slate-500/5 p-1 rounded-xl mb-8">
          <TabsTrigger value="draft" className="rounded-lg px-8">
            Draft ({draft.length})
          </TabsTrigger>
          <TabsTrigger value="published" className="rounded-lg px-8">
            Published ({published.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="rounded-lg px-8">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draft">
          <BlogModerationList items={draft} type="draft" />
        </TabsContent>
        
        <TabsContent value="published">
          <BlogModerationList items={published} type="published" />
        </TabsContent>

        <TabsContent value="rejected">
          <BlogModerationList items={rejected} type="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  );
}