import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/constants";

const LOCALES = ["en", "zh"] as const;

/**
 * Generate individual Sitemap entries for all locale variants of a given path.
 * Ensures /en/path and /zh/path each appear as top-level entries.
 */
function createI18nEntries(
  path: string,
  priority = 0.5,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap {
  const cleanPath = path === "/" ? "" : path;


  const languagesMap: Record<string, string> = {
    "x-default": `${SITE_ORIGIN}${cleanPath === "" ? "/" : cleanPath}`,
  };

  // 动态合并 en 和 zh 的链接
  LOCALES.forEach((locale) => {
    languagesMap[locale] = `${SITE_ORIGIN}/${locale}${cleanPath}`;
  });

  return LOCALES.map((locale) => ({
    url: `${SITE_ORIGIN}/${locale}${cleanPath}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: languagesMap,
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...createI18nEntries("/", 1.0, "weekly"),
  ];
}