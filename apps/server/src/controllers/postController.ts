import { Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../utils/db.js'
import { config } from '../utils/config.js'
import { success, error, serverError, notFound } from '../utils/response.js'
import type { AuthRequest } from '../middlewares/auth.js'

const imageDataUrlPattern = /^data:image\/[a-zA-Z0-9.+-]+;base64,([A-Za-z0-9+/]+={0,2})$/

function isValidCoverImage(value: string): boolean {
  if (value === '') return true

  try {
    const url = new URL(value)
    if (url.protocol === 'http:' || url.protocol === 'https:') return true
  } catch {
    // 不是普通 URL 时继续按 data URL 校验。
  }

  const match = imageDataUrlPattern.exec(value)
  if (!match) return false

  const [, base64Data] = match
  return base64Data.length > 0 && Buffer.from(base64Data, 'base64').length > 0
}

const coverImageSchema = z
  .string()
  .trim()
  .refine(isValidCoverImage, '封面图片URL格式不正确')
  .optional()

function normalizeCoverImage(value?: string): string | null {
  return value ? value : null
}

const createPostSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(1, '内容不能为空'),
  excerpt: z.string().optional(),
  coverImage: coverImageSchema,
  published: z.boolean().optional(),
  tagIds: z.array(z.string()).optional(),
})

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  coverImage: coverImageSchema,
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

function parseQueryParams(req: Request) {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const pageSize = Math.min(
    config.pagination.maxPageSize,
    parseInt(req.query.pageSize as string) || config.pagination.defaultPageSize
  )
  const published =
    req.query.published === 'true'
      ? true
      : req.query.published === 'false'
        ? false
        : undefined

  return { page, pageSize, published }
}

export async function getPosts(req: Request, res: Response): Promise<void> {
  const { page, pageSize, published } = parseQueryParams(req)
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

  success(res, {
    data: posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  })
}

export async function getPostBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: true,
      comments: {
        where: { status: 'approved', parentId: null },
        include: { replies: { where: { status: 'approved' } } },
      },
    },
  })

  if (!post) {
    return notFound(res, '文章不存在')
  }

  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  })

  success(res, post)
}

export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const data = createPostSchema.parse(req.body)
    const authReq = req as AuthRequest

    if (!authReq.user) {
      return error(res, '未授权', 401)
    }

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
        coverImage: normalizeCoverImage(data.coverImage),
        published: data.published ?? false,
        authorId: authReq.user.userId,
        tags: data.tagIds ? { connect: data.tagIds.map(id => ({ id })) } : undefined,
      },
      include: { tags: true },
    })

    success(res, post, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error(res, '输入数据格式错误', 400, err.errors)
    }
    serverError(res)
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const data = updatePostSchema.parse(req.body)

    const existing = await prisma.post.findUnique({ where: { id } })
    if (!existing) {
      return notFound(res, '文章不存在')
    }

    const updateData: Record<string, unknown> = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.content !== undefined) updateData.content = data.content
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt
    if (data.coverImage !== undefined) updateData.coverImage = normalizeCoverImage(data.coverImage)
    if (data.published !== undefined) updateData.published = data.published
    if (data.tagIds !== undefined) {
      updateData.tags = { set: data.tagIds.map(id => ({ id })) }
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
      include: { tags: true },
    })

    success(res, post)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error(res, '输入数据格式错误', 400, err.errors)
    }
    serverError(res)
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  const { id } = req.params

  const existing = await prisma.post.findUnique({ where: { id } })
  if (!existing) {
    return notFound(res, '文章不存在')
  }

  await prisma.post.delete({ where: { id } })
  success(res, { message: '删除成功' })
}
