"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { SiGithub, SiGoogle } from "react-icons/si";
import { useRouter } from "next/navigation";

export default function GuestLoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     const role = (session?.user as any)?.role;
  //     if (role === "ADMINISTRATOR") {
  //       router.replace("/admin");
  //     } else {
  //       router.replace("/");
  //     }
  //   }
  // }, [status, session, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const role = session?.user?.role ?? "GUEST";

    if (role === "ADMINISTRATOR") {
      router.replace("/admin");
    } else {
      router.replace("/");
    }
  }, [status]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="py-10 flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => signIn("github")} // It will auto-redirect back to the same page after login
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-95"
      >
        <SiGithub size={18} />
        Continue with GitHub
      </button>

      <button
        onClick={() => signIn("google")}
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-red-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-95"
      >
        <SiGoogle size={18} />
        Continue with Google
      </button>
    </div>
  );
}