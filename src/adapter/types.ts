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

export interface Article {
  title: string;
  date: string;
  tags: string[];
  url: string;
}