import ClientLayout from "@/components/core/client-layout";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
 
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
 
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
  return (
    <html lang="en" className={`font-sans ${geist.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}