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
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-space-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const fontClass = [
  playfairDisplay.variable,
  hankenGrotesk.variable,
  spaceMono.variable,
  geist.variable,
].join(" ");

// ── Helpers ──────────────────────────────────────────────────────────────────


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
      addressLocality: "Hangzhou",
      addressCountry: "CN",
    },
    sameAs: Object.values(SOCIAL_LINKS).map((link) => link.href),
  };

  return (
    <html lang={locale} className={fontClass}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.png" type="image/png+xml" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
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
