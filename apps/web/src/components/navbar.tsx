import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-semibold text-lg">
                    erzan.dev
                </Link>
                <div className="flex gap-6 text-sm"> 
                    <Link href="/projects">Project</Link>
                    <Link href="/system-design">System Design</Link>
                    <a href="https://docs.erzan.dev" target="blank">Docs</a>
                    <a href="https://github.com/Erzan12" target="blank">Github</a>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}