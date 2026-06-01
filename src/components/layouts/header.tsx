"use client";

import { useState, useEffect, useRef } from "react";
import { Home, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import { SOCIAL_LINKS } from "@/constants";
import Link from "next/link";

function NavLinks() {
  const t = useTranslations("Header");

  return (
    <nav className="hidden sm:flex items-center gap-4 text-sm font-label-caps text-on-surface-variant">
      <a href={SOCIAL_LINKS.work.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        {t("work")}
      </a>
      <span className="w-1 h-1 rounded-[1px] bg-surface-variant" aria-hidden="true" />
      <a href={SOCIAL_LINKS.blog.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        {t("blog")}
      </a>
    </nav>
  );
}

function Toolbar() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
      <LocaleSwitch />
    </>
  );
}

export function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          menuOpen 
            ? "bg-transparent border-transparent" 
            : scrolled 
              ? "bg-background/95 backdrop-blur-md border-b border-surface-variant/50 shadow-sm" 
              : "bg-background/90 backdrop-blur-md border-b border-surface-variant/30"
        }`}
      >
     
        <div className={`mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-16 sm:h-20"
        }`}>
          {/* Left: Home icon + Nav links */}
          <div className="flex items-center gap-12">
            <Link href="/" aria-label="Dax - Home" className="text-on-surface flex items-center">
              <Home size={20} />
            </Link>
            <NavLinks />
          </div>

          {/* Right: Toolbar (PC) / Menu (Mobile) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <Toolbar />
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden w-8 h-8 flex items-center justify-center text-on-surface-variant cursor-pointer z-50"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg sm:hidden flex flex-col items-center justify-center gap-8">
          <a
            href={SOCIAL_LINKS.work.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-display-lg text-2xl text-on-surface hover:text-primary transition-colors"
          >
            {t("work")}
          </a>
          <a
            href={SOCIAL_LINKS.blog.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-display-lg text-2xl text-on-surface hover:text-primary transition-colors"
          >
            {t("blog")}
          </a>
          <div className="flex items-center gap-6 mt-4">
            <Toolbar />
          </div>
        </div>
      )}
    </>
  );
}