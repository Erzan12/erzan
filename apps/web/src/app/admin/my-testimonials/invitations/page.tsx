import { prisma } from "@/lib/prisma/prisma";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from "next/link";
import InvitationsList from "@/components/core/testimonies/testimonies-cms/testimony-invitation";
import { InvitationStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { SendInvitationModal } from "@/components/core/testimonies/testimonies-cms/modal/testimony-invitation-modal";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

const statuses = [
  "PENDING",
  "ACCEPTED",
  "EXPIRED",
  "DECLINED",
] as const;

export default async function TestimonialInvitationsAdminPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  if (!params.status) {
    redirect(
      "/admin/my-testimonials/invitations?status=PENDING"
    );
  }

  const currentStatus = params.status;

  // const currentStatus =
  //   params.status || "PENDING";

  // Fetch invitations for active tab
  const invitations =
    await prisma.testimonialInvitation.findMany({
      where: {
        status: currentStatus as any,
      },
      orderBy: {
        created_at: "desc",
      },
    });

  // Counts for tabs
  const counts = await prisma.testimonialInvitation.groupBy({
    by: ["status"],
    _count: true,
  });

  const countMap = counts.reduce((acc, item) => {
    acc[item.status] = item._count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Testimonial Invitations
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Manage and review testimonial invitations
            to your colleagues and clients.
          </p>
        </header>

        <SendInvitationModal />
      </div>
      
      <Tabs
        defaultValue={currentStatus}
        className="w-full"
      >
        <TabsList className="bg-slate-500/5 p-1 rounded-xl mb-8">
          {statuses.map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              asChild
              className="rounded-lg px-8"
            >
              <Link
                href={`/admin/my-testimonials/invitations?status=${status}`}
              >
                {status} (
                {countMap[status] || 0})
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={currentStatus}>
          <InvitationsList 
            items={invitations}
            status={currentStatus as InvitationStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
}