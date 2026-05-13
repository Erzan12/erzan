// import { prisma } from "@/lib/prisma/prisma";
// import InviteAcceptRedirect from "./invite-accept-redirect";

// type Props = {
//   params: { token: string };
// };

// export default async function InvitePage({ params }: Props) {
//     const { token } = params;

//   const invitation =
//     await prisma.testimonialInvitation.findUnique({
//       where: { token },
//     });

//   if (!invitation) {
//     return <div>Invalid invitation</div>;
//   }

//   if (invitation.status !== "PENDING") {
//     return <div>Invitation already used</div>;
//   }

//   // Expiration check
//   if (new Date() > invitation.expires_at) {
//     await prisma.testimonialInvitation.update({
//       where: { id: invitation.id },
//       data: {
//         status: "EXPIRED",
//       },
//     });

//     return <div>Invitation expired</div>;
//   }

//   // DO NOT mark accepted here. Use client navigation so #testimonials survives
//   // (HTTP redirects often drop the fragment from Location).
//   return <InviteAcceptRedirect token={token} />;
// }

import { prisma } from "@/lib/prisma/prisma";
import InviteAcceptRedirect from "./invite-accept-redirect";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitePage({ params }: Props) {
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

  if (new Date() > invitation.expires_at) {
    await prisma.testimonialInvitation.update({
      where: { id: invitation.id },
      data: {
        status: "EXPIRED",
      },
    });

    return <div>Invitation expired</div>;
  }

  return <InviteAcceptRedirect token={token} />;
}