"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "font-ananda bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-400 bg-clip-text text-transparent",
        "inline-block py-1 leading-relaxed",
        "tracking-wide",
        className
      )}
    >
      {children}
    </span>
  );
}
