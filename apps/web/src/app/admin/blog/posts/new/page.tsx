"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/blog-cms/editor"; // We will build this next
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/api/blog/posts/route";

type PostStatus = "DRAFT" | "PUBLISHED";

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt ] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("excerpt", excerpt) // Add an excerpt field!
      formData.append("status", status);
      
      const result = await createPost(formData)
      
      if (result?.success) {
        toast({
          title: "Success",
          description: "Log Entry Synchronized",
        });
        // router.push(`/blog/${result.slug}`);
        router.push(`/admin`)
      }
    } catch {
      toast({
        title: "Error",
        description: "Protocol Failure: Could not save post",
        variant: "destructive",
      });
    } finally {
      setLoading(false)
    }
    
    // await createPost(formData);
    // Add redirect or toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          placeholder="Post Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold border-none focus-visible:ring-0"
        />

        <Textarea
          placeholder="Short excerpt..."
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
        
        {/* The rich text editor component */}
        <Editor 
          value={content}
          onChange={setContent} 
        />

        <div className="flex justify-end gap-4">
          {status === "DRAFT" ? (
            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              onClick={() => setStatus("DRAFT")}
            >
              {loading ? "Saving..." : "Save Draft"}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              onClick={() => setStatus("PUBLISHED")}
            >
              {loading ? "Publishing..." : "Publish to Dev Log"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}