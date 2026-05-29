import { getLocale } from "next-intl/server";
import type { Article } from "./types";
import { ARTICLES_SERVICE } from "./constants";
const { origin, apiPathTemplate, limit } = ARTICLES_SERVICE;

/**
 * query articles
 * @returns 
 */
export async function getArticles(): Promise<{ success: boolean; data: Article[], message?: string }> {
  try {
    const locale = await getLocale();
    const apiPath = apiPathTemplate.replace("{locale}", locale);
    const response = await fetch(`${origin}${apiPath}`, {
       next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const data = await response.json() as Article[];
    return { success: true, data: data.slice(0, limit) };
  } catch(err) {
     const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[adapter.articles] getPortfolios:", message);
    return { success: false, data: [], message };
  }
}

