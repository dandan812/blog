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
- [x] 代码简化优化

### 修复的问题

- [x] 修复了 index.vue 的类型错误
- [x] 修复了 TableOfContents.vue 的样式问题
- [x] 删除了有问题的 generate-rss.ts 插件
- [x] 修复了 EnhancedSearchModal.vue 的 API 调用
- [x] 修复了 [slug].vue 的类型问题

---

## 待办事项 📝

### 阶段 1：项目初始化 (Day 1) ✅

- [x] 1.1 创建 Monorepo 结构 (pnpm workspace)
- [x] 1.2 初始化后端项目 (Express + TypeScript)
- [x] 1.3 配置 Prisma
- [x] 1.4 创建 Supabase 数据库（替代 PlanetScale）
- [x] 1.5 执行数据库迁移

### 阶段 2：后端核心功能 (Day 2-3) ✅

- [x] 2.1 用户认证模块
  - [x] 注册接口
  - [x] 登录接口
  - [x] JWT 中间件
  - [x] 密码加密
- [x] 2.2 文章管理模块
  - [x] CRUD 接口
  - [x] Slug 自动生成
  - [x] 草稿/发布状态
- [x] 2.3 评论系统模块
  - [x] 发表评论（支持游客）
  - [x] 评论审核
  - [x] 嵌套回复
- [x] 2.4 统计功能模块
  - [x] 浏览记录
  - [x] 热门文章
  - [x] 仪表盘数据

### 阶段 3：管理后台 (Day 4-5) ✅

- [x] 3.1 项目搭建 (Vue 3 + Vite + Element Plus)
- [x] 3.2 登录模块
  - [x] 登录页面
  - [x] Token 持久化
  - [x] 路由守卫
- [x] 3.3 文章管理
  - [x] 文章列表
  - [x] Markdown 编辑器 (ByteMD)
  - [x] 发布/草稿切换
- [x] 3.4 评论管理
  - [x] 评论列表
  - [x] 审核/删除
- [x] 3.5 统计看板
  - [x] 访问趋势图
  - [x] 热门文章

### 阶段 4：前端改造 (Day 6) ✅

- [x] 4.1 创建 API 服务层
  - [x] 创建 `types/api.ts` 定义 API 类型
  - [x] 创建 `composables/useApi.ts` 封装 API 调用
  - [x] 支持 usePosts、usePost、useComments、usePopularPosts
- [x] 4.2 替换 Nuxt Content 查询
  - [x] 首页改为调用 `/api/posts` 接口
  - [x] 博客列表页改为调用 `/api/posts` 接口
  - [x] 文章详情页改为调用 `/api/posts/:slug` 接口
- [x] 4.3 添加加载状态
  - [x] 首页添加加载中状态
  - [x] 列表页添加加载中状态
  - [x] 详情页添加加载中状态
- [x] 4.4 错误处理
  - [x] API 请求错误捕获
  - [x] 错误状态展示
  - [x] 重试机制

### 阶段 5：部署上线 (Day 7) ✅

- [x] 5.1 Railway 部署配置
  - [x] 创建 `railway.json` 配置文件
  - [x] 创建 `nixpacks.toml` 构建配置
  - [x] 更新 `package.json` 部署脚本
- [x] 5.2 数据迁移脚本
  - [x] 创建 `src/seed.ts` 种子脚本
  - [x] 支持 Markdown 文章迁移到数据库
  - [x] 创建默认管理员账号
- [x] 5.3 部署文档
  - [x] 更新 `DEPLOY.md` 完整部署指南
  - [x] 包含 Supabase + Railway + Vercel 部署流程
- [x] 5.4 测试验证
  - [x] 后端健康检查接口
  - [x] API 接口验证

---

## 技术栈

### 前端（已完成）

- **框架**: Nuxt 4 + Vue 3 + TypeScript
- **样式**: Tailwind CSS 4 + PostCSS
- **UI 组件**: 自定义组件
- **图标**: Lucide Icons
- **数据**: API 调用（已从 Nuxt Content 迁移）

### 后端（已完成）

- **运行时**: Node.js
- **框架**: Express.js
- **语言**: TypeScript
- **数据库**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **认证**: JWT + bcryptjs
- **验证**: Zod

### 管理后台（已完成）

- **框架**: Vue 3 + Vite
- **UI**: Element Plus
- **状态**: Pinia
- **路由**: Vue Router
- **编辑器**: ByteMD

### 部署（已完成）

- **前端**: Vercel
- **后端**: Railway
- **数据库**: Supabase

---

## 项目结构（目标）

```
blog/
├── apps/
│   ├── web/                    # Nuxt 4 前端 (现有)
│   ├── admin/                  # Vue 3 管理后台 (新增)
│   └── server/                 # Express 后端 (新增)
│       ├── src/
│       │   ├── controllers/    # 控制器
│       │   ├── middlewares/    # 中间件
│       │   ├── services/       # 业务逻辑
│       │   ├── routes/         # 路由
│       │   ├── prisma/         # 数据库模型
│       │   ├── utils/          # 工具函数
│       │   └── app.ts          # 应用入口
│       └── package.json
├── packages/
│   └── shared/                 # 共享类型 (新增)
├── pnpm-workspace.yaml         # Monorepo 配置
└── AGENTS.md                   # 本文件
```

---

## 环境变量

### 前端 `.env` (apps/web)

```env
# API Base URL - 后端服务地址
NUXT_PUBLIC_API_URL=http://localhost:3001
```

### 后端 `.env` (apps/server)

```env
# 数据库 (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"

# 应用
PORT=3001
NODE_ENV=development

# 前端地址 (CORS)
FRONTEND_URL="http://localhost:3000"
ADMIN_URL="http://localhost:5173"
```

---

## API 设计

### 认证模块 `/api/auth`

| 方法 | 路径      | 说明         | 认证 |
| ---- | --------- | ------------ | ---- |
| POST | /register | 注册管理员   | 否   |
| POST | /login    | 登录         | 否   |
| GET  | /me       | 获取当前用户 | 是   |

### 文章模块 `/api/posts`

| 方法   | 路径   | 说明     | 认证 |
| ------ | ------ | -------- | ---- |
| GET    | /      | 文章列表 | 否   |
| GET    | /:slug | 文章详情 | 否   |
| POST   | /      | 创建文章 | 是   |
| PUT    | /:id   | 更新文章 | 是   |
| DELETE | /:id   | 删除文章 | 是   |

### 评论模块 `/api/comments`

| 方法   | 路径          | 说明     | 认证 |
| ------ | ------------- | -------- | ---- |
| GET    | /post/:postId | 获取评论 | 否   |
| POST   | /             | 发表评论 | 否   |
| DELETE | /:id          | 删除评论 | 是   |

### 统计模块 `/api/stats`

| 方法 | 路径          | 说明     | 认证 |
| ---- | ------------- | -------- | ---- |
| POST | /view/:postId | 记录浏览 | 否   |
| GET  | /popular      | 热门文章 | 否   |
| GET  | /dashboard    | 仪表盘   | 是   |

---

## 成本估算

| 服务        | 免费额度   | 预计使用 | 成本        |
| ----------- | ---------- | -------- | ----------- |
| Vercel      | 100GB带宽  | ~5GB     | 0 元        |
| Railway     | 500小时/月 | ~300小时 | 0 元        |
| PlanetScale | 1亿行读取  | ~10万行  | 0 元        |
| **总计**    | -          | -        | **0 元/月** |

---

## 详细计划文档

完整实施计划见：`.opencode/plans/backend-plan.md`

---

## 备注

- 下次继续开发时，先读取本文件了解当前状态
- 完成的功能及时勾选 ✅
- 定期更新待办事项
