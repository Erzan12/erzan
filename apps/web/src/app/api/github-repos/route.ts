import { GitHubApiRepo, Repo } from "@/lib/types/github-repo";
import { NextResponse } from "next/server";

// export async function GET() {
    
//     const res = await fetch("https://api.github.com/users/Erzan12/repos", {
//         // headers: {
//         //     Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//         // },
//         // next: { revalidate: 30, tags: ["github-repos"] }, // tag it cache for 1 hour -> 3600
//         cache: "no-store"
//     });

//     const data = await res.json();

//     // check: ensure data is an array before processing
//     if (!Array.isArray(data)) {
//         console.error("GitHub API Error:", data); //this will show you the exact error in your terminal
//         return NextResponse.json({ repos: [] }); //return an empty array gracefully
//     }

//     console.log("GitHub response:", data); // DEBUG
    
//     //to not include fork repos
//     const repos = data
//        .filter((repo: GitHubApiRepo) => !repo.fork)
//        .map((repo: GitHubApiRepo): Repo => ({
//         id: repo.id,
//         name: repo.name,
//         description: repo.description,
//         stars: repo.stargazers_count,
//         forks: repo.forks_count,
//         language: repo.language,
//         pushed_at: repo.pushed_at,
//         html_url: repo.html_url,
//     }));


//     return NextResponse.json({ repos });
// }

export async function GET() {
  const res = await fetch("https://api.github.com/users/Erzan12/repos", {
    cache: "no-store", // keep this for fresh data
  });

  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("GitHub API Error:", data);
    return NextResponse.json({ repos: [] });
  }

  const repos = data
    .filter((repo: any) => !repo.fork)
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      pushed_at: repo.pushed_at,
      html_url: repo.html_url,
    }));

  return NextResponse.json({ repos });
}