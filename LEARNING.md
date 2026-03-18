# 博客项目学习指南

## 项目架构总览

这是一个 **Monorepo 架构**的项目，使用 **pnpm workspace** 管理，包含三个独立应用：

```
blog/                          # Monorepo 根目录
├── apps/
│   ├── web/                   # Nuxt 4 前端（主应用）
│   ├── server/                # Express 后端 API
│   └── admin/                 # Vue 3 管理后台
├── packages/
│   └── shared/                # 共享类型定义
├── pnpm-workspace.yaml        # Workspace 配置
├── package.json               # 根 package.json
└── AGENTS.md                  # 项目记忆文档
```

---

## 技术栈详情

### apps/web (前端)

| 技术 | 版本 | 用途 |
|------|------|------|
| Nuxt | 4.3.1 | 全栈框架 |
| Vue | 3.5.28 | 前端框架 |
| Nuxt Content | 3.11.2 | Markdown 内容管理 |
| Tailwind CSS | 4.1.18 | 样式框架 |
| @nuxtjs/color-mode | 4.0.0 | 深色模式 |
| @nuxt/image | 2.0.0 | 图片优化 |
| @nuxt/icon | 2.2.1 | 图标系统 |
| marked | 17.0.4 | Markdown 解析 |

### apps/server (后端)

| 技术 | 版本 | 用途 |
|------|------|------|
| Express | 4.21.2 | Web 框架 |
| Prisma | 6.4.1 | ORM |
| PostgreSQL | - | 数据库 |
| JWT | 9.0.2 | 认证 |
| bcryptjs | 2.4.3 | 密码加密 |
| Zod | 3.24.2 | 数据验证 |
| helmet | 7.2.0 | 安全中间件 |
| cors | 2.8.5 | 跨域 |

### apps/admin (管理后台)

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.13 | 前端框架 |
| Vite | 6.1.0 | 构建工具 |
| Element Plus | 2.9.4 | UI 组件库 |
| Pinia | 2.3.0 | 状态管理 |
| Vue Router | 4.5.0 | 路由 |
| ByteMD | 1.21.0 | Markdown 编辑器 |
| ECharts | 5.6.0 | 图表库 |
| Axios | 1.7.9 | HTTP 客户端 |

---

## 学习路径

```
阶段1: 基础理解 (1-2天)
    ↓
阶段2: 前端深入 (3-5天)
    ↓
阶段3: 后端深入 (2-3天)
    ↓
阶段4: 全栈整合 (2-3天)
```

---

## 阶段1: 基础理解 (1-2天)

### 必读文件（按顺序）

| 文件 | 学习重点 |
|------|----------|
| `AGENTS.md` | 项目整体规划、已完成功能 |
| `pnpm-workspace.yaml` | Monorepo 结构理解 |
| `apps/web/nuxt.config.ts` | Nuxt 核心配置 |
| `apps/web/app.vue` | 应用入口 |

### 动手任务

```bash
# 启动项目
pnpm dev:web      # 启动前端 (http://localhost:3000)
pnpm dev:server   # 启动后端 (http://localhost:3001)
pnpm dev:admin    # 启动管理后台 (http://localhost:5173)
```

### 学习要点

- 理解 Monorepo 架构的优势
- 了解三个应用之间的关系
- 熟悉开发环境配置

---

## 阶段2: 前端深入 (3-5天)

### apps/web 目录结构

```
apps/web/
├── assets/css/main.css        # 全局样式
├── components/
│   ├── ui/                    # UI 基础组件
│   │   ├── Card.vue           # 卡片组件
│   │   ├── CardGrid.vue       # 卡片网格布局
│   │   ├── ContentSection.vue # 内容区块
│   │   ├── EmptyState.vue     # 空状态
│   │   ├── Hero.vue           # Hero 区域
│   │   ├── LoadingState.vue   # 加载状态
│   │   ├── Section.vue        # 区块容器
│   │   └── SectionTitle.vue   # 区块标题
│   ├── ColorModeToggle.vue    # 深色模式切换
│   ├── EnhancedSearchModal.vue# 全局搜索模态框
│   ├── GiscusComments.vue     # Giscus 评论组件
│   └── TableOfContents.vue    # 文章目录
├── composables/
│   ├── usePagination.ts       # 分页逻辑
│   └── usePosts.ts            # 文章 API 封装
├── content/blog/              # Markdown 文章
├── layouts/default.vue        # 默认布局
├── middleware/seo.global.ts   # 全局 SEO 中间件
├── pages/
│   ├── index.vue              # 首页
│   ├── about.vue              # 关于页面
│   └── blog/
│       ├── index.vue          # 博客列表
│       └── [slug].vue         # 文章详情
├── plugins/performance.client.ts  # 性能监控
├── types/
│   ├── api.ts                 # API 类型定义
│   └── index.ts               # 通用类型
└── utils/headings.ts          # 工具函数
```

### 核心文件学习顺序

| 顺序 | 文件 | 学习重点 |
|------|------|----------|
| 1 | `composables/usePosts.ts` | API 封装模式、composable 设计 |
| 2 | `pages/index.vue` | 页面结构、Tailwind 样式、组件组合 |
| 3 | `pages/blog/[slug].vue` | 动态路由、数据获取、SEO |
| 4 | `components/EnhancedSearchModal.vue` | 复杂交互组件、模态框 |
| 5 | `components/ColorModeToggle.vue` | 深色模式实现 |
| 6 | `layouts/default.vue` | 布局系统 |
| 7 | `middleware/seo.global.ts` | 全局中间件 |

### 学习重点

#### Vue 3 Composition API

```typescript
// 响应式数据
const count = ref(0)
const doubled = computed(() => count.value * 2)

// 生命周期
onMounted(() => { /* ... */ })

// 组合式函数
const { posts, fetchPosts } = usePosts()
```

#### Nuxt 自动导入

```typescript
// 无需 import，直接使用
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
```

#### Tailwind CSS 样式模式

```html
<!-- 原子化样式 -->
<div class="flex items-center gap-4 px-6 py-3 bg-black text-white">

<!-- 深色模式 -->
<div class="bg-white dark:bg-[#0a0a0a] text-black dark:text-white">

<!-- 响应式 -->
<div class="text-sm md:text-base lg:text-lg">

<!-- 悬停状态 -->
<button class="bg-black hover:bg-amber-500 transition-colors">
```

---

## 阶段3: 后端深入 (2-3天)

### apps/server 目录结构

```
apps/server/
├── src/
│   ├── app.ts                 # Express 应用入口
│   ├── server.ts              # 服务器启动
│   ├── routes/                # 路由定义
│   │   ├── auth.ts            # 认证路由
│   │   ├── posts.ts           # 文章路由
│   │   ├── comments.ts        # 评论路由
│   │   └── stats.ts           # 统计路由
│   ├── controllers/           # 控制器
│   ├── middlewares/           # 中间件
│   │   └── auth.ts            # JWT 认证中间件
│   ├── services/              # 业务逻辑
│   ├── utils/                 # 工具函数
│   └── prisma/                # Prisma 客户端
├── prisma/
│   ├── schema.prisma          # 数据库模型
│   └── migrations/            # 迁移文件
└── package.json
```

### 核心文件学习顺序

| 顺序 | 文件 | 学习重点 |
|------|------|----------|
| 1 | `prisma/schema.prisma` | 数据模型设计、关系定义 |
| 2 | `src/app.ts` | Express 配置、中间件链 |
| 3 | `src/routes/posts.ts` | RESTful 路由设计 |
| 4 | `src/controllers/postCtrl.ts` | 业务逻辑处理 |
| 5 | `src/middlewares/auth.ts` | JWT 认证流程 |
| 6 | `src/utils/jwt.ts` | Token 生成与验证 |

### 数据库模型

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│     User     │     │     Post     │     │     Tag      │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │──┐  │ id           │     │ id           │
│ email        │  │  │ title        │     │ name         │
│ password     │  │  │ slug         │     │ slug         │
│ name         │  │  │ content      │     └──────┬───────┘
│ role         │  │  │ excerpt      │            │
└──────────────┘  │  │ viewCount    │◀───────────┘
                  │  │ published    │     多对多关系
                  │  │ authorId     │◀────┐
                  │  └──────────────┘    │
                  │                      │
                  └──────────────────────┘
                         一对多关系

┌──────────────┐     ┌──────────────┐
│   Comment    │     │   ViewLog    │
├──────────────┤     ├──────────────┤
│ id           │     │ id           │
│ content      │     │ postId       │
│ author       │     │ ip           │
│ email        │     │ userAgent    │
│ status       │     │ createdAt    │
│ postId       │     └──────────────┘
│ parentId     │◀──┐ 自关联（嵌套回复）
└──────────────┘  │
                  └──┘
```

### 学习重点

#### Prisma ORM

```typescript
// 查询
const posts = await prisma.post.findMany({
  where: { published: true },
  include: { tags: true, author: true },
  orderBy: { createdAt: 'desc' }
})

// 创建
const post = await prisma.post.create({
  data: {
    title: '...',
    slug: '...',
    author: { connect: { id: userId } }
  }
})

// 更新
await prisma.post.update({
  where: { id },
  data: { published: true }
})
```

#### RESTful API 设计

```
GET    /api/posts           # 文章列表
GET    /api/posts/:slug     # 文章详情
POST   /api/posts           # 创建文章
PUT    /api/posts/:id       # 更新文章
DELETE /api/posts/:id       # 删除文章
```

#### JWT 认证流程

```
1. 用户登录 → 验证密码
2. 生成 JWT Token
3. 客户端存储 Token
4. 请求携带 Token (Authorization: Bearer xxx)
5. 中间件验证 Token
6. 解析用户信息 → 继续处理请求
```

---

## 阶段4: 全栈整合 (2-3天)

### 数据流架构

```
┌─────────────────────────────────────────────────────────────┐
│                      apps/web (前端)                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  pages/     │───▶│ composables │───▶│ fetchApi()      │  │
│  │  index.vue  │    │ usePosts.ts │    │ (HTTP Client)   │  │
│  └─────────────┘    └─────────────┘    └────────┬────────┘  │
└─────────────────────────────────────────────────┼───────────┘
                                                  │
                                                  │ HTTP
                                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    apps/server (后端)                        │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  routes/    │───▶│ controllers │───▶│ Prisma Client   │  │
│  │  posts.ts   │    │ postCtrl.ts │    │ (ORM)           │  │
│  └─────────────┘    └─────────────┘    └────────┬────────┘  │
└─────────────────────────────────────────────────┼───────────┘
                                                  │
                                                  ▼
                                         ┌───────────────┐
                                         │  PostgreSQL   │
                                         │  (Supabase)   │
                                         └───────────────┘
```

### API 封装模式 (composables/usePosts.ts)

```typescript
// API 请求封装
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  return response.json()
}

// 导出的组合式函数
export const usePosts = () => {
  const posts = ref<Post[]>([])
  const pending = ref(false)

  const fetchPosts = async (params) => {
    pending.value = true
    const res = await fetchApi(`/api/posts?${new URLSearchParams(params)}`)
    posts.value = res.data
    pending.value = false
  }

  return { posts, pending, fetchPosts }
}
```

### 类型共享 (types/api.ts)

```typescript
// 前后端共享的类型定义
export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  viewCount: number
  published: boolean
  createdAt: string
  tags?: Tag[]
}

export interface ApiResponse<T> {
  data: T
  total: number
  page: number
  pageSize: number
}
```

### 动手项目建议

#### 项目1: 添加点赞功能

1. 修改 `prisma/schema.prisma`，添加 `Like` 模型
2. 创建 `apps/server/src/routes/likes.ts`
3. 在前端 `composables/useLikes.ts` 封装 API
4. 在文章详情页添加点赞按钮

#### 项目2: 添加文章分类

1. 创建 `Category` 模型，与 `Post` 建立关系
2. 后端添加分类 CRUD 接口
3. 管理后台添加分类管理
4. 前端按分类筛选文章

#### 项目3: 添加阅读进度条

1. 创建 `components/ReadingProgress.vue`
2. 监听滚动事件计算进度
3. 在文章详情页集成

---

## 关键技术点总结

### Nuxt 4 特色

| 特性 | 说明 |
|------|------|
| `app/` 目录 | 新的项目结构 |
| `useFetch` | 服务端数据获取，自动处理响应式 |
| `$fetch` | 原生 fetch 封装，用于客户端 |
| `routeRules` | 路由级缓存和渲染规则 |
| 自动导入 | 无需 import，直接使用 |

### 样式系统

| 技术 | 用法 |
|------|------|
| 原子化样式 | `class="flex items-center gap-4"` |
| 深色模式 | `class="bg-white dark:bg-black"` |
| 响应式 | `class="text-sm md:text-base lg:text-lg"` |
| 状态变体 | `class="bg-black hover:bg-amber-500"` |

### 数据流

```
页面组件
    ↓
composable (封装 API 调用)
    ↓
fetchApi (HTTP 请求)
    ↓
后端 API
    ↓
Prisma ORM
    ↓
数据库
```

---

## 调试技巧

### 开发调试

```bash
# 查看类型错误
pnpm typecheck

# 代码检查
pnpm lint

# 查看构建产物
ls apps/web/.output

# 数据库可视化
cd apps/server && npx prisma studio
```

### 常见问题

| 问题 | 解决方案 |
|------|----------|
| 端口被占用 | `npx kill-port 3000` |
| 依赖问题 | `rm -rf node_modules && pnpm install` |
| 数据库连接失败 | 检查 `.env` 中的 `DATABASE_URL` |
| 类型错误 | 运行 `pnpm typecheck` 查看详情 |

---

## 环境变量配置

### apps/web/.env

```env
NUXT_PUBLIC_API_URL=http://localhost:3001
NUXT_PUBLIC_GISCUS_REPO=your-repo
NUXT_PUBLIC_GISCUS_REPO_ID=xxx
NUXT_PUBLIC_GISCUS_CATEGORY=xxx
NUXT_PUBLIC_GISCUS_CATEGORY_ID=xxx
```

### apps/server/.env

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:5173
```

---

## 开发命令速查

```bash
# 开发
pnpm dev:web      # 启动前端
pnpm dev:server   # 启动后端
pnpm dev:admin    # 启动管理后台

# 构建
pnpm build:web    # 构建前端
pnpm build:server # 构建后端

# 代码质量
pnpm lint         # 代码检查
pnpm typecheck    # 类型检查
pnpm test         # 运行测试

# 数据库
cd apps/server
npx prisma studio       # 数据库可视化
npx prisma migrate dev  # 创建迁移
npx prisma db seed      # 填充数据
```

---

## 扩展阅读

- [Nuxt 4 文档](https://nuxt.com/docs)
- [Vue 3 文档](https://vuejs.org/guide/introduction.html)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Express 文档](https://expressjs.com/)