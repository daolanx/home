"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#skills", label: "Skills" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-surface-variant/50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-sm"
          : "bg-background/90"
      }`}
    >
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 h-20">
        {/* Brand Logo */}
        <a className="font-display-lg text-xl md:text-2xl font-bold text-on-surface tracking-tight flex items-center gap-2" href="#">
          <span className="w-2 h-2 bg-primary" />
          DevPortfolio
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-on-surface transition-all duration-300 ease-in-out mb-1.5 ${
              menuOpen ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-on-surface transition-opacity duration-300 ease-in-out mb-1.5 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-on-surface transition-all duration-300 ease-in-out ${
              menuOpen ? "translate-y-[-8px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors duration-200"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-2 mr-4 border-r border-surface-variant pr-4">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">light_mode</span>
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center font-label-caps text-[10px] text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
              EN
            </button>
          </div>
          <a className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary font-label-caps text-xs hover:bg-primary hover:text-on-primary transition-colors duration-200 group" href="#">
            Resume
            <span className="material-symbols-outlined ml-2 text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-20 bg-background border-b border-surface-variant shadow-lg md:hidden z-40 flex flex-col p-6 gap-6 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="font-headline-lg text-2xl text-on-surface hover:text-primary transition-colors"
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between pt-6 border-t border-surface-variant">
          <div className="flex gap-4">
            <button className="w-10 h-10 border border-surface-variant rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">light_mode</span>
            </button>
            <button className="w-10 h-10 border border-surface-variant rounded-full flex items-center justify-center font-label-caps text-[12px] text-on-surface hover:bg-surface-container transition-colors">
              EN
            </button>
          </div>
          <a className="inline-flex items-center justify-center px-6 py-2 bg-primary text-on-primary font-label-caps text-xs transition-colors duration-200" href="#">
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
