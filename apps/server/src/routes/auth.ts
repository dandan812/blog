import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { register, login, getCurrentUser } from '../controllers/authController.js'
import { authMiddleware } from '../middlewares/auth.js'

const router: RouterType = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getCurrentUser)

export default router
