// components/scroll-reveal.tsx
"use client";

import { type ReactNode, type CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold,
  rootMargin,
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ threshold, rootMargin });

  // Use inline style for delay to avoid first-frame flash from useEffect
  const style: CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div ref={ref} className={`reveal-up ${className}`} style={style}>
      {children}
    </div>
  );
}
