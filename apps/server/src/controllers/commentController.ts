import { Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../utils/db.js'

const createCommentSchema = z.object({
  content: z.string().min(1),
  author: z.string().min(1),
  email: z.string().email(),
  website: z.string().optional(),
  postId: z.string(),
  parentId: z.string().optional(),
})

export async function getCommentsByPost(req: Request, res: Response) {
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

  res.json(comments)
}

export async function createComment(req: Request, res: Response) {
  try {
    const data = createCommentSchema.parse(req.body)

    const post = await prisma.post.findUnique({ where: { id: data.postId } })
    if (!post) {
      return res.status(404).json({ error: '文章不存在' })
    }

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        author: data.author,
        email: data.email,
        website: data.website,
        postId: data.postId,
        parentId: data.parentId,
        status: 'pending',
      },
    })

    res.status(201).json(comment)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: '输入数据格式错误', details: error.errors })
    }
    res.status(500).json({ error: '服务器错误' })
  }
}

export async function getComments(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || 20
  const status = req.query.status as string | undefined

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

  res.json({ data: comments, total, page, pageSize })
}

export async function updateCommentStatus(req: Request, res: Response) {
  const { id } = req.params
  const { status } = req.body

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: '无效的状态' })
  }

  const comment = await prisma.comment.update({
    where: { id },
    data: { status },
  })

  res.json(comment)
}

export async function deleteComment(req: Request, res: Response) {
  const { id } = req.params

  await prisma.comment.delete({ where: { id } })
  res.json({ message: '删除成功' })
}
