export default defineNuxtRouteMiddleware((to) => {
  const siteName = 'My Blog'

  const routeConfig: Record<string, { title: string, description: string }> = {
    '/': {
      title: '思考·创造·分享',
      description: '个人技术博客，专注于前端开发、Vue、Nuxt、JavaScript等技术实践分享',
    },
    '/blog': {
      title: '博客文章',
      description: '探索前端开发、Vue生态和软件工程的技术文章',
    },
    '/about': {
      title: '关于',
      description: '了解更多关于这个博客和技术作者的信息',
    },
  }

  const config = routeConfig[to.path]
  if (!config) return

  useSeoMeta({
    title: config.title,
    description: config.description,
    ogSiteName: siteName,
    ogType: 'website',
    ogTitle: config.title,
    ogDescription: config.description,
    twitterCard: 'summary_large_image',
    twitterTitle: config.title,
    twitterDescription: config.description,
  })
})
