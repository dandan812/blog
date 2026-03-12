---
title: "从 0 到上线：我的 Nuxt 4 技术博客架构拆解"
description: "记录一个前端实习生如何用 Nuxt 4 + Vue 3 搭建个人技术博客，包含设计思路、架构选择和踩坑经验"
date: "2026-02-12"
tags: ["Nuxt 4", "Vue 3", "前端工程", "技术博客"]
category: "前端开发"
readingTime: 10
---

作为一个前端开发实习生，我最近完成了一个 **基于 Nuxt 4 + Vue 3 的个人技术博客**。

这篇文章记录了我的设计思路、架构选择以及踩过的坑，希望对大家参考或者面试分享有所帮助。

---

## 1. 为什么选择 Nuxt 4

当时选择 Nuxt 4 的原因主要有三个：

### 1.1 文件路由 + SSR/SSG 支持

- 首页、博客列表、文章详情页都可以通过约定路由快速生成
- SSR 对 SEO 很友好，静态站点生成（SSG）则减少构建压力

### 1.2 Nitro 服务器引擎

- 默认打包成 Node 或静态输出
- 方便部署到 Vercel/Netlify，未来扩展性好

### 1.3 TypeScript 完全支持

- 保证类型安全，尤其是文章数据结构变化时可以立刻发现错误
- 集中类型定义方便维护

> 如果是纯 Vue 3，我会自己搭建路由和 SSR，但 Nuxt 4 省了很多重复造轮子。

---

## 2. 博客内容管理

我使用了 **Nuxt Content 3** 来管理 Markdown 文章。

### 2.1 实现方式

文章统一放在 `content/blog/` 目录下，每篇 Markdown 都包含：

```yaml
---
title: "文章标题"
description: "文章摘要"
date: "2026-02-12"
tags: ["Nuxt", "Vue"]
---
```

### 2.2 为什么选择 Nuxt Content

- **Git 管理内容**：文章和代码放在一起，版本控制方便
- **无需数据库**：部署简单，适合个人博客
- **类型安全**：通过 `content.config.ts` 定义 schema，类型检查自动生效

### 2.3 踩过的坑

刚开始用的时候，发现 `queryCollection('content')` 返回的数据类型是 `unknown`，需要手动断言：

```typescript
// 错误写法
v-if="article.meta?.tags?.length"

// 正确写法
v-if="(article.meta?.tags as string[])?.length"
```

这个问题花了我半小时排查，后来才明白 Nuxt Content 3 的类型推导还不够完善。

---

## 3. 样式设计思路

### 3.1 反主流设计

说实话，我看腻了那些千篇一律的 SaaS 模板：
- 紫色到蓝色的渐变背景
- 大圆角卡片
- 毛玻璃效果

所以这次我刻意走了 **极简主义** 路线：
- **主色调**：纯黑 `#0a0a0a` + 米白 `#fafafa`
- **点缀色**：琥珀色 `amber-500`
- **无圆角**：直角设计，硬朗风格
- **网格线**：背景加细微网格，增加结构感

### 3.2 代码块样式

代码块参考了 VS Code Dark+ 主题：
- 深色背景 `#24292e`
- macOS 风格的红黄绿窗口按钮
- 语法高亮用 Shiki

```vue
<script setup>
// 示例代码
const { data: articles } = await useAsyncData('posts', () =>
  queryCollection('content').all()
)
</script>
```

---

## 4. 性能优化

### 4.1 构建优化

在 `nuxt.config.ts` 中做了这些配置：

```typescript
export default defineNuxtConfig({
  // 禁用 DevTools，减少启动时间
  devtools: { enabled: false },
  
  // Vite 优化
  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },
  },
  
  // 图片优化
  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },
})
```

### 4.2 实际效果

- 首屏加载：~1.2s
- Lighthouse 评分：95+（Performance）
- 构建时间：~15s

---

## 5. 部署方案

目前用的是最简单的方案：

1. 代码推送到 GitHub
2. Vercel 自动拉取并构建
3. 自动部署到 CDN

整个过程零配置，适合个人项目。如果以后流量大了，可以考虑：
- 静态导出 + CDN
- 图片托管到 OSS
- 数据库迁移到 PostgreSQL

---

## 6. 总结

这次搭建博客最大的收获不是技术本身，而是 **技术选型的权衡**。

比如：
- 用 Nuxt Content 而不是 CMS，牺牲了后台编辑的便利性，换来了部署简单
- 用极简设计而不是通用模板，牺牲了"大众审美"，换来了个人风格
- 用 TypeScript 而不是纯 JS，牺牲了开发速度，换来了长期维护性

没有绝对的好坏，只有适合不适合。

---

## 参考链接

- [Nuxt 4 官方文档](https://nuxt.com/)
- [Nuxt Content 3](https://content.nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [项目源码](https://github.com/dandan812/blog)

---

如果你也在搭建技术博客，欢迎交流。有问题可以提 Issue 或者发邮件给我。
