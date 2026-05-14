import { prisma } from "@/lib/prisma/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming shadcn/ui or similar
import ModerationList from "@/components/core/testimonies/testimonies-cms/testimony-moderation-list";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  // Fetch data on the server
  const review = await prisma.testimonials.findMany({
    where: { is_approved: false, is_active: true, status: "REVIEW" },
    include: { feedback: true, user: true },
    orderBy: { created_at: "desc" },
  });

  const published = await prisma.testimonials.findMany({
    where: { is_approved: true, is_active: true, status: "APPROVED" },
    include: { feedback: true, user: true },
    orderBy: { updated_at: "desc" },
  });

  const rejected = await prisma.testimonials.findMany({
    where: { is_approved: false, is_active: true, status: "REJECTED" },
    include: { feedback: true, user: true },
    orderBy: { updated_at: "desc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Moderation Queue</h1>
        <p className="text-slate-500 text-sm mt-2">Manage and review testimonials from your colleagues and clients.</p>
      </header>

      <Tabs defaultValue="review" className="w-full">
        <TabsList className="bg-slate-500/5 p-1 rounded-xl mb-8">
          <TabsTrigger value="review" className="rounded-lg px-8">
            Incoming ({review.length})
          </TabsTrigger>
          <TabsTrigger value="published" className="rounded-lg px-8">
            Published ({published.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="rounded-lg px-8">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="review">
          <ModerationList items={review} type="review" />
        </TabsContent>
        
        <TabsContent value="published">
          <ModerationList items={published} type="published" />
        </TabsContent>

        <TabsContent value="rejected">
          <ModerationList items={rejected} type="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  );
}