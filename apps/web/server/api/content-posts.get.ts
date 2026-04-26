/**
 * 服务端读取本地 Markdown 文章列表，避免客户端直接加载 Nuxt Content sqlite 数据。
 */
export default defineEventHandler(async () => {
  const posts = await queryCollection('content')
    .order('date', 'DESC')
    .all()

  return (posts || []).filter(item => Boolean(item?.path))
})
