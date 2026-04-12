import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// This is your existing Shadcn utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- ADD YOUR NEW HELPER HERE ---
export function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 225);
  return `${minutes} min read`;
}