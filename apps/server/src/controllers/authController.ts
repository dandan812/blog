import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '../utils/db.js'
import { generateToken } from '../utils/jwt.js'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = registerSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: '邮箱已被注册' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'admin' },
    })

    const token = generateToken({ userId: user.id, email: user.email, role: user.role })

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: '输入数据格式错误', details: error.errors })
    }
    res.status(500).json({ error: '服务器错误' })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: '邮箱或密码错误' })
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role })

    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: '输入数据格式错误', details: error.errors })
    }
    res.status(500).json({ error: '服务器错误' })
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  const user = (req as any).user
  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })

  if (!dbUser) {
    return res.status(404).json({ error: '用户不存在' })
  }

  res.json(dbUser)
}
