import { Request, Response } from 'express'
import prisma from '../utils/db.js'
import { success, notFound } from '../utils/response.js'

export async function recordView(req: Request, res: Response): Promise<void> {
  const { postId } = req.params

  const post = await prisma.post.findUnique({ where: { id: postId } })
  if (!post) {
    return notFound(res, '文章不存在')
  }

  const ip = req.ip || req.socket.remoteAddress || null
  const userAgent = req.headers['user-agent'] || null

  await Promise.all([
    prisma.viewLog.create({
      data: { postId, ip, userAgent },
    }),
    prisma.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    }),
  ])

  success(res, { message: '记录成功' })
}

export async function getPopularPosts(req: Request, res: Response): Promise<void> {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10))

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { viewCount: 'desc' },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      viewCount: true,
      coverImage: true,
      excerpt: true,
      createdAt: true,
    },
  })

  success(res, posts)
}

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  const [
    totalPosts,
    publishedPosts,
    totalComments,
    pendingComments,
    totalViews,
    recentPosts,
    viewsTrend,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.comment.count(),
    prisma.comment.count({ where: { status: 'pending' } }),
    prisma.viewLog.count(),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { viewCount: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        viewCount: true,
        createdAt: true,
      },
    }),
    prisma.viewLog.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: { createdAt: 'desc' },
      take: 7,
    }),
  ])

  success(res, {
    totalPosts,
    publishedPosts,
    draftPosts: totalPosts - publishedPosts,
    totalComments,
    pendingComments,
    totalViews,
    recentPosts,
    viewsTrend,
  })
}