"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/blog-cms/editor";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { updatePost } from "@/app/api/blog/posts/route";

type PostStatus = "DRAFT" | "PUBLISHED";

export default function UpdatePostClient({
  blogId,
  post,
}: {
  blogId: string;
  post: {
    title: string;
    content: string;
    excerpt: string | null;
    status: "DRAFT" | "PUBLISHED";
  };
}) {
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt || "");
  const [status, setStatus] = useState<PostStatus>(post.status);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("excerpt", excerpt);
      formData.append("status", status);

      const result = await updatePost(blogId, formData);

      console.log(title);
      console.log(excerpt);
      console.log(content);

      if (result?.success) {
        toast({
          title: "Success",
          description: "Post updated",
        });

        router.push("/admin");
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not update post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
   
        <Input
          placeholder="Update Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Update excerpt..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <p className="text-sm font-medium">Post Visibility:</p>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as PostStatus)}
          className="bg-transparent border-none text-primary font-bold focus:ring-0"
        >
          <option value="DRAFT">Draft (Hidden)</option>
          <option value="PUBLISHED">Published (Public)</option>
        </select>

        <Editor 
          value={content}
          onChange={setContent}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}