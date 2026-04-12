"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function LoginPage() {
    const supabase = createClient();

    const loginWithGitHub = async () => {
        const client = await supabase;
        await client.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="p-8 border border-border rounded-3x1 bg-olive-about-card/20 max-w-sm w-full text-center">
                <h1 className="text-2x1 font-bold mb-2">Admin Access</h1>
                <p className="text-sm text-muted-foreground mb-8">Mission Log Control Center</p>
                <Button onClick={loginWithGitHub} className="w-full gap-2">
                    <Github className="w-4 h-4" />
                    Sign in with GitHub
                </Button>
            </div>
        </div>
    )
}