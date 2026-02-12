# 自动部署指南

## 方案一：Vercel（推荐，最简单）

### 1. 推送代码到 GitHub

```bash
# 初始化 git（如果还没做）
git init
git add .
git commit -m "init"

# 创建 GitHub 仓库并推送
git remote add origin https://github.com/dandan812/blog.git
git push -u origin main
```

### 2. Vercel 自动部署

1. 登录 [Vercel](https://vercel.com)（用 GitHub 账号）
2. 点击 "Add New Project"
3. 选择你的 blog 仓库
4. 框架预设选 "Nuxt.js"
5. 点击 Deploy

**完成！** 之后每次 push 代码到 main 分支，Vercel 会自动重新部署。

### 3. 自定义域名（可选）

在 Vercel 项目设置里：
- Settings → Domains
- 添加你的域名（如 blog.yourname.com）
- 按提示配置 DNS

---

## 方案二：GitHub Pages（免费，但有限制）

适合纯静态站点，但 Nuxt 需要额外配置。

### 配置 nuxt.config.ts

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: 'github-pages'
  },
  app: {
    baseURL: '/blog/' // 你的仓库名
  }
})
```

### GitHub Actions 配置

已创建 `.github/workflows/deploy.yml`，push 后会自动部署到 GitHub Pages。

---

## 方案三：自己的服务器（灵活，需要维护）

### 服务器配置

```bash
# 安装 Node.js 和 pnpm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm pm2

# 克隆代码
git clone https://github.com/dandan812/blog.git
cd blog
pnpm install
pnpm build

# PM2 启动
pm2 start .output/server/index.mjs --name blog
```

### 自动部署脚本

服务器上创建 `deploy.sh`：

```bash
#!/bin/bash
cd /var/www/blog
git pull origin main
pnpm install
pnpm build
pm2 restart blog
```

GitHub Actions 配置 SSH 自动执行这个脚本。

---

## 推荐选择

| 方案 | 难度 | 成本 | 适合场景 |
|------|------|------|----------|
| Vercel | ⭐ 最简单 | 免费 | 个人博客，快速上线 |
| GitHub Pages | ⭐⭐ 简单 | 免费 | 纯静态，无服务端需求 |
| 自己的服务器 | ⭐⭐⭐⭐ 复杂 | 付费 | 需要完整控制，有后端服务 |

**新手建议用 Vercel**，5 分钟搞定，自动 HTTPS，全球 CDN。
