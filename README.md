# Dax Studio

Personal portfolio website for Dax (daolanx), a freelance frontend developer based in Hangzhou, China.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/daolanx/dax-studio)

Live: [https://www.daolanx.com](https://www.daolanx.com)

## Features

- **Portfolio Showcase** - Display projects with filtering, details modal, and remote API integration
- **Blog Aggregation** - Fetch and display articles from remote API with Suspense loading
- **Internationalization** - Full i18n support (English/Chinese) via next-intl
- **Dark/Light Theme** - Toggle between themes with system preference detection
- **Particle Canvas** - Interactive particle background with mouse repulsion effect
- **Responsive Design** - Seamless adaptation across desktop and mobile devices
- **SEO Optimized** - Sitemap, robots.txt, and structured data for search engines

## Tech Stack

| Category | Technology |
| :------- | :--------- |
| Framework | Next.js 16 (App Router) |
| Runtime | Cloudflare Workers (via OpenNext adapter) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 |
| UI | React 19 |
| Animation | Framer Motion |
| Icons | Lucide React |
| i18n | next-intl |

## Architecture

```
src/
├── adapter/           # Data fetching layer (API adapters)
│   ├── articles.ts    # Blog articles adapter
│   ├── portfolios.ts  # Portfolio projects adapter
│   ├── constants.ts   # Remote API constants
│   └── types.ts       # Shared TypeScript types
├── app/
│   └── [locale]/      # i18n routing (en/zh)
│       ├── layout.tsx # Root layout with providers
│       ├── page.tsx   # Homepage
│       └── loading.tsx# Loading state
├── components/
│   ├── layouts/       # Layout components (header, footer)
│   ├── ui/            # Reusable UI components
│   ├── hero.tsx       # Hero section with typing effect
│   ├── portfolios.tsx # Portfolio showcase
│   ├── articles.tsx   # Blog articles list
│   └── contacts.tsx   # Contact section
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization config
├── lib/               # Utility functions
└── messages/          # i18n translation files
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/daolanx/dax-studio.git
cd dax-studio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Commands

| Command | Description |
| :------ | :---------- |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview build locally |
| `pnpm deploy` | Deploy to Cloudflare Workers |
| `pnpm lint` | Run ESLint |
| `pnpm check` | Run build + TypeScript check |
| `pnpm cf-typegen` | Generate Cloudflare types |

## Deployment

The site is deployed to Cloudflare Workers via the OpenNext adapter. Pushing to the `main` branch triggers automatic deployment.

### Manual Deployment

```bash
pnpm deploy
```

## License

MIT
