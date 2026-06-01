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

  const languagesMap = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_ORIGIN}/${locale}${cleanPath}`])
  );

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
    // Root domain entry (https://daolanx.com redirects to /en)
    {
      url: SITE_ORIGIN,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${SITE_ORIGIN}/${locale}`])
        ),
      },
    },

    // All locale variants of the homepage
    ...createI18nEntries("/", 1.0, "weekly"),

    // Future pages — uncomment when ready:
    // ...createI18nEntries("/tools", 0.8),
    // ...createI18nEntries("/about", 0.5),
  ];
}
