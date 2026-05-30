import type { Metadata, Viewport } from "next";
import { Playfair_Display, Hanken_Grotesk, Space_Mono, Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
import { getMeta, SITE_ORIGIN, SOCIAL_LINKS, UMAMI_WEBSITE_ID } from '@/constants';
import "../globals.css";

// ── Fonts ────────────────────────────────────────────────────────────────────

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "optional",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "optional",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-space-mono",
  display: "optional",
 });

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "optional",
});

const fontClass = [
  playfairDisplay.variable,
  hankenGrotesk.variable,
  spaceMono.variable,
  geist.variable,
].join(" ");

// ── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = getMeta(locale);

  return {
    title: { default: m.title, template: "%s | Dax" },
    description: m.description,
    keywords: [...m.keywords],
    authors: [{ name: "Dax" }],
    creator: "Dax",
    publisher: "Dax",
    metadataBase: new URL(SITE_ORIGIN),
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.png", 
    },
    openGraph: {
      type: "website",
      locale: m.locale,
      url: SITE_ORIGIN,
      title: m.title,
      description: m.shortDescription,
      siteName: "Dax",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.shortDescription,
      creator: "@daolanx",
    },
  };
}

// ── Layout ───────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const m = getMeta(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dax",
    url: SITE_ORIGIN,
    jobTitle: m.jobTitle,
    description: m.shortDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Singapore", 
      addressCountry: "SG",
    },
    sameAs: Object.values(SOCIAL_LINKS).map((link) => link.href),
  };

  return (
    <html lang={locale} className={fontClass}>
      <head>
      
        <link rel="preconnect" href="https://cloud.umami.is" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        
       
        <Script
          strategy="lazyOnload"
          src="https://cloud.umami.is/script.js"
          data-website-id={UMAMI_WEBSITE_ID}
        />
      </body>
    </html>
  );
}