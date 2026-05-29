export interface Portfolio {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  previewUrl: string;
  webUrl: string;
  sourceUrl: string;
  isDeveloping: boolean;
}

const API_DOMAIN = "https://demo.daolanx.com";

function normalizeUrl(url: string): string {
  if (url.startsWith("/")) {
    return `${API_DOMAIN}${url}`;
  }
  return url;
}

export async function getPortfolios(lang: string = "en"): Promise<Portfolio[]> {
  const response = await fetch(`${API_DOMAIN}/api/public/portfolios?lang=${lang}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch portfolios: ${response.statusText}`);
  }

  const data = await response.json() as Portfolio[];

  // Process relative paths, add full domain
  return data.map((item: Portfolio) => ({
    ...item,
    previewUrl: normalizeUrl(item.previewUrl),
    webUrl: normalizeUrl(item.webUrl),
    sourceUrl: normalizeUrl(item.sourceUrl),
  }));
}
