// plugins/article-enhancements.client.ts
export default defineNuxtPlugin({
  name: 'article-enhancements',
  setup() {
    if (import.meta.client) {
      // 优化图片懒加载
      const initLazyLoading = () => {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const element = entry.target as HTMLElement | HTMLImageElement

                // 处理 NuxtImg 组件的懒加载
                if (element.tagName === 'IMG' && element.hasAttribute('data-src')) {
                  const img = element as HTMLImageElement
                  img.src = img.getAttribute('data-src')!
                  img.removeAttribute('data-src')

                  // 添加加载动画
                  img.classList.add('loaded')
                }

                imageObserver.unobserve(element)
              }
            })
          })

          // 观察所有带有 data-lazy 属性的图片
          document.querySelectorAll('img[data-src]').forEach((img) => {
            imageObserver.observe(img)
          })
        }
      }

      // 在 DOM 准备好时初始化懒加载
      onNuxtReady(() => {
        nextTick(() => {
          initLazyLoading()
        })
      })

      // 预加载用户可能访问的页面
      const initPrefetching = () => {
        const connection = (navigator as any).connection
        if (connection && connection.saveData) {
          // 用户启用了省流量模式，则不进行预加载
          return
        }

        const observeLinks = () => {
          const linkObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const link = entry.target as HTMLAnchorElement
                const href = link.getAttribute('href')

                // 预加载即将访问的页面
                if (href && (href.startsWith('/') || href.startsWith(location.origin))) {
                  const linkEl = document.createElement('link')
                  linkEl.rel = 'prefetch'
                  linkEl.href = href
                  document.head.appendChild(linkEl)
                }

                linkObserver.unobserve(link)
              }
            })
          })

          // 查找悬停时预测链接
          const links = document.querySelectorAll('a[href]')
          links.forEach((link) => {
            // 当鼠标悬停在外部链接上一段时间时预加载
            let timer: NodeJS.Timeout | number
            const handleMouseEnter = () => {
              timer = setTimeout(() => {
                const href = link.getAttribute('href')
                if (href && (href.startsWith('/') || href.startsWith(location.origin))) {
                  const linkEl = document.createElement('link')
                  linkEl.rel = 'prefetch'
                  linkEl.href = href
                  document.head.appendChild(linkEl)
                }
              }, 300)
            }

            const handleMouseLeave = () => {
              clearTimeout(timer)
            }

            link.addEventListener('mouseenter', handleMouseEnter)
            link.addEventListener('mouseleave', handleMouseLeave)

            // 使用完后清理事件监听器
            onUnmounted(() => {
              link.removeEventListener('mouseenter', handleMouseEnter)
              link.removeEventListener('mouseleave', handleMouseLeave)
            })
          })
        }

        nextTick(() => {
          observeLinks()
        })
      }

      onNuxtReady(() => {
        initPrefetching()
      })
    }
  },
})
