import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.github.com/users/Erzan12", {
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json({
    avatar: data.avatar_url,
    name: data.name,
    bio: data.bio,
  });
}