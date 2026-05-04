"use server"

import { prisma } from "@/lib/prisma/prisma";
import { requireAdmin } from "@/lib/route-protection/user-check";
import { PostStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function createPost(formData: FormData) {
  const session = await requireAdmin();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;

  const rawStatus = formData.get("status");

  if (rawStatus !== "DRAFT" && rawStatus !== "PUBLISHED") {
    return { error: "Invalid status value" };
  }

  const status = rawStatus as PostStatus;

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

  await prisma.post.create({
    data: {
      title,
      slug: finalSlug,
      excerpt,
      status,
      content,
      published: status === "PUBLISHED",
      authorId: session.user.id, 
    },
  });

  revalidatePath("/blog/posts/new");

  return { success: true, slug: finalSlug };
}

export async function updatePost(
  blogID: string,
  formData: FormData
  ) {
  const session = await requireAdmin();

  const title = formData.get("title") as string | null;
  const excerpt = formData.get("excerpt") as string | null;
  const content = formData.get("content") as string | null;

  const updatedPost = await prisma.post.update({
    where: { id: blogID },
    data: {
      ...(title ? { title } : {}),
      ...(excerpt ? { excerpt } : {}),
      ...(content ? { content } : {}),
      authorId: session.user.id, // only keep this if you REALLY want to overwrite author
    },
  });

  revalidatePath(`/blog/${blogID}`);

  return {
    success: true,
    post: updatedPost,
  };
}