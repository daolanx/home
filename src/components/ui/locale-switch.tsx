"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch() {
    const newLocale = locale === "en" ? "zh" : "en";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.replace(segments.join("/"));
  }

  return (
    <button
      onClick={handleSwitch}
      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
      aria-label="Switch language"
    >
      <Languages size={18} />
    </button>
  );
}
