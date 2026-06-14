---
title: "使用 OpenNext 将 Next.js 部署到 Cloudflare Workers：注意事项与实战经验"
description: "在官方 Getting Started 基础上，总结使用 OpenNext 将 Next.js 部署到 Cloudflare Workers 时需要注意的关键问题和实战经验。"
date: "2026-06-02"
tags: ["Next.js", "Cloudflare", "OpenNext", "Deployment"]
---

## 前言

OpenNext 提供了官方的 [Getting Started 指南](https://opennext.js.org/cloudflare/get-started)，涵盖了安装、配置、部署的基本流程。本文不再重复这些内容，而是分享在实际项目中使用 OpenNext 时需要注意的细节和踩过的坑。

## 1. package.json 配置

### 依赖项

安装两个核心依赖：

```json
{
  "dependencies": {
    "@opennextjs/cloudflare": "1.14.0",
    "next": "16.0.7"
  },
  "devDependencies": {
    "wrangler": "4.56.0"
  }
}
```

- **`@opennextjs/cloudflare`**：核心适配器，负责将 Next.js 构建产物转换为 Cloudflare Worker 格式
- **`next`**：Next.js 框架本身
- **`wrangler`**：Cloudflare Workers CLI，用于部署（版本必须 ≥ 3.99.0）

### 脚本配置

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv env.d.ts"
  }
}
```

几个关键脚本的含义：

- **`pnpm dev`**：本地开发服务器，使用 Next.js 的开发模式，热更新快。`next.config.ts` 中的 `initOpenNextCloudflareForDev()` 会桥接 Cloudflare bindings。
- **`pnpm build`**：标准 Next.js 构建，生成 `.next/` 目录。这是 `preview` 和 `deploy` 的前置步骤。
- **`pnpm preview`**：先执行 `opennextjs-cloudflare build` 生成 Worker 格式产物，然后本地模拟 Cloudflare Worker 环境运行。用于发布前验证兼容性。
- **`pnpm deploy`**：先构建，然后部署到 Cloudflare Workers。生产环境使用。
- **`pnpm cf-typegen`**：从 `wrangler.jsonc` 生成 TypeScript 类型定义到 `env.d.ts`，确保 Cloudflare bindings 有类型提示。

## 2. 本地开发 vs 预览：两种模式

OpenNext 提供了两种本地运行方式：

| 模式 | 命令 | 用途 |
|------|------|------|
| 开发模式 | `pnpm dev` | 日常开发，热更新快 |
| 预览模式 | `pnpm preview` | 发布前验证，模拟真实 Worker 环境 |

**建议**：日常开发用 `pnpm dev`，发布前用 `pnpm preview` 验证一下。预览模式会真正模拟 Cloudflare 的运行时环境，能发现一些开发模式下不会出现的问题。

## 3. 图片优化：必须自定义 Loader

Cloudflare Workers 无法运行 Sharp（Next.js 默认的图片优化库），所以你需要提供自定义的图片加载器：

```ts
// src/lib/image-loader.ts
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const params = new URLSearchParams();
  params.set("w", String(width));
  if (quality) params.set("q", String(quality));
  return `${src}?${params.toString()}`;
}
```

然后在 `next.config.ts` 中配置：

```ts
images: {
  loader: "custom",
  loaderFile: "./src/lib/image-loader.ts",
}
```

图片请求会通过 Cloudflare 的 `/cdn-cgi/image/` 管线处理优化，而不是 Next.js 的原生优化器。

## 4. `nodejs_compat` 是必须的

`wrangler.jsonc` 中的 `compatibility_flags` 必须包含 `nodejs_compat`。OpenNext 依赖它来 polyfill Node.js API，特别是 `AsyncLocalStorage`（用于请求上下文管理）。

```jsonc
{
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"]
}
```

如果忘记启用这个标志，部署后会遇到各种运行时错误。

## 5. 环境变量的处理

Cloudflare Workers 的环境变量需要通过 `wrangler.jsonc` 配置，而不是 `.env` 文件。本地开发时，可以用 `.dev.vars` 文件模拟：

```
NEXTJS_ENV=development
```

注意：`.dev.vars` 中的变量在 `pnpm preview` 时才会生效，`pnpm dev` 时不会加载。

## 6. Middleware 的特殊行为

Next.js Middleware 在 Cloudflare Workers 中运行时有一些限制：

- 不能使用 Node.js 特有的 API
- 运行时是 V8 引擎，不是 Node.js
- 某些 npm 包可能不兼容

如果你的 Middleware 做了复杂操作（比如 i18n 路由、认证检查），需要确保代码在 Edge Runtime 下也能正常运行。

## 7. TypeScript 类型生成

运行 `pnpm cf-typegen` 可以从 `wrangler.jsonc` 生成 Cloudflare 环境类型。这会更新 `env.d.ts` 文件，让你在代码中获得类型提示。

```ts
// 使用 Cloudflare bindings 时会有类型提示
export default async function handler(request: Request, env: CloudflareEnv) {
  // env.ASSETS 等会有类型定义
}
```

## 8. 构建产物

`opennextjs-cloudflare build` 会生成 `.open-next/` 目录，包含：

- `worker.js`：主入口文件
- `assets/`：静态资源
- `cloudflare/init.js`：运行时初始化
- `middleware/handler.mjs`：Middleware 处理器

这个目录应该加入 `.gitignore`，每次部署都会重新生成。

## 9. 部署后的缓存策略

默认情况下，OpenNext 使用内存缓存。如果你需要持久化缓存（比如 ISR 页面），可以配置 R2 存储桶：

```ts
// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

然后在 `wrangler.jsonc` 中添加 R2 绑定。

## 10. 静态资源缓存

在 `public/_headers` 中为 Next.js 静态资源设置长期缓存：

```
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
```

这可以显著提升页面加载速度。

## 11. 常见问题排查

**部署后页面 404**
- 检查 `wrangler.jsonc` 中的 `main` 和 `assets` 路径是否正确
- 确认 `nodejs_compat` 已启用

**图片无法加载**
- 确认自定义 loader 已配置
- 检查图片路径是否正确

**Middleware 不执行**
- 确认没有 `export const runtime = "edge"` 的代码
- 检查 Middleware 是否使用了不兼容的 API

**本地开发报错**
- 确认 `initOpenNextCloudflareForDev()` 已在 `next.config.ts` 底部调用
- 检查 `.dev.vars` 文件是否存在

## 总结

OpenNext 让 Next.js 部署到 Cloudflare Workers 变得简单，但需要注意图片优化、环境变量、Middleware 兼容性等细节。建议在开发过程中：

1. 日常用 `pnpm dev`，发布前用 `pnpm preview`
2. 图片一定要用自定义 loader
3. 确保 `nodejs_compat` 已启用
4. 生成 TypeScript 类型以获得更好的开发体验

如果你有其他经验或问题，欢迎交流。