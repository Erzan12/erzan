import { NextResponse } from "next/server";

export async function GET() {
    
    const res = await fetch("https://api.github.com/users/Erzan12/repos", {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 } // cache for 1 hour
    });

    const data = await res.json();

    console.log("GitHub response:", data); // DEBUG

    // const repos = data.reduce((acc: any, repo: any) => {
    //     acc[repo.name] = {
    //         stars: repo.stargazers_count,
    //         forks: repo.forks_count,
    //         updated: repo.updated_at,
    //     };
    //     return acc;
    // }, {});
    
    const repos = data.map((repo: any) => ({
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