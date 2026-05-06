import { Post, User, Tag } from "@prisma/client";

export interface RecentPostsSidebarProps {
  currentSlug?: string;
  showBackButton?: boolean;
}

export type PostWithRelations = Post & {
  author: User;
  tags: Tag[];
};

export type BlogClientProps = {
  posts: PostWithRelations[];
  avatar: string | undefined;
  profile: any;
};