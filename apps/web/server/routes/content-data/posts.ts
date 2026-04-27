import { queryCollection } from '@nuxt/content/server'

/**
 * 静态部署时输出文章列表，避免与 Vercel 的 /api 路由保留前缀冲突。
 */
export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'content')
    .order('date', 'DESC')
    .all()

  return (posts || []).filter(item => Boolean(item?.path))
})
