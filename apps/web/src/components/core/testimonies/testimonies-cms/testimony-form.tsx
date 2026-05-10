"use client"

import { useState, useTransition } from "react";
import { submitTestimonial } from "@/lib/actions/testimonials-cms";
import { Send, CheckCircle2 } from "lucide-react";

export default function TestimonialForm({ userId }: { userId: string }) {
    const [ isPending, startTransition ] = useTransition();
    const [ submitted, setSubmitted ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        const data = {
            name: formData.get("name") as string,
            role: formData.get("role") as string,
            content: formData.get("content") as string,
            userId: userId,
        };

        if (!data.name || !data.content) {
            setError("Please fill in your name and message");
            return;
        }

        startTransition(async () => {
            try {
                await submitTestimonial(data);
                setSubmitted(true);
            } catch (err) {
                setError("Something wen wrong. Please try again");
            }
        });
    }

    if (submitted) {
        return (
            <div className="p-8 text-center bg-white/50 dark:bg-slate-900/40 border border-slate-500/20 rounded-3xl backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank you!</h3>
                <p className="text-slate-500 mt-2 text-sm">Your testimonial has been sent to Erzan for review.</p>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="space-y-4 p-1 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-500/20 focus:ring-2 focus:ring-slate-500/20 outline-none transition-all text-sm"
                />
                <input
                name="role"
                placeholder="Role (e.g. Senior Dev or Client)"
                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-500/20 focus:ring-2 focus:ring-slate-500/20 outline-none transition-all text-sm"
                />
            </div>
            <textarea
                name="content"
                placeholder="Share your experience..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-500/20 focus:ring-2 focus:ring-slate-500/20 outline-none transition-all text-sm resize-none"
            />
            
            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            <button
                disabled={isPending}
                className="group w-full py-3 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
            >
                {isPending ? "Sending..." : "Submit Testimonial"}
                {!isPending && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
        </form>
    );
}