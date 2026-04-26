import { queryCollection } from '@nuxt/content/server'

/**
 * 服务端按 slug 读取本地 Markdown 文章，供客户端路由跳转时使用。
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  return await queryCollection(event, 'content')
    .path(`/blog/${slug}`)
    .first()
})
