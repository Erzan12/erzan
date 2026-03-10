"use client";

import { useEffect, useState } from "react";

export function useGithubRepos() {
    const [repos, setRepos] = useState<any>(null);

    useEffect(() => {
        fetch("/api/github-repos")
        .then((res) => res.json())
        .then((data) => setRepos(data))
        .catch(() => setRepos(null));
    }, []);

    return repos;
}