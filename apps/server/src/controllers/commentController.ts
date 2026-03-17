import { Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../utils/db.js'
import { success, error, serverError, notFound } from '../utils/response.js'
import type { CommentStatus } from '../types/index.js'

const createCommentSchema = z.object({
  content: z.string().min(1, '评论内容不能为空'),
  author: z.string().min(1, '请输入昵称'),
  email: z.string().email('邮箱格式不正确'),
  website: z.string().url('网站地址格式不正确').optional().or(z.literal('')),
  postId: z.string().min(1, '文章ID不能为空'),
  parentId: z.string().optional(),
})

const validStatuses: CommentStatus[] = ['pending', 'approved', 'rejected']

export async function getCommentsByPost(req: Request, res: Response): Promise<void> {
  const { postId } = req.params

  const comments = await prisma.comment.findMany({
    where: { postId, status: 'approved', parentId: null },
    include: {
      replies: {
        where: { status: 'approved' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  success(res, comments)
}

export async function createComment(req: Request, res: Response): Promise<void> {
  try {
    const data = createCommentSchema.parse(req.body)

    const post = await prisma.post.findUnique({ where: { id: data.postId } })
    if (!post) {
      return notFound(res, '文章不存在')
    }

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        author: data.author,
        email: data.email,
        website: data.website || null,
        postId: data.postId,
        parentId: data.parentId,
        status: 'pending',
      },
    })

    success(res, comment, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error(res, '输入数据格式错误', 400, err.errors)
    }
    serverError(res)
  }
}

export async function getComments(req: Request, res: Response): Promise<void> {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const pageSize = Math.min(100, parseInt(req.query.pageSize as string) || 20)
  const statusParam = req.query.status as string | undefined

  const status = statusParam && validStatuses.includes(statusParam as CommentStatus)
    ? (statusParam as CommentStatus)
    : undefined

  const where = status ? { status } : {}

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      include: { post: { select: { id: true, title: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.comment.count({ where }),
  ])

  success(res, { data: comments, total, page, pageSize })
}

export async function updateCommentStatus(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const { status } = req.body

  if (!status || !validStatuses.includes(status)) {
    return error(res, '无效的状态值', 400)
  }

  const existing = await prisma.comment.findUnique({ where: { id } })
  if (!existing) {
    return notFound(res, '评论不存在')
  }

  const comment = await prisma.comment.update({
    where: { id },
    data: { status },
  })

  success(res, comment)
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
  const { id } = req.params

  const existing = await prisma.comment.findUnique({ where: { id } })
  if (!existing) {
    return notFound(res, '评论不存在')
  }

  await prisma.comment.delete({ where: { id } })
  success(res, { message: '删除成功' })
}