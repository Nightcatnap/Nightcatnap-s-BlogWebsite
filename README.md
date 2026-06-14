# 个人博客网站

基于 [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) 构建的个人技术/生活博客。

## 技术栈

- **框架**: Astro 4.x
- **样式**: Tailwind CSS 3.x
- **内容**: Markdown (Content Collections)
- **代码高亮**: Shiki (Astro 内置)
- **搜索**: Fuse.js (客户端全文搜索)
- **部署**: Vercel

## 功能

- 个人门户首页（Hero、专栏导航、最新文章）
- Markdown 文章渲染 + 代码语法高亮
- 专栏/系列聚合
- 标签系统
- 文章归档（按年份）
- 暗色/亮色模式切换
- 响应式设计（移动端适配）
- RSS 订阅
- 全文搜索
- SEO 优化（Open Graph、Canonical）
- 文章内目录（TOC）

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
├── src/
│   ├── components/     # UI 组件
│   ├── content/        # Markdown 文章
│   │   ├── config.ts   # Content Collections 配置
│   │   └── posts/      # 文章目录
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── styles/         # 全局样式
│   └── utils/          # 工具函数
├── public/             # 静态资源
├── astro.config.mjs    # Astro 配置
└── tailwind.config.mjs # Tailwind 配置
```

## 编写文章

在 `src/content/posts/` 下创建 `.md` 文件，frontmatter 格式：

```md
---
title: "文章标题"
date: "2026-06-14"
tags: ["标签1", "标签2"]
summary: "文章摘要"
series: "专栏名称（可选）"
series_description: "专栏描述（可选）"
updated: "2026-06-15（可选）"
---

文章正文...
```

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入该仓库
3. Vercel 会自动检测 Astro 项目，无需额外配置
4. 点击 Deploy 即可

构建命令：`npm run build`
输出目录：`dist`
