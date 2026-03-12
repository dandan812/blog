# 部署指南

## 架构概览

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vercel        │     │   Railway       │     │   Supabase      │
│   (前端)        │────▶│   (后端 API)    │────▶│   (PostgreSQL)  │
│   apps/web      │     │   apps/server   │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 前置条件

- GitHub 账号
- Vercel 账号 (https://vercel.com)
- Railway 账号 (https://railway.app)
- Supabase 账号 (https://supabase.com)

---

## 1. 数据库设置 (Supabase)

### 1.1 创建项目

1. 登录 Supabase Dashboard
2. 创建新项目
3. 记录数据库连接信息

### 1.2 获取连接字符串

在项目设置 > Database 中找到：
- `DATABASE_URL`: 用于连接池
- `DIRECT_URL`: 用于直连

格式：
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

---

## 2. 后端部署 (Railway)

### 2.1 创建项目

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 初始化项目（在 apps/server 目录）
cd apps/server
railway init
```

### 2.2 配置环境变量

在 Railway Dashboard 中设置：

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-key-at-least-32-characters
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-blog.vercel.app
ADMIN_URL=https://admin.your-blog.vercel.app
```

### 2.3 部署

```bash
# 方式一：通过 CLI
railway up

# 方式二：连接 GitHub 自动部署
# 在 Railway Dashboard 中连接 GitHub 仓库
# 设置 Root Directory 为 apps/server
```

### 2.4 生成域名

Railway 会自动分配一个域名，例如：
- `https://your-app.up.railway.app`

---

## 3. 前端部署 (Vercel)

### 3.1 推送代码到 GitHub

```bash
git add .
git commit -m "feat: 准备部署"
git push origin main
```

### 3.2 创建项目

1. 登录 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 选择你的 blog 仓库
4. 配置：
   - **Root Directory**: `apps/web`
   - **Framework Preset**: Nuxt.js
5. 点击 Deploy

### 3.3 配置环境变量

在 Vercel Dashboard > Settings > Environment Variables：

```env
NUXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

---

## 4. 管理后台部署 (Vercel)

### 4.1 创建新项目

在 Vercel 中创建另一个项目：
- **Root Directory**: `apps/admin`
- **Framework Preset**: Vite

### 4.2 配置环境变量

```env
VITE_API_URL=https://your-app.up.railway.app
```

---

## 5. 数据迁移

### 5.1 本地迁移

```bash
# 在 apps/server 目录
cd apps/server

# 运行数据库迁移
pnpm db:deploy

# 运行种子脚本（迁移现有文章）
pnpm db:seed
```

### 5.2 生产环境迁移

Railway 会在部署时自动运行 `prisma migrate deploy`。

---

## 6. 验证部署

### 6.1 检查后端健康状态

```bash
curl https://your-api.up.railway.app/health
```

预期响应：
```json
{"status":"ok","timestamp":"2025-xx-xxTxx:xx:xx.xxxZ"}
```

### 6.2 检查 API

```bash
# 获取文章列表
curl https://your-api.up.railway.app/api/posts

# 获取单篇文章
curl https://your-api.up.railway.app/api/posts/hello-nuxt4
```

### 6.3 测试管理后台

1. 访问管理后台域名
2. 使用管理员账号登录：
   - 邮箱: admin@blog.com
   - 密码: admin123

---

## 7. 常见问题

### 7.1 数据库连接失败

- 检查 DATABASE_URL 格式是否正确
- 确认 Supabase 项目未暂停
- 检查 IP 白名单设置

### 7.2 前端无法连接后端

- 确认 `NUXT_PUBLIC_API_URL` 配置正确
- 检查 CORS 设置
- 确认后端服务正常运行

### 7.3 部署后 500 错误

- 查看 Railway 日志
- 确认数据库迁移成功
- 检查环境变量是否完整

---

## 8. 成本估算

| 服务        | 免费额度          | 预计使用    | 成本        |
| ----------- | ---------------- | ----------- | ----------- |
| Vercel      | 100GB 带宽/月    | ~5GB        | $0          |
| Railway     | $5 免费额度/月   | ~$3         | $0          |
| Supabase    | 500MB 数据库     | ~100MB      | $0          |
| **总计**    | -                | -           | **$0/月**   |

---

## 9. 自动部署

### GitHub Actions

项目已配置 `.github/workflows/` 自动部署：

- 推送到 `main` 分支自动触发部署
- Vercel 和 Railway 都支持自动部署

---

## 推荐选择

| 方案 | 难度 | 成本 | 适合场景 |
|------|------|------|----------|
| Vercel + Railway + Supabase | ⭐⭐ | 免费 | 全栈应用，推荐 |
| 仅 Vercel | ⭐ | 免费 | 纯前端，无后端需求 |

**推荐使用完整方案**，实现前后端分离部署。