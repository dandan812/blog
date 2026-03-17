import jwt, { SignOptions } from 'jsonwebtoken'
import { config } from './config.js'
import type { JwtPayload } from '../types/index.js'

export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, config.jwt.secret, options)
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, config.jwt.secret) as JwtPayload
  } catch {
    return null
  }
}