"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

// Guest: submit testimonial
export async function submitTestimonial(formData: { name: string, role: string, content: string, userId: string }) {
    const testimonial = await prisma.testimonials.create({
        data: {
            name: formData.name,
            role: formData.role,
            content: formData.content,
            userId: formData.userId,
        },
    });
    revalidatePath("/");
    return testimonial;
}

export async function moderateTestimonial(
    id: string,
    adminId: string,
    data: { approve: boolean; feedback?: string }
) {
    await prisma.$transaction(async (tx) => {
        // update status
        await tx.testimonials.update({
            where: { id },
            data: {
                is_approve: data.approve,
                is_published: data.approve,
            },
        });

        // handle admin feedback
        if (data.feedback) {
            await tx.testimonialFeedback.upsert({
                where: { testimonial_id: id },
                update: { my_feedback: data.feedback, adminId },
                create: {
                    testimonial_id: id,
                    my_feedback: data.feedback,
                    adminId,
                },
            });
        }
    });

    // this tells nextjs to clear the cache so the admin sees the updated list
    revalidatePath("/admin/my-testimonials/incoming");
    revalidatePath("/");
}