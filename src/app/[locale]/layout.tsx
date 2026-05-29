import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk, Space_Mono, Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
import "../globals.css";

const siteUrl = "https://dax.studio";

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
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  return {
    title: {
      default: isZh ? "Dax | 前端独立开发者" : "Dax | Freelance Frontend Developer",
      template: isZh ? "%s | Dax" : "%s | Dax",
    },
    description: isZh
      ? "前端独立开发者，专注于 React、Next.js、TypeScript 等现代技术栈，构建优雅、高性能的 Web 体验。位于杭州。"
      : "Freelance frontend developer specializing in React, Next.js, TypeScript, building elegant and high-performance web experiences. Based in Hangzhou.",
    keywords: isZh
      ? ["前端开发者", "独立开发者", "React", "Next.js", "TypeScript", "杭州"]
      : ["frontend developer", "freelance developer", "React", "Next.js", "TypeScript", "Hangzhou"],
    authors: [{ name: "Dax" }],
    creator: "Dax",
    publisher: "Dax",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: isZh ? "zh_CN" : "en_US",
      url: siteUrl,
      title: isZh ? "Dax | 前端独立开发者" : "Dax | Freelance Frontend Developer",
      description: isZh
        ? "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。"
        : "Freelance frontend developer specializing in React, Next.js, TypeScript, building elegant high-performance web experiences.",
      siteName: "Dax",
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "Dax | 前端独立开发者" : "Dax | Freelance Frontend Developer",
      description: isZh
        ? "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。"
        : "Freelance frontend developer specializing in React, Next.js, TypeScript, building elegant high-performance web experiences.",
      creator: "@daolanx",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isZh = locale === "zh";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dax",
    url: siteUrl,
    jobTitle: isZh ? "前端独立开发者" : "Freelance Frontend Developer",
    description: isZh
      ? "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。"
      : "Freelance frontend developer specializing in React, Next.js, TypeScript, building elegant high-performance web experiences.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hangzhou",
      addressCountry: "CN",
    },
    sameAs: [
      "https://github.com/daolanx",
      "https://twitter.com/daolanx",
    ],
  };

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${hankenGrotesk.variable} ${spaceMono.variable} ${geist.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png+xml" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="2008e087-18a7-43de-8901-4f580e9ddabc"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
