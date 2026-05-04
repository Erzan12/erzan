"use server"

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Safety check: ensure title isn't null
  if (!title) return { error: "Title is required" };

  // 2. Robust Slug Generation
  const baseSlug = slugify(title, { 
    lower: true, 
    strict: true, 
    remove: /[*+~.()'"!:@]/g 
  });

  // 3. Collision Check
  const existing = await prisma.post.findUnique({ 
    where: { slug: baseSlug } 
  });

  const finalSlug = existing 
    ? `${baseSlug}-${Date.now().toString().slice(-4)}` 
    : baseSlug;

  // 4. Create the post using finalSlug
  await prisma.post.create({
    data: {
      title,
      slug: finalSlug,
      content,
      published: true,
      authorId: "", // Reminder: replace with actual session ID later!
    },
  });

  revalidatePath("/blog");

  return { success: true, slug: finalSlug };
}