"use client";

import { useState, useEffect, useRef } from "react";
import { Languages, Home } from "lucide-react";


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-surface-variant/50 transition-all duration-300 ${
        scrolled ? "bg-background/95 shadow-sm" : "bg-background/90"
      }`}
    >
      <div className="flex justify-between items-center  mx-auto px-6  h-16 sm:h-20 ">
        {/* Brand */}
        <a
          href="#"
          className="font-display-lg text-xl md:text-2xl font-bold text-on-surface tracking-tight flex items-center gap-2"
        >
         <Home size={20} />
        </a>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              light_mode
            </span>
          </button>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
            aria-label="Switch language"
          >
            <Languages size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
