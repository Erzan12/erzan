import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");

  // console.log("Repo received:", repo); // DEBUG
  if (!repo) {
    return NextResponse.json({ stars: 0});
  }

  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  const data = await res.json();

  // console.log("GitHub response:", data); // DEBUG

  return NextResponse.json({
    stars: data.stargazers_count ?? 0,
  });
}