"use server";

import { sendInvitationEmail } from "@/lib/mail/external-mailer/send-invitation-mailer";
import { prisma } from "@/lib/prisma/prisma";
import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { randomUUID } from "crypto";

export async function inviteUserAction(_: unknown, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const email = formData.get("email") as string;
    const token = randomUUID();

    await prisma.testimonialInvitation.create({
      data: {
        email,
        token,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        invited_by_id: session.user.id,
      },
    });

    await sendInvitationEmail(email, token);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}