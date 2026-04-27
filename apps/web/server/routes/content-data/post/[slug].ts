import { queryCollection } from '@nuxt/content/server'

/**
 * 静态部署时按 slug 输出单篇文章，供客户端详情页兜底读取。
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
