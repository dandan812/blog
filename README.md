# blog

个人技术博客，用 Nuxt 4 + Nuxt Content 3 搭建的。

支持 Markdown 写作、SSR/SSG 和自动化部署。

**在线地址**: https://blog-eight-gamma-66.vercel.app/

## 特性

- ✅ **现代技术栈**：基于 Nuxt 4、Vue 3、Nuxt Content 3、Tailwind CSS 4 和 TypeScript
- ✅ **响应式设计**：适配桌面端和移动端设备
- ✅ **高性能**：采用 SSR/SSG，静态资源优化和预加载策略
- ✅ **富交互体验**：全局搜索、平滑过渡动画和键盘快捷键
- ✅ **友好 SEO**：完善的 Meta 标签和结构化数据
- ✅ **易于写作**：简洁的 Markdown 文件格式，支持自动生成标题、摘要和阅读时长

## 技术栈

- Nuxt 4
- Vue 3
- Nuxt Content 3
- Tailwind CSS 4
- TypeScript
- Lucide 图标库
- SQLite (数据库)

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建静态网站
pnpm generate

# 构建服务器端渲染应用
pnpm build

# 运行测试
pnpm test

# 检查代码质量
pnpm lint

# 检查类型
pnpm typecheck
```

## 写文章

在 `content/blog/` 目录下新建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
date: '2025-02-10'
tags: ['Nuxt', 'Vue']
---

正文内容...
```

### Front Matter 字段说明

- `title`：文章标题，必填
- `description`：文章描述，将用于 SEO meta 标签
- `date`：发布日期，格式为 YYYY-MM-DD
- `tags`：标签数组，用于分类和检索
- `cover`：封面图片路径 (可选)
- `category`：文章分类 (可选)

### Markdown 特性

- 支持 GitHub Flavored Markdown (GFM)
- 支持代码块语法高亮，主题为 github-dark
- 内置多种代码语言支持 (JavaScript, TypeScript, Vue, HTML, CSS, JSON, Bash 等)
- 自动计算阅读时长

## 项目结构

```
blog/
├── assets/              # 全局样式和资源
│   └── css/main.css     # 主要样式文件
├── components/          # Vue 组件
│   ├── ArticleCard.vue  # 文章卡片展示
│   ├── SearchModal.vue  # 全局搜索弹窗
│   ├── SEOHead.vue      # SEO 相关头部标签
│   └── ...
├── composables/         # Nuxt 组合式函数 (未在此显示)
├── content/             # Markdown 内容
│   └── blog/            # 博客文章
│       ├── hello-nuxt4.md
│       └── ...
├── layouts/             # 页面布局
│   └── default.vue      # 默认应用布局
├── pages/               # 页面路由
│   ├── index.vue        # 首页
│   ├── blog/
│   │   ├── index.vue    # 文章列表页
│   │   └── [slug].vue   # 单篇文章详情页
│   ├── about.vue        # 关于页面
├── plugins/             # Nuxt 插件
│   ├── seo-enhance.client.ts      # SEO 客户端增强
│   ├── article-enhancements.client.ts  # 文章增强功能
│   └── performance.client.ts      # 性能监控
├── public/              # 静态资源 (favicon, 图像等)
├── types/               # TypeScript 类型定义
│   └── index.ts         # 统一类型定义与帮助函数
├── app.vue              # 应用入口
├── nuxt.config.ts       # Nuxt 配置
├── tsconfig.json        # TypeScript 配置
├── tailwind.config.js   # Tailwind CSS 配置
├── package.json         # 项目依赖与脚本
└── README.md
```

## 功能模块

### 搜索功能

- 全局键盘快捷键 `Ctrl/Cmd + K` 唤起搜索弹窗
- 支持按标题、内容进行全文搜索
- 结果高亮显示匹配项

### SEO 优化

- 自动为每个页面生成适当的 `<title>` 和 `<meta>` 标签
- 动态 Open Graph 社交媒体分享图
- 结构化数据支持以提升搜索排名

### 性能优化

- 服务端渲染 (SSR) + 静态站点生成 (SSG) 混合模式
- 代码分割和懒加载
- 图片优化与响应式加载

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

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.0.0

详细部署文档见 [DEPLOY.md](./DEPLOY.md)

## 测试

项目使用 Vitest 进行单元测试：

```bash
# 运行所有测试
pnpm test

# 运行测试并监听文件更改
pnpm test --watch

# 运行测试并生成覆盖率报告
pnpm test:run --coverage
```

当前重点测试了 composable 函数和其他可复用逻辑。

## 开发规范

### 命名约定

- 组件名称：使用 PascalCase，如 `ArticleCard.vue`
- 路由参数：使用 kebab-case，如 `blog/[slug].vue`
- CSS 类名：使用 kebab-case

### 提交信息

- 使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
  - `feat`: 新功能
  - `fix`: 修复错误
  - `docs`: 文档更新
  - `style`: 代码格式更新
  - `refactor`: 重构代码
  - `test`: 测试更新
  - `chore`: 构建过程或辅助工具变更

### 代码质量

- 代码风格遵循 ESLint 配置
- 所有代码必须通过类型检查
- 组件命名和结构保持一致性和清晰度

## 可维护性优化建议

### 性能优化

- 可考虑进一步图片懒加载
- 优化客户端运行时性能追踪
- 更精细化的资源预加载策略

### 功能扩展

- 实现深色模式切换
- 添加评论系统集成
- 添加文章目录和锚点导航
- 添加字体大小调节功能

### 用户体验

- 优化页面加载过渡效果
- 添加面包屑导航
- 增加上一篇/下一篇导航

### 国际化

- 考虑未来多语言支持架构(中英文切换)

## 贡献

欢迎 PR 和 Issue！

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 发起 PR

## 联系方式

- GitHub: [@dandan812](https://github.com/dandan812)
- Email: hu_liang2027@163.com
