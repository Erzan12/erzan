"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

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