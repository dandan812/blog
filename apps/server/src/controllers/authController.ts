import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '../utils/db.js'
import { generateToken } from '../utils/jwt.js'
import { success, error, serverError, unauthorized, notFound } from '../utils/response.js'
import type { AuthRequest } from '../middlewares/auth.js'

const registerSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位'),
  name: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(1, '请输入密码'),
})

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = registerSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return error(res, '邮箱已被注册', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'admin' },
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    success(res, {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    }, 201)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error(res, '输入数据格式错误', 400, err.errors)
    }
    serverError(res)
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return unauthorized(res, '邮箱或密码错误')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return unauthorized(res, '邮箱或密码错误')
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    success(res, {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error(res, '输入数据格式错误', 400, err.errors)
    }
    serverError(res)
  }
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const authReq = req as AuthRequest
  const user = authReq.user

  if (!user) {
    return unauthorized(res)
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })

  if (!dbUser) {
    return notFound(res, '用户不存在')
  }

  success(res, dbUser)
}