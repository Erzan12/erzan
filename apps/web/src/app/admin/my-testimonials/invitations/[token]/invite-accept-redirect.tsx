"use client";

import { useEffect } from "react";

/**
 * Server redirect() cannot rely on URL fragments: many stacks omit `#...`
 * from the HTTP Location header, so the browser never scrolls to the section.
 * A client-side navigation preserves hash and triggers native scroll-to-id.
 */
export default function InviteAcceptRedirect({ token }: { token: string }) {
  useEffect(() => {
    const url = new URL("/", window.location.origin);
    // url.searchParams.set("token", token);
    // url.hash = "testimonials";
    window.location.href = "/#testimonials";
    window.location.replace(url.toString());
  }, [token]);

  return (
    <div className="mx-auto max-w-md p-10 text-center text-slate-600 dark:text-slate-400">
      <p className="text-sm">Taking you to the testimonial form…</p>
    </div>
  );
}
