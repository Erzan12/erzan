import ClientLayout from "@/components/core/client-layout";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erzan | Full Stack Developer",
  description: "Backend-focused developer building scalable systems",
  icons: {
    icon: "/favicon-light.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}