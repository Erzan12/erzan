"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGitHub = () => {
    signIn("github", { callbackUrl: "/admin" });
  };

  const loginWithCredentials = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <button onClick={loginWithGitHub}>
        Sign in with GitHub
      </button>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginWithCredentials}>
        Login with Email
      </button>
    </div>
  );
}