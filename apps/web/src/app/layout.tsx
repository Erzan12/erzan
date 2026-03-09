import "./globals.css"
import Navbar from "@/components/navbar"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  )
}