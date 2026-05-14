"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { sendModerationEmail } from "../mail/internal-mailer/mailer";

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
      is_approved: false,
      is_published: false,
      is_active: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/my-testimonials");
  return testimonial;
}

export async function moderateTestimonial(
  id: string,
  data: { approve: boolean; feedback?: string; },
  adminId: string,
) {
  const status = data.approve ? "APPROVED" : "REJECTED";

  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMINISTRATOR") {
    throw new Error("Unauthorized");
  }

  // 1. Update the Testimonial & include the user email to send the notification
  const testimonial = await prisma.testimonials.update({
    where: { id },
    data: {
      is_approved: data.approve,
      is_published: data.approve,
      is_active: data.approve,     // optional rule
      feedback: data.feedback
        ? {
            create: {
              my_feedback: data.feedback,
              admin: {
                connect: {
                  id: adminId, // <- you must pass this
                },
              },
            },
          }
        : undefined,
    },
    include: {
      user: true, // Assuming relation is named 'user'
    }
  });

  // 2. Handle Feedback
  if (data.feedback) {
    await prisma.testimonialFeedback.upsert({
      where: { testimonial_id: id },
      update: {
        my_feedback: data.feedback,
        adminId: session.user.id,
      },
      create: {
        testimonial_id: id,
        my_feedback: data.feedback,
        adminId: session.user.id,
      },
    });
  }

  // 3. TRIGGER EMAIL (The "Confirm & Email" part)
  // We only send if we have a user email
  const userEmail = testimonial.user?.email;
  if (userEmail) {
    await sendModerationEmail({
      to: userEmail,
      name: testimonial.name,
      approved: data.approve,
      feedback: data.feedback
    });
  }

  revalidatePath("/admin/my-testimonials");
  revalidatePath("/");
  return testimonial;
}