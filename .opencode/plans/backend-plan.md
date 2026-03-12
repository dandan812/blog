# 博客后端实施计划

## 技术栈

| 层级     | 技术                 | 版本    |
| -------- | -------------------- | ------- |
| 后端框架 | Express.js           | ^4.21.x |
| 语言     | TypeScript           | ^5.x    |
| ORM      | Prisma               | ^6.x    |
| 数据库   | PlanetScale (MySQL)  | -       |
| 认证     | JWT + bcrypt         | -       |
| 部署     | Railway              | -       |
| 管理后台 | Vue 3 + Element Plus | -       |
| 包管理   | pnpm workspace       | -       |

---

## 项目结构 (Monorepo)

```
blog/
├── apps/
│   ├── web/                    # Nuxt 4 前端 (现有)
│   ├── admin/                  # Vue 3 管理后台
│   │   ├── src/
│   │   │   ├── views/          # 页面
│   │   │   ├── components/     # 组件
│   │   │   ├── api/            # API 请求
│   │   │   ├── stores/         # Pinia 状态
│   │   │   └── router/         # 路由
│   │   └── package.json
│   │
│   └── server/                 # Express 后端
│       ├── src/
│       │   ├── controllers/    # 控制器
│       │   │   ├── auth.controller.ts
│       │   │   ├── post.controller.ts
│       │   │   ├── comment.controller.ts
│       │   │   └── stats.controller.ts
│       │   ├── middlewares/    # 中间件
│       │   │   ├── auth.middleware.ts
│       │   │   ├── error.middleware.ts
│       │   │   └── validate.middleware.ts
│       │   ├── services/       # 业务逻辑
│       │   ├── routes/         # 路由
│       │   │   ├── auth.routes.ts
│       │   │   ├── post.routes.ts
│       │   │   ├── comment.routes.ts
│       │   │   └── stats.routes.ts
│       │   ├── prisma/         # 数据库
│       │   │   └── schema.prisma
│       │   ├── utils/          # 工具函数
│       │   │   ├── jwt.ts
│       │   │   ├── password.ts
│       │   │   └── slug.ts
│       │   ├── types/          # 类型定义
│       │   └── app.ts          # 应用入口
│       ├── prisma/             # Prisma CLI
│       └── package.json
│
├── packages/
│   └── shared/                 # 共享类型
│       ├── src/
│       │   ├── types/          # 接口定义
│       │   └── index.ts
│       └── package.json
│
├── pnpm-workspace.yaml
└── package.json
```

---

## 数据库模型

### Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  comments  Comment[]

  @@index([email])
}

enum Role {
  USER
  ADMIN
}

model Post {
  id          String       @id @default(cuid())
  title       String
  slug        String       @unique
  content     String       @db.Text
  excerpt     String?      @db.Text
  status      PostStatus   @default(DRAFT)
  views       Int          @default(0)
  authorId    String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  publishedAt DateTime?

  author      User         @relation(fields: [authorId], references: [id])
  tags        Tag[]
  comments    Comment[]
  stats       DailyStat[]

  @@index([slug])
  @@index([status, publishedAt])
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Tag {
  id     String @id @default(cuid())
  name   String @unique
  postId String?

  post   Post?  @relation(fields: [postId], references: [id])

  @@index([name])
}

model Comment {
  id        String    @id @default(cuid())
  content   String    @db.Text
  postId    String
  userId    String?
  parentId  String?
  authorName String?
  authorEmail String?
  status    CommentStatus @default(PENDING)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  post      Post      @relation(fields: [postId], references: [id])
  user      User?     @relation(fields: [userId], references: [id])
  parent    Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")

  @@index([postId])
  @@index([status])
}

enum CommentStatus {
  PENDING
  APPROVED
  SPAM
}

model DailyStat {
  id        String   @id @default(cuid())
  postId    String
  date      DateTime @db.Date
  viewCount Int      @default(0)

  post      Post     @relation(fields: [postId], references: [id])

  @@unique([postId, date])
  @@index([date])
}
```

---

## API 设计

### 认证模块 `/api/auth`

| 方法 | 路径      | 说明         | 认证 |
| ---- | --------- | ------------ | ---- |
| POST | /register | 注册管理员   | 否   |
| POST | /login    | 登录         | 否   |
| GET  | /me       | 获取当前用户 | 是   |
| POST | /logout   | 登出         | 是   |

### 文章模块 `/api/posts`

| 方法   | 路径   | 说明                  | 认证 |
| ------ | ------ | --------------------- | ---- |
| GET    | /      | 文章列表 (分页、筛选) | 否   |
| GET    | /:slug | 文章详情              | 否   |
| POST   | /      | 创建文章              | 是   |
| PUT    | /:id   | 更新文章              | 是   |
| DELETE | /:id   | 删除文章              | 是   |

### 评论模块 `/api/comments`

| 方法   | 路径          | 说明         | 认证          |
| ------ | ------------- | ------------ | ------------- |
| GET    | /post/:postId | 获取文章评论 | 否            |
| POST   | /             | 发表评论     | 否 (支持游客) |
| DELETE | /:id          | 删除评论     | 是            |
| PUT    | /:id/status   | 审核评论     | 是            |

### 统计模块 `/api/stats`

| 方法 | 路径          | 说明       | 认证 |
| ---- | ------------- | ---------- | ---- |
| POST | /view/:postId | 记录浏览   | 否   |
| GET  | /popular      | 热门文章   | 否   |
| GET  | /dashboard    | 仪表盘数据 | 是   |

---

## 实施步骤

### 阶段 1：项目初始化 (Day 1)

- [ ] 1.1 创建 Monorepo 结构
- [ ] 1.2 初始化后端项目
- [ ] 1.3 配置 PlanetScale
- [ ] 1.4 数据库迁移

### 阶段 2：后端核心功能 (Day 2-3)

- [ ] 2.1 用户认证
- [ ] 2.2 文章管理
- [ ] 2.3 评论系统
- [ ] 2.4 统计功能

### 阶段 3：管理后台 (Day 4-5)

- [ ] 3.1 项目搭建
- [ ] 3.2 登录模块
- [ ] 3.3 文章管理
- [ ] 3.4 评论管理
- [ ] 3.5 统计看板

### 阶段 4：前端改造 (Day 6)

- [ ] 4.1 API 集成
- [ ] 4.2 数据适配

### 阶段 5：部署上线 (Day 7)

- [ ] 5.1 Railway 部署
- [ ] 5.2 数据迁移
- [ ] 5.3 测试验证

---

## 依赖清单

### 后端 (apps/server)

```json
{
  "dependencies": {
    "express": "^4.21.0",
    "cors": "^2.8.5",
    "helmet": "^8.0.0",
    "dotenv": "^16.4.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.23.0",
    "@prisma/client": "^6.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/express": "^4.17.21",
    "@types/node": "^22.0.0",
    "@types/cors": "^2.8.17",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.7",
    "prisma": "^6.0.0",
    "tsx": "^4.19.0",
    "nodemon": "^3.1.0"
  }
}
```

### 管理后台 (apps/admin)

```json
{
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.4.0",
    "pinia": "^2.2.0",
    "element-plus": "^2.8.0",
    "axios": "^1.7.0",
    "@element-plus/icons-vue": "^2.3.1",
    "@bytemd/vue-next": "^1.21.0",
    "bytemd": "^1.21.0",
    "highlight.js": "^11.10.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-vue": "^5.1.0",
    "typescript": "^5.6.0",
    "sass": "^1.79.0"
  }
}
```

---

## 环境变量

```env
# 数据库
DATABASE_URL="mysql://user:pass@host/db?sslaccept=strict"

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

## 成本估算

| 服务        | 免费额度   | 预计使用 | 成本        |
| ----------- | ---------- | -------- | ----------- |
| Vercel      | 100GB带宽  | ~5GB     | 0 元        |
| Railway     | 500小时/月 | ~300小时 | 0 元        |
| PlanetScale | 1亿行读取  | ~10万行  | 0 元        |
| **总计**    | -          | -        | **0 元/月** |

---

## 注意事项

### PlanetScale 限制

- 免费版：1 个数据库，10 亿行读取/月
- 不支持外键约束 (使用 relationMode = "prisma")

### Railway 限制

- 免费版：500 小时/月
- $5 赠金用完后服务暂停

### 安全建议

1. JWT Secret 使用强随机字符串
2. API 添加速率限制
3. 评论添加防垃圾机制
4. CORS 限制允许的域名
