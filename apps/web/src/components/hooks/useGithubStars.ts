"use client";

import { useEffect, useState } from "react";

export function useGithubStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/github-stars?repo=${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stars === "number") {
          setStars(data.stars);
        } else {
          setStars(0);
        }
      })
      .catch((error) => setStars(error));
  }, [repo]);

  return stars;
}