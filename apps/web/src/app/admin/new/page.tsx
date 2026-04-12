"use client";

import { useState } from "react";
import { createPost } from "@/components/blog-cms/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/blog-cms/editor"; // We will build this next

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    await createPost(formData);
    // Add redirect or toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          placeholder="Post Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold border-none px-0 focus-visible:ring-0"
        />
        
        {/* The rich text editor component */}
        <Editor onChange={setContent} />

        <div className="flex justify-end gap-4">
          <Button variant="outline">Save Draft</Button>
          <Button type="submit">Publish to Dev Log</Button>
        </div>
      </form>
    </div>
  );
}