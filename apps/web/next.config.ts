import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "orgfmizyhreotvshajda.supabase.co",
      }
    ],
  },

  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "localhost:3001",
  ],
};

export default nextConfig;