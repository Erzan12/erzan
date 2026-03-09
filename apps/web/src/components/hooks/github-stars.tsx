"use client";

import { useEffect, useState } from "react";

export function useGithubStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/github-stars?repo=${repo}`)
      .then((res) => res.json())
      .then((data) => setStars(data.stars))
      .catch(() => setStars(null));
  }, [repo]);

  return stars;
}