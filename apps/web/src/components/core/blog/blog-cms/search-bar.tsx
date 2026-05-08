"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../../ui/input";
import { Post } from "@/lib/types/posts";

export function BlogSearchBar({ posts, onFilter }: { posts: Post[], onFilter: (filtered: Post[]) => void}) {
    const [query, setQuery] = useState("")

    useEffect(() => {
    const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase())
    );

    onFilter(filtered);
    }, [query, posts, onFilter]);

    return (
        <div className="relative group">
            <Search className="absolute left-3 top1/2 -translate-y-1/2 w-4 -h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
                placeholder="Search logs...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-olive-about-card/20 border-border focus-visible:ring-primary/30 rounded-xl"
            />
        </div>
    )
}