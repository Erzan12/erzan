import { prisma } from "@/lib/prisma/prisma";
import UpdatePostClient from "./UpdatePostClient";

export default async function UpdatePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return <UpdatePostClient blogId={id} post={post} />;
}