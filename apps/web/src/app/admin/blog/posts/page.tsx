import { prisma } from "@/lib/prisma/prisma";
import ModerationList from "@/components/core/testimonies/testimonies-cms/testimony-moderation-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming shadcn/ui or similar

export default async function ManagePostsAdminPage() {
  // Fetch data on the server
  const draft = await prisma.post.findMany({
    // where: { status: "DRAFT", is_active: true },
    where: { status: "DRAFT" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const published = await prisma.testimonials.findMany({
    where: { is_approve: true, is_active: true },
    include: { feedback: true, user: true },
    orderBy: { updated_at: "desc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Post Management</h1>
        <p className="text-slate-500 text-sm mt-2">Manage and review your Blog posts.</p>
      </header>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-slate-500/5 p-1 rounded-xl mb-8">
          <TabsTrigger value="pending" className="rounded-lg px-8">
            Draft ({draft.length})
          </TabsTrigger>
          <TabsTrigger value="published" className="rounded-lg px-8">
            Published ({published.length})
          </TabsTrigger>
          {/* <TabsTrigger value="published" className="rounded-lg px-8">
            Upcoming ({published.length})
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="pending">
          <ModerationList items={draft} type="pending" />
        </TabsContent>
        
        <TabsContent value="published">
          <ModerationList items={published} type="published" />
        </TabsContent>
      </Tabs>
    </div>
  );
}