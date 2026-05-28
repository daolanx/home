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

  // 将 delay 直接作为内联样式，避免 useEffect 设置导致的首帧闪烁
  const style: CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div ref={ref} className={`reveal-up ${className}`} style={style}>
      {children}
    </div>
  );
}
