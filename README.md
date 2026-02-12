# blog

个人技术博客，用 Nuxt 4 + Nuxt Content 3 搭建的。

支持 Markdown 写作、SSR/SSG 和自动化部署。

**在线地址**: https://blog-eight-gamma-66.vercel.app/

## 技术栈

- Nuxt 4
- Vue 3
- Nuxt Content 3
- Tailwind CSS 4
- TypeScript

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build
```

## 写文章

在 `content/blog/` 目录下新建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2025-02-10"
tags: ["Nuxt", "Vue"]
---

正文内容...
```

## 项目结构

```
blog/
├── assets/        # 样式文件
├── components/    # 组件
├── content/       # Markdown 文章
├── layouts/       # 布局
├── pages/         # 页面
└── types/         # 类型定义
```

## 部署

项目已配置自动部署到 Vercel，推送代码到 main 分支会自动更新。

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel login
vercel --prod
```

详细部署文档见 [DEPLOY.md](./DEPLOY.md)

## 联系方式

- GitHub: [@dandan812](https://github.com/dandan812)
- Email: hu_liang2027@163.com
