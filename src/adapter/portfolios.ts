import type { Portfolio } from "./types";
import { PORTFOLIOS_SERVICE } from "./constants";
const { origin, apiPathTemplate, limit } = PORTFOLIOS_SERVICE;

/**
 * query portfolios
 * @param lang 
 * @returns 
 */
export async function getPortfolios(lang: string): Promise<{ success: boolean; data: Portfolio[]; message?: string }> {
  try {
    const apiPath = apiPathTemplate.replace("{locale}", lang);
    const response = await fetch(`${origin}${apiPath}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolios: ${response.statusText}`);
    }

    const data = (await response.json()) as Portfolio[];
    const sliced = data.slice(0, limit);

    return {
      success: true,
      data: sliced.map((item) => ({
        ...item,
        previewUrl: normalizeUrl(item.previewUrl),
        webUrl: normalizeUrl(item.webUrl),
        sourceUrl: normalizeUrl(item.sourceUrl),
      })),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[adapter.portfolios] getPortfolios:", message);
    return { success: false, data: [], message };
  }
}

function normalizeUrl(url: string): string {
  return url.startsWith("/") ? `${origin}${url}` : url;
}
