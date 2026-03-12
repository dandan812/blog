import { Request, Response } from 'express'
import prisma from '../utils/db.js'

export async function recordView(req: Request, res: Response) {
  const { postId } = req.params
  const ip = req.ip || req.socket.remoteAddress
  const userAgent = req.headers['user-agent']

  await Promise.all([
    prisma.viewLog.create({
      data: { postId, ip, userAgent },
    }),
    prisma.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    }),
  ])

  res.json({ message: '记录成功' })
}

export async function getPopularPosts(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string) || 10

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
      createdAt: true,
    },
  })

  res.json(posts)
}

export async function getDashboardStats(req: Request, res: Response) {
  const [
    totalPosts,
    publishedPosts,
    totalComments,
    pendingComments,
    totalViews,
    recentPosts,
    recentViews,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.comment.count(),
    prisma.comment.count({ where: { status: 'pending' } }),
    prisma.viewLog.count(),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, viewCount: true, createdAt: true },
    }),
    prisma.viewLog.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: { createdAt: 'desc' },
      take: 7,
    }),
  ])

  res.json({
    totalPosts,
    publishedPosts,
    draftPosts: totalPosts - publishedPosts,
    totalComments,
    pendingComments,
    totalViews,
    recentPosts,
    viewsTrend: recentViews,
  })
}
