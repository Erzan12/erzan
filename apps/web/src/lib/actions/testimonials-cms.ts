"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { randomUUID } from "crypto";
import { Resend } from "resend";

/**
 * GUEST: Submit a new testimonial
 */
export async function submitTestimonial(data: { 
  name: string; 
  role?: string; 
  content: string; 
  userId: string 
}) {
  const testimonial = await prisma.testimonials.create({
    data: {
      name: data.name,
      role: data.role,
      content: data.content,
      userId: data.userId,
      is_approve: false,
      is_published: false,
      is_active: true,
    },
  });

  revalidatePath("/");
  return testimonial;
}

/**
 * ADMIN: Moderate a testimonial (Approve/Reject with optional feedback)
 */
export async function moderateTestimonial(
  id: string, 
  data: { approve: boolean; feedback?: string }
) {
  const session = await getServerSession(authOptions);
  
  // Security check: Ensure only administrators can moderate
  if (session?.user?.role !== "ADMINISTRATOR") {
    throw new Error("Unauthorized");
  }

  const result = await prisma.$transaction(async (tx) => {
    // 1. Update the testimonial status
    const testimonial = await tx.testimonials.update({
      where: { id },
      data: {
        is_approve: data.approve,
        is_published: data.approve, // Auto-publish on approval
      },
    });

    // 2. Handle feedback/rejection reason
    if (data.feedback) {
      await tx.testimonialFeedback.upsert({
        where: { testimonial_id: id },
        update: { 
          my_feedback: data.feedback, 
          adminId: session.user.id 
        },
        create: {
          testimonial_id: id,
          my_feedback: data.feedback,
          adminId: session.user.id,
        },
      });
    }

    return testimonial;
  });

  revalidatePath("/admin/my-testimonials");
  revalidatePath("/");
  return result;
}

export async function sendInvitationAction(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const email = formData.get("email") as string;

  if (!email) throw new Error("Email is required");

  const token = randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const invitation =
    await prisma.testimonialInvitation.create({
      data: {
        email,
        token,
        status: "PENDING",
        expires_at: expiresAt,
        invited_by_id: session?.user.id, // replace with session user id
      },
    });

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: email,
    subject: "You’ve been invited to leave a testimonial",
    html: `
      <div>
        <h2>You were invited to leave a testimonial</h2>

        <p>Click below to continue:</p>

        <a href="${process.env.NEXT_PUBLIC_APP_URL}/testimonial/invite/${token}">
          Accept Invitation
        </a>

        <p>This link expires in 7 days.</p>
      </div>
    `,
  });

  revalidatePath("/admin/my-testimonials/invitations");
}