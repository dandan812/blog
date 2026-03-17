import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  cors: {
    origins: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:5173',
    ],
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },

  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
} as const

export function validateConfig(): void {
  if (config.nodeEnv === 'production' && config.jwt.secret === 'default-secret-change-in-production') {
    console.warn('WARNING: Using default JWT secret in production!')
  }
}