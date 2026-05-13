"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { sendModerationEmail } from "./mailer";

// internal mailer
// export async function sendInternalNotificationActions(formData: FormData) {
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     throw new Error("Unauthorized");
//   }
  
//   const email = formData.get("email") as string;

//   if (!email) throw new Error("Email is required");

//   const token = randomUUID();

//   const expiresAt = new Date();
//   expiresAt.setDate(expiresAt.getDate() + 7);

//   const invitation =
//     await prisma.testimonialInvitation.create({
//       data: {
//         email,
//         token,
//         status: "PENDING",
//         expires_at: expiresAt,
//         invited_by_id: session?.user.id, // replace with session user id
//       },
//     });

//   await resend.emails.send({
//     from: "Portfolio <onboarding@resend.dev>",
//     to: email,
//     subject: "You’ve been invited to leave a testimonial",
//     html: `
//       <div>
//         <h2>You were invited to leave a testimonial</h2>

//         <p>Click below to continue:</p>

//         <a href="${process.env.NEXT_PUBLIC_APP_URL}/testimonial/invite/${token}">
//           Accept Invitation
//         </a>

//         <p>This link expires in 7 days.</p>
//       </div>
//     `,
//   });

//   revalidatePath("/admin/my-testimonials/invitations");
// }

