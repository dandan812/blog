# 项目记忆 - My Blog

## 项目概述

基于 **Nuxt 4 + Nuxt Content 3** 的个人技术博客，支持 Markdown 写作、SSG/SSR 和自动化部署。

**在线地址**: https://blog-eight-gamma-66.vercel.app/

---

## 已完成的功能 ✅

### 前端功能

- [x] 首页展示文章列表
- [x] 文章详情页
- [x] 分页功能（网格/列表视图）
- [x] 全局搜索功能（Ctrl/Cmd + K 快捷键）
- [x] 深色/浅色模式切换
- [x] 响应式设计
- [x] SEO 优化（Open Graph、Twitter Cards、Schema.org）
- [x] 文章目录（TOC）组件
- [x] 相关文章推荐
- [x] 上下篇导航
- [x] 分享功能（Twitter、复制链接）

### 技术优化

- [x] 图片懒加载和格式优化
- [x] 性能监控插件
- [x] 代码分割和预加载
- [x] 类型检查通过

### 修复的问题

- [x] 修复了 index.vue 的类型错误
- [x] 修复了 TableOfContents.vue 的样式问题
- [x] 删除了有问题的 generate-rss.ts 插件
- [x] 修复了 EnhancedSearchModal.vue 的 API 调用
- [x] 修复了 [slug].vue 的类型问题

---

## 待办事项 📝

### 高优先级

- [ ] 搭建 Node.js + MySQL 后端 API
- [ ] 开发 Vue3 + Element Plus 管理后台
- [ ] 实现文章编辑器（Markdown）
- [ ] 实现 JWT 认证

### 中优先级

- [ ] 评论系统
- [ ] 统计分析（访问量、热门文章）
- [ ] 多语言支持（i18n）
- [ ] RSS 订阅
- [ ] 邮件订阅

### 低优先级

- [ ] PWA 支持
- [ ] 文章导出 PDF
- [ ] 自动备份功能

---

## 技术栈

### 前端

- **框架**: Nuxt 4 + Vue 3 + TypeScript
- **样式**: Tailwind CSS 4 + PostCSS
- **UI 组件**: 自定义组件 + Element Plus (后台)
- **图标**: Lucide Icons
- **内容**: Nuxt Content 3
- **图片**: @nuxt/image

### 后端（计划使用）

- **运行时**: Node.js
- **框架**: Express.js / Fastify / NestJS (待确定)
- **数据库**: MySQL
- **ORM**: Prisma / Sequelize (待确定)
- **认证**: JWT
- **存储**: 本地/七牛云 OSS

### 部署

- **前端**: Vercel
- **后端**: Railway / Render / 阿里云 ECS (待确定)
- **数据库**: PlanetScale (免费版) / 阿里云 RDS (待确定)

---

## 重要配置

### 环境变量

```
# 数据库
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blog
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# API
API_PORT=3001
API_URL=http://localhost:3001

# 前端
NUXT_PUBLIC_API_URL=http://localhost:3001
```

### 构建命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 生成静态站点
pnpm generate

# 类型检查
pnpm typecheck

# 测试
pnpm test
```

---

## 项目结构

```
blog/
├── components/          # Vue 组件
├── composables/         # 组合式函数
├── content/blog/        # Markdown 文章
├── layouts/             # 布局
├── pages/               # 页面
├── plugins/             # 插件
├── types/               # 类型定义
├── utils/               # 工具函数
└── AGENTS.md            # 本文件
```

---

## 部署方案选择

### 方案 1：免费版（当前）

- **前端**: Vercel（免费）
- **后端**: 无（使用 Nuxt Content）
- **数据库**: SQLite（本地文件）
- **成本**: 0 元/月

### 方案 2：低成本版（推荐）

- **前端**: Vercel（免费）
- **后端**: Railway / Render（免费额度）
- **数据库**: PlanetScale（免费版）
- **成本**: 0-30 元/月

### 方案 3：稳定版

- **前端**: Vercel Pro（20 美元/月）
- **后端**: 阿里云 ECS（35 元/月）
- **数据库**: 阿里云 RDS（25 元/月）
- **成本**: 约 60-80 元/月

---

## 下一步行动

1. 确定后端技术栈（Express vs Fastify vs NestJS）
2. 选择数据库部署方案
3. 初始化后端项目
4. 开发管理后台
5. 改造 Nuxt 前端调用 API

---

## 备注

- 下次继续开发时，先读取本文件了解当前状态
- 完成的功能及时勾选 ✅
- 定期更新待办事项
