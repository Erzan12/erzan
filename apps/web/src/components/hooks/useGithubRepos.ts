"use client";

import { useEffect, useState } from "react";

export function useGithubRepos() {
    const [repos, setRepos] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/github-repos")
        .then((res) => res.json())
        .then((data) => setRepos(data.repos))
        .catch(() => setRepos([null]));
    }, []);

    return { repos };
}