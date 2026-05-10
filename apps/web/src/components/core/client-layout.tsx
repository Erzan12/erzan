"use client";

import Navbar from "@/components/core/navbar/navbar";
import Footer from "@/components/core/footer";
import { ThemeProvider } from "@/components/dark-mode-toggle/theme-provider";
import Providers from "@/components/providers";
import { usePathname } from "next/navigation";
import { routeThemes } from "@/lib/constants/themes";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const activeKey =
    Object.keys(routeThemes).find((route) => pathname.startsWith(route)) ||
    "default";

  const themeClass = routeThemes[activeKey].split(" ")[0];

  return (
    <div className={cn("transition-colors duration-500 min-h-screen", themeClass)}>
      <ThemeProvider>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </ThemeProvider>
    </div>
  );
}