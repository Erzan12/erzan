import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const prisma = new PrismaClient();
const BLOGS_PATH = path.join(process.cwd(), "docs/blog"); // Adjust path

async function migrate() {
  const files = fs.readdirSync(BLOGS_PATH);

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

    const filePath = path.join(BLOGS_PATH, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    await prisma.post.create({
      data: {
        title: data.title || "Untitled",
        slug: data.slug || file.replace(/\.mdx?$/, ""),
        content: content, // You'll need to decide if you want to store raw MDX or HTML
        published: true,
        authorId: "your-user-id-from-supabase", 
      },
    });
    console.log(`Migrated: ${file}`);
  }
}

migrate();