export const SITE_ORIGIN = "https://daolanx.com";

const SITE_META = {
  zh: {
    title: "Dax | 前端独立开发者",
    description:
      "前端独立开发者，专注于 React、Next.js、TypeScript 等现代技术栈，构建优雅、高性能的 Web 体验。位于杭州。",
    shortDescription:
      "前端独立开发者，专注于 React、Next.js、TypeScript，构建优雅高性能的 Web 体验。",
    locale: "zh_CN" as const,
    jobTitle: "前端独立开发者",
    keywords: ["前端开发者", "独立开发者", "React", "Next.js", "TypeScript", "杭州"],
  },
  en: {
    title: "Dax | Freelance Frontend Developer",
    description:
      "Freelance frontend developer specializing in React, Next.js, TypeScript, building elegant and high-performance web experiences. Based in Hangzhou.",
    shortDescription:
      "Freelance frontend developer specializing in React, Next.js, TypeScript, building elegant high-performance web experiences.",
    locale: "en_US" as const,
    jobTitle: "Freelance Frontend Developer",
    keywords: [
      "frontend developer",
      "freelance developer",
      "React",
      "Next.js",
      "TypeScript",
      "Hangzhou",
    ],
  },
} as const;

export function getMeta(locale: string) {
  return SITE_META[locale === "zh" ? "zh" : "en"];
}

export const SOCIAL_LINKS = {
  twitter: { label: "Twitter",  icon: "tag",  href: "https://x.com/daolanx", external: true },
  github: { label: "GitHub", icon: "code", href: "https://github.com/daolanx", external: true  },
  blog: { label: "Blog",  href: "https://daolanx.me", external: true  },
  work: { label: "Work", href: "https://demo.daolanx.com", external: true  },
  email: { label: "Email", icon: "mail", href: "mailto:daolanx.dev@gmail.com", external: false },
};

export const UMAMI_WEBSITE_ID = "2008e087-18a7-43de-8901-4f580e9ddabc";
