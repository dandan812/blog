import { Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../utils/db.js'

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
  tagIds: z.array(z.string()).optional(),
})

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
  tagIds: z.array(z.string()).optional(),
})

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

export async function getPosts(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || 10
  const published =
    req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined

  const where = published !== undefined ? { published } : {}

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, email: true } },
        tags: true,
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ])

  res.json({
    data: posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  })
}

export async function getPostBySlug(req: Request, res: Response) {
  const { slug } = req.params

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: true,
      comments: {
        where: { status: 'approved' },
        include: { replies: true },
      },
    },
  })

  if (!post) {
    return res.status(404).json({ error: '文章不存在' })
  }

  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  })

  res.json(post)
}

export async function createPost(req: Request, res: Response) {
  try {
    const data = createPostSchema.parse(req.body)
    const user = (req as any).user

    let slug = generateSlug(data.title)
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        published: data.published ?? false,
        authorId: user.userId,
        tags: data.tagIds ? { connect: data.tagIds.map((id) => ({ id })) } : undefined,
      },
      include: { tags: true },
    })

    res.status(201).json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: '输入数据格式错误', details: error.errors })
    }
    res.status(500).json({ error: '服务器错误' })
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = updatePostSchema.parse(req.body)

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        tags: data.tagIds ? { set: data.tagIds.map((id) => ({ id })) } : undefined,
      },
      include: { tags: true },
    })

    res.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: '输入数据格式错误', details: error.errors })
    }
    res.status(500).json({ error: '服务器错误' })
  }
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params

  await prisma.post.delete({ where: { id } })
  res.json({ message: '删除成功' })
}
