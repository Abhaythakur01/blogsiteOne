import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

const categoryColorMap: Record<string, { bg: string; text: string }> = {
  "bg-blue-500": { bg: "#eff6ff", text: "#2563eb" },
  "bg-red-500": { bg: "#fef2f2", text: "#dc2626" },
  "bg-green-500": { bg: "#f0fdf4", text: "#16a34a" },
  "bg-yellow-500": { bg: "#fefce8", text: "#ca8a04" },
  "bg-purple-500": { bg: "#faf5ff", text: "#9333ea" },
  "bg-pink-500": { bg: "#fdf2f8", text: "#db2777" },
  "bg-indigo-500": { bg: "#eef2ff", text: "#4f46e5" },
  "bg-orange-500": { bg: "#fff7ed", text: "#ea580c" },
  "bg-teal-500": { bg: "#f0fdfa", text: "#0d9488" },
  "bg-cyan-500": { bg: "#ecfeff", text: "#0891b2" },
};

export function getCategoryColors(colorClass?: string): { bg: string; text: string } | null {
  if (!colorClass || !categoryColorMap[colorClass]) return null;
  return categoryColorMap[colorClass];
}
