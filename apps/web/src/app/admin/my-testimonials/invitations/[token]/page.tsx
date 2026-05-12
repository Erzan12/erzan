import { prisma } from "@/lib/prisma/prisma";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function InvitePage({
  params,
}: Props) {
  const { token } = await params;

  const invitation =
    await prisma.testimonialInvitation.findUnique({
      where: { token },
    });

  if (!invitation) {
    return <div>Invalid invitation</div>;
  }

  if (invitation.status !== "PENDING") {
    return <div>Invitation already used</div>;
  }

  // Expiration check
  if (new Date() > invitation.expires_at) {
    await prisma.testimonialInvitation.update({
      where: { id: invitation.id },
      data: {
        status: "EXPIRED",
      },
    });

    return <div>Invitation expired</div>;
  }

  // DO NOT mark accepted here
  redirect(`/?token=${token}#testimonials`);
}