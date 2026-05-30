"use client";

import { useState, useEffect, useRef } from "react";
import { Home, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef(0);
  const { theme, toggleTheme, mounted } = useTheme();

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
        <Link
          href="/"
          aria-label="Dax - Home"
          className="font-display-lg text-xl md:text-2xl font-bold text-on-surface tracking-tight flex items-center gap-2"
        >
         <Home size={20} />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <LocaleSwitch />
        </div>
      </div>
    </header>
  );
}
