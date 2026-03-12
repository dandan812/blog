import { Router } from 'express'
import type { Router as RouterType } from 'express'
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js'
import { authMiddleware, requireAdmin } from '../middlewares/auth.js'

const router: RouterType = Router()

router.get('/', getPosts)
router.get('/:slug', getPostBySlug)
router.post('/', authMiddleware, requireAdmin, createPost)
router.put('/:id', authMiddleware, requireAdmin, updatePost)
router.delete('/:id', authMiddleware, requireAdmin, deletePost)

export default router
