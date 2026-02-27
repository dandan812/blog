// plugins/seo-enhance.client.ts
export default defineNuxtPlugin({
  name: 'seo-enhance',
  setup() {
    if (import.meta.client) {
      // 动态更新页面标题和meta信息当路由变化时
      const router = useRouter()

      router.afterEach((to) => {
        // 检查页面加载时间并在头部添加性能元数据
        if ((window as any).__PAGE_LOAD_START__) {
          const loadTime = Math.round(performance.now() - (window as any).__PAGE_LOAD_START__)

          // 只在开发环境中添加性能指标
          if (process.env.NODE_ENV === 'development' || import.meta.dev) {
            console.info(`页面加载耗时: ${loadTime}ms`)
          }

          delete (window as any).__PAGE_LOAD_START__
        }

        // 添加结构化数据（Schema.org）
        const updateStructuredData = () => {
          // 移除旧的结构化数据
          const existingSchema = document.querySelector('script[type="application/ld+json"]')
          if (existingSchema) {
            existingSchema.remove()
          }

          // 为不同类型的页面创建结构化数据
          if (to.path.startsWith('/blog/')) {
            // 博客文章详情页的结构化数据
            const schema = {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              'headline': document.title,
              'description':
                document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
              'author': {
                '@type': 'Person',
                'name': '博主',
              },
              'publisher': {
                '@type': 'Organization',
                'name': 'My Blog',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://blog-eight-gamma-66.vercel.app/logo.png',
                },
              },
              'datePublished': new Date().toISOString(),
              'dateModified': new Date().toISOString(),
            }

            const schemaScript = document.createElement('script')
            schemaScript.type = 'application/ld+json'
            schemaScript.textContent = JSON.stringify(schema)
            document.head.appendChild(schemaScript)
          }
          else {
            // 其他页面的默认结构化数据
            const schema = {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'name': document.title,
              'description':
                document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
              'url': window.location.origin + to.path,
              'publisher': {
                '@type': 'Organization',
                'name': 'My Blog',
              },
            }

            const schemaScript = document.createElement('script')
            schemaScript.type = 'application/ld+json'
            schemaScript.textContent = JSON.stringify(schema)
            document.head.appendChild(schemaScript)
          }
        }

        // 由于内容可能是异步加载，需要等到DOM准备好
        nextTick(() => {
          setTimeout(updateStructuredData, 100) // 稍微延迟以确保meta数据已被更新
        })
      })

      // 页面可见性发生变化时的处理
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          // 从后台回来时，可能需要更新时间等数据
          // 这里可以添加刷新某些时效性数据的逻辑
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      // 页面卸载前清理事件监听器
      onUnmounted(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      })
    }
  },
})
