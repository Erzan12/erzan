"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import { useState } from "react";
import { SiGithub, SiGoogle } from "react-icons/si";

export default function GuestLoginButton() {
  const [name, setName] = useState("");
  const [email, setPassword] = useState("");

  const loginWithCredentials = async () => {
    await signIn("guest-login", {
      name,
      email,
      callbackUrl: "/",
    });
  };
  
  return (
    <div className="py-10 flex flex-col items-center justify-center gap-4">
      {/* <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button 
        onClick={loginWithCredentials}
        className="mt-4 inline-flex items-center gap-2 px-15 py-3 bg-slate-400 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-95"
      >
        Login as Guest
      </button> */}

      <button
        onClick={() => signIn("github")} // It will auto-redirect back to the same page after login
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-95"
      >
        <SiGithub size={18} />
        Continue with GitHub
      </button>

      <button
        onClick={() =>
          signIn("google", { callbackUrl: "/" })
        }
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-red-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-95"
      >
        <SiGoogle size={18} />
        Continue with Google
      </button>
    </div>
  );
}