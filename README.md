# blog

这是我的个人技术博客，用 Nuxt 4 和 Nuxt Content 3 搭建。平时写一些前端开发相关的文章，记录学习过程中遇到的问题和解决方案。

主要功能：
- Markdown 写作，支持代码高亮
- 响应式设计，手机电脑都能看
- SSR/SSG 渲染，加载速度快
- 自动部署，提交代码后自动更新

## 用到的技术

- **Nuxt 4** - Vue 的全栈框架
- **Vue 3** - 前端框架
- **Nuxt Content 3** - 管理 Markdown 内容
- **Tailwind CSS 4** - 样式框架
- **TypeScript** - 类型安全

## 本地运行

需要 Node.js 18+ 和 pnpm

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 打包
pnpm build
```

开发服务器默认在 http://localhost:3000

## 怎么写文章

在 `content/blog/` 目录下新建 `.md` 文件，开头写上这些信息：

```markdown
---
title: "文章标题"
description: "简短描述"
date: "2025-02-10"
tags: ["Nuxt", "Vue"]
---

正文内容，支持 Markdown 语法
```

## 项目目录说明

```
blog/
├── assets/css/     # 全局样式
├── components/     # 可复用组件
├── content/blog/   # 博客文章（Markdown）
├── layouts/        # 页面布局
├── pages/          # 页面路由
├── public/         # 静态资源
└── types/          # TypeScript 类型
```

## 一些问题

**为什么选 Nuxt Content？**

因为想把文章内容放在 Git 里管理，不用连接数据库，部署也方便。Markdown 格式通用，以后想迁移也容易。

**样式怎么设计的？**

尽量简洁，黑白色调为主， amber 色做点缀。不喜欢那种花里胡哨的渐变和圆角。

## 联系我

- GitHub: https://github.com/dandan812
- 邮箱: hu_liang2027@163.com

有问题欢迎提 Issue 或者发邮件。
