import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk, Space_Mono, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Dax | Freelance Frontend Developer",
    template: "%s | Dax",
  },
  description: "Dax - 前端独立开发者，专注于 React、Next.js、TypeScript 等现代技术栈，构建优雅、高性能的 Web 体验。位于杭州。",
  keywords: ["frontend developer", "freelance developer", "React", "Next.js", "TypeScript", "web developer", "Hangzhou", "前端开发者", "独立开发者"],
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
    locale: "zh_CN",
    url: siteUrl,
    title: "Dax | Freelance Frontend Developer",
    description: "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。",
    siteName: "Dax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dax | Freelance Frontend Developer",
    description: "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。",
    creator: "@daolanx",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dax",
  url: siteUrl,
  jobTitle: "Freelance Frontend Developer",
  description: "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${playfairDisplay.variable} ${hankenGrotesk.variable} ${spaceMono.variable} ${geist.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
        {children}
        	
      </body>
      
    </html>
  );
}
