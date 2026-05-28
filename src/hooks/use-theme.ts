"use client";

import { useState, useEffect, useCallback } from "react";

const THEME_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    const initial = stored ?? getSystemTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? "dark" : "light");
        applyTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme, mounted };
}
