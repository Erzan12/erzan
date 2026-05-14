"use client";

import { useEffect } from "react";

export default function InviteAcceptRedirect({
  token,
}: {
  token: string;
}) {
  useEffect(() => {
    const url = new URL("/", window.location.origin);

    // IMPORTANT
    url.searchParams.set("token", token);

    // Scroll target
    url.hash = "testimonials";

    window.location.replace(url.toString());
  }, [token]);

  return (
    <div className="mx-auto max-w-md p-10 text-center text-slate-600 dark:text-slate-400">
      <p className="text-sm">Taking you to the testimonial form…</p>
    </div>
  );
}