---
title: "我的第一篇博客"
date: "2026-06-14"
tags: ["技术", "前端"]
summary: "这是一篇关于如何搭建博客的文章，使用 Astro + Tailwind CSS 构建。"
series: "博客搭建"
series_description: "从零开始搭建一个个人博客网站的全过程记录，包括技术选型、设计和部署。"
---

## 为什么选择 Astro

Astro 是一个现代化的静态网站生成器，它具有以下优点：

- **零 JavaScript 输出**：默认情况下，Astro 不会向客户端发送任何 JavaScript
- **多框架支持**：可以在同一个项目中使用 React、Vue、Svelte 等框架
- **Markdown 原生支持**：内置对 Markdown 和 MDX 的支持
- **Content Collections**：提供类型安全的内容管理

## 搭建步骤

### 1. 初始化项目

```bash
npm create astro@latest my-blog
```

### 2. 安装 Tailwind CSS

```bash
npx astro add tailwind
```

### 3. 配置内容集合

在 `src/content/config.ts` 中定义你的文章 schema：

```ts
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

export const collections = { posts };
```

### 4. 编写文章

在 `src/content/posts/` 目录下创建 Markdown 文件，使用 frontmatter 定义元数据。

## 部署

使用 Vercel 部署非常简单：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动检测 Astro 项目并配置构建设置
4. 部署完成

> "简洁是智慧的灵魂，冗长是肤浅的藻饰。" —— 莎士比亚

这就是我搭建博客的过程，希望对你有所帮助。
