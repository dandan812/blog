# 壁纸 API 后端实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 复刻咸虾米壁纸 API 核心功能，包含分类、壁纸、用户系统

**Architecture:** 
- 基于 Express + Prisma + Supabase 架构
- 图片存储使用阿里云 OSS
- 用户识别基于 IP + access-key 验证

**Tech Stack:** Express, TypeScript, Prisma, Supabase (PostgreSQL), 阿里云 OSS

---

## 进度记录

| 日期 | 完成内容 | 状态 |
|------|---------|------|
| 2026-03-17 | 创建实施计划 | ✅ |
| | | |

---

## 数据库设计

### 新增模型

```prisma
model Category {
  id         String    @id @default(cuid())
  name       String
  sort       Int       @default(0)
  picurl     String
  select     Boolean   @default(false)
  wallpapers Wallpaper[]
  updatedAt  DateTime  @updatedAt
  createdAt  DateTime  @default(now())

  @@index([select])
  @@index([sort])
}

model Wallpaper {
  id          String     @id @default(cuid())
  description String?
  picurl      String
  smallPicurl String
  classid     String
  category    Category   @relation(fields: [classid], references: [id])
  tabs        String[]
  score       Float      @default(0)
  scoreCount  Int        @default(0)
  nickname    String?
  downloads   Int        @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  scores      WallpaperScore[]
  downloadLogs DownloadLog[]

  @@index([classid])
  @@index([createdAt])
}

model WallpaperScore {
  id         String   @id @default(cuid())
  wallpaperId String
  wallpaper  Wallpaper @relation(fields: [wallpaperId], references: [id])
  score      Int
  ip         String
  createdAt  DateTime @default(now())

  @@unique([wallpaperId, ip])
}

model DownloadLog {
  id          String   @id @default(cuid())
  wallpaperId String
  wallpaper   Wallpaper @relation(fields: [wallpaperId], references: [id])
  ip          String
  createdAt   DateTime @default(now())

  @@index([ip])
}

model Banner {
  id        String   @id @default(cuid())
  picurl    String
  link      String?
  sort      Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}
```

---

## API 接口设计

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 分类列表 | GET | /api/wallpaper/classify | 分页获取分类 |
| 壁纸列表 | GET | /api/wallpaper/list | 按分类获取壁纸 |
| 壁纸详情 | GET | /api/wallpaper/detail/:id | 单个壁纸详情 |
| 随机壁纸 | GET | /api/wallpaper/random | 随机9张壁纸 |
| 搜索壁纸 | GET | /api/wallpaper/search | 搜索壁纸 |
| 壁纸评分 | POST | /api/wallpaper/score | 评分 |
| 记录下载 | POST | /api/wallpaper/download | 记录下载 |
| 用户信息 | GET | /api/wallpaper/userInfo | IP定位+统计 |
| 用户历史 | GET | /api/wallpaper/userHistory | 评分/下载历史 |
| 首页轮播 | GET | /api/wallpaper/banners | 首页轮播图 |

---

## Task 1: 数据库模型设计

**Files:**
- Modify: `apps/server/prisma/schema.prisma`

**Step 1: 添加壁纸相关模型**

在现有 schema.prisma 末尾添加：

```prisma
model Category {
  id         String     @id @default(cuid())
  name       String
  sort       Int        @default(0)
  picurl     String
  select     Boolean    @default(false)
  wallpapers Wallpaper[]
  updatedAt  DateTime   @updatedAt
  createdAt  DateTime   @default(now())

  @@index([select])
  @@index([sort])
}

model Wallpaper {
  id           String          @id @default(cuid())
  description  String?
  picurl       String
  smallPicurl  String
  classid      String
  category     Category        @relation(fields: [classid], references: [id])
  tabs         String[]
  score        Float           @default(0)
  scoreCount   Int             @default(0)
  nickname     String?
  downloads    Int             @default(0)
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
  scores       WallpaperScore[]
  downloadLogs DownloadLog[]

  @@index([classid])
  @@index([createdAt])
}

model WallpaperScore {
  id          String    @id @default(cuid())
  wallpaperId String
  wallpaper   Wallpaper @relation(fields: [wallpaperId], references: [id], onDelete: Cascade)
  score       Int
  ip          String
  createdAt   DateTime  @default(now())

  @@unique([wallpaperId, ip])
}

model DownloadLog {
  id          String    @id @default(cuid())
  wallpaperId String
  wallpaper   Wallpaper @relation(fields: [wallpaperId], references: [id], onDelete: Cascade)
  ip          String
  createdAt   DateTime  @default(now())

  @@index([ip])
  @@index([createdAt])
}

model Banner {
  id        String   @id @default(cuid())
  picurl    String
  link      String?
  sort      Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())

  @@index([active])
}
```

**Step 2: 执行数据库迁移**

```bash
cd apps/server
npx prisma migrate dev --name add_wallpaper_models
```

**Step 3: 验证迁移**

```bash
npx prisma studio
```

---

## Task 2: 配置阿里云 OSS

**Files:**
- Create: `apps/server/src/utils/oss.ts`
- Modify: `apps/server/src/utils/config.ts`
- Modify: `apps/server/.env.example`

**Step 1: 安装 OSS SDK**

```bash
cd apps/server
pnpm add ali-oss
pnpm add -D @types/ali-oss
```

**Step 2: 更新 config.ts 添加 OSS 配置**

```typescript
oss: {
  region: process.env.OSS_REGION || 'oss-cn-hangzhou',
  bucket: process.env.OSS_BUCKET || '',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
  endpoint: process.env.OSS_ENDPOINT || '',
}
```

**Step 3: 创建 oss.ts 工具类**

```typescript
import OSS from 'ali-oss'
import { config } from './config.js'

const client = new OSS({
  region: config.oss.region,
  bucket: config.oss.bucket,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
})

export async function uploadToOSS(filename: string, buffer: Buffer): Promise<string> {
  const result = await client.put(filename, buffer)
  return result.url
}

export function getOSSSignedUrl(filename: string, expires: number = 3600): string {
  return client.signatureUrl(filename, { expires })
}
```

---

## Task 3: access-key 中间件

**Files:**
- Create: `apps/server/src/middlewares/accessKey.ts`

**Step 1: 创建 access-key 验证中间件**

```typescript
import { Request, Response, NextFunction } from 'express'

const VALID_ACCESS_KEY = process.env.ACCESS_KEY || '123456'

export function accessKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.headers['access-key'] as string
  
  if (!key || key !== VALID_ACCESS_KEY) {
    return res.status(401).json({
      errCode: 401,
      errMsg: '无效的访问密钥',
    })
  }
  
  next()
}
```

---

## Task 4: IP 定位工具

**Files:**
- Create: `apps/server/src/utils/ipLocation.ts`

**Step 1: 创建 IP 定位工具**

```typescript
import axios from 'axios'

interface LocationResult {
  country: string
  province: string
  city: string
}

export async function getIPLocation(ip: string): Promise<LocationResult> {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`)
    
    if (response.data.status === 'success') {
      return {
        country: response.data.country || '未知',
        province: response.data.regionName || '未知',
        city: response.data.city || '未知',
      }
    }
    
    return { country: '未知', province: '未知', city: '未知' }
  } catch {
    return { country: '未知', province: '未知', city: '未知' }
  }
}

export function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || '127.0.0.1'
}
```

---

## Task 5: 分类接口

**Files:**
- Create: `apps/server/src/routes/wallpaper.ts`
- Create: `apps/server/src/controllers/wallpaperController.ts`

**Step 1: 创建壁纸路由**

```typescript
import { Router } from 'express'
import { accessKeyMiddleware } from '../middlewares/accessKey.js'
import * as controller from '../controllers/wallpaperController.js'

const router = Router()

router.get('/classify', accessKeyMiddleware, controller.getClassify)
router.get('/list', accessKeyMiddleware, controller.getWallpaperList)
router.get('/detail/:id', accessKeyMiddleware, controller.getWallpaperDetail)
router.get('/random', accessKeyMiddleware, controller.getRandomWallpaper)
router.get('/search', accessKeyMiddleware, controller.searchWallpaper)
router.post('/score', accessKeyMiddleware, controller.setupScore)
router.post('/download', accessKeyMiddleware, controller.recordDownload)
router.get('/userInfo', accessKeyMiddleware, controller.getUserInfo)
router.get('/userHistory', accessKeyMiddleware, controller.getUserHistory)
router.get('/banners', accessKeyMiddleware, controller.getBanners)

export default router
```

**Step 2: 创建控制器 - 分类列表**

```typescript
import { Request, Response } from 'express'
import { prisma } from '../utils/prisma.js'

export async function getClassify(req: Request, res: Response) {
  try {
    const { pageNum = 1, pageSize = 8, select } = req.query
    
    let where = {}
    if (select === 'true') {
      where = { select: true }
    }
    
    const skip = (Number(pageNum) - 1) * Number(pageSize)
    
    const [data, total] = await Promise.all([
      prisma.category.findMany({
        where,
        orderBy: { sort: 'asc' },
        skip: select === 'true' ? undefined : skip,
        take: select === 'true' ? undefined : Number(pageSize),
      }),
      prisma.category.count({ where }),
    ])
    
    res.json({
      errCode: 0,
      errMsg: '查询成功',
      data,
      total,
    })
  } catch (error) {
    res.status(500).json({
      errCode: 500,
      errMsg: '服务器错误',
    })
  }
}
```

---

## Task 6: 壁纸列表接口

```typescript
export async function getWallpaperList(req: Request, res: Response) {
  try {
    const { classid, pageNum = 1, pageSize = 9 } = req.query
    
    if (!classid) {
      return res.json({
        errCode: 400,
        errMsg: '缺少分类ID',
      })
    }
    
    const skip = (Number(pageNum) - 1) * Number(pageSize)
    
    const [data, total] = await Promise.all([
      prisma.wallpaper.findMany({
        where: { classid: String(classid) },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(pageSize),
        select: {
          id: true,
          description: true,
          smallPicurl: true,
          tabs: true,
          score: true,
          nickname: true,
          classid: true,
        },
      }),
      prisma.wallpaper.count({ where: { classid: String(classid) } }),
    ])
    
    res.json({
      errCode: 0,
      errMsg: '查询成功',
      data,
      total,
    })
  } catch (error) {
    res.status(500).json({ errCode: 500, errMsg: '服务器错误' })
  }
}
```

---

## Task 7: 随机壁纸接口

```typescript
export async function getRandomWallpaper(req: Request, res: Response) {
  try {
    const count = await prisma.wallpaper.count()
    const skip = Math.floor(Math.random() * Math.max(0, count - 9))
    
    const data = await prisma.wallpaper.findMany({
      take: 9,
      skip,
      select: {
        id: true,
        smallPicurl: true,
        description: true,
        tabs: true,
      },
    })
    
    res.json({
      errCode: 0,
      errMsg: '查询成功',
      data,
    })
  } catch (error) {
    res.status(500).json({ errCode: 500, errMsg: '服务器错误' })
  }
}
```

---

## Task 8: 壁纸评分接口

```typescript
import { getClientIP } from '../utils/ipLocation.js'

export async function setupScore(req: Request, res: Response) {
  try {
    const { wallpaperId, score } = req.body
    const ip = getClientIP(req)
    
    if (!wallpaperId || !score || score < 1 || score > 5) {
      return res.json({
        errCode: 400,
        errMsg: '参数错误',
      })
    }
    
    const existing = await prisma.wallpaperScore.findUnique({
      where: {
        wallpaperId_ip: { wallpaperId, ip },
      },
    })
    
    if (existing) {
      return res.json({
        errCode: 400,
        errMsg: '您已评分过',
      })
    }
    
    await prisma.$transaction([
      prisma.wallpaperScore.create({
        data: { wallpaperId, score, ip },
      }),
      prisma.wallpaper.update({
        where: { id: wallpaperId },
        data: {
          scoreCount: { increment: 1 },
        },
      }),
    ])
    
    const wallpaper = await prisma.wallpaper.findUnique({
      where: { id: wallpaperId },
      include: { _count: { select: { scores: true } } },
    })
    
    if (wallpaper) {
      const avgScore = await prisma.wallpaperScore.aggregate({
        where: { wallpaperId },
        _avg: { score: true },
      })
      
      await prisma.wallpaper.update({
        where: { id: wallpaperId },
        data: { score: avgScore._avg.score || 0 },
      })
    }
    
    res.json({
      errCode: 0,
      errMsg: '评分成功',
    })
  } catch (error) {
    res.status(500).json({ errCode: 500, errMsg: '服务器错误' })
  }
}
```

---

## Task 9: 用户信息接口

```typescript
import { getIPLocation, getClientIP } from '../utils/ipLocation.js'

export async function getUserInfo(req: Request, res: Response) {
  try {
    const ip = getClientIP(req)
    const address = await getIPLocation(ip)
    
    const [downloadSize, scoreSize] = await Promise.all([
      prisma.downloadLog.count({ where: { ip } }),
      prisma.wallpaperScore.count({ where: { ip } }),
    ])
    
    res.json({
      errCode: 0,
      errMsg: '查询成功',
      data: {
        IP: ip,
        address,
        downloadSize,
        scoreSize,
      },
    })
  } catch (error) {
    res.status(500).json({ errCode: 500, errMsg: '服务器错误' })
  }
}
```

---

## Task 10: 注册路由到应用

**Files:**
- Modify: `apps/server/src/app.ts`

**Step 1: 添加壁纸路由**

```typescript
app.use('/api/wallpaper', (await import('./routes/wallpaper.js')).default)
```

---

## Task 11: 种子数据

**Files:**
- Create: `apps/server/src/seedWallpaper.ts`

创建测试数据脚本，包含分类和壁纸示例数据。

---

## 部署配置

**环境变量:**

```env
# OSS
OSS_REGION=oss-cn-hangzhou
OSS_BUCKET=your-bucket-name
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret

# Access Key
ACCESS_KEY=123456
```

---

## 预计完成时间

| 任务 | 预计时间 |
|------|---------|
| Task 1: 数据库模型 | 0.5 小时 |
| Task 2: OSS 配置 | 0.5 小时 |
| Task 3: 中间件 | 0.5 小时 |
| Task 4: IP 定位 | 0.5 小时 |
| Task 5-9: 接口开发 | 2 小时 |
| Task 10-11: 集成测试 | 0.5 小时 |

**总计: 约 4-5 小时**