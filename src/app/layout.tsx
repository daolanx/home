import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk, Space_Mono, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  description: "Freelance Frontend Developer & Indie Developer. Building exceptional web experiences with React, Next.js, and TypeScript.",
  keywords: ["frontend developer", "freelance developer", "React", "Next.js", "TypeScript", "web developer", "Hangzhou"],
  authors: [{ name: "Dax" }],
  creator: "Dax",
  publisher: "Dax",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dax.studio",
    title: "Dax | Freelance Frontend Developer",
    description: "Freelance Frontend Developer & Indie Developer. Building exceptional web experiences.",
    siteName: "Dax",
  },
  twitter: {
    card: "summary",
    title: "Dax | Freelance Frontend Developer",
    description: "Freelance Frontend Developer & Indie Developer.",
    creator: "@daolanx",
  },
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
