export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined' && typeof performance !== 'undefined') {
    // 监控页面加载完成后的一些基本指标
    window.addEventListener('load', () => {
      // 1秒后输出一些基础性能指标
      setTimeout(() => {
        const perf = performance

        if (perf && 'getEntriesByType' in perf) {
          // 记录导航时间
          const navigationEntries = perf.getEntriesByType('navigation')
          if (navigationEntries && navigationEntries.length > 0) {
            // 简单输出一些可用的数据
            console.log('Navigation Metrics:')
            console.log(
              '- Load Complete Time:',
              Math.round(performance.timing.loadEventEnd - performance.timing.navigationStart),
              'ms',
            )
            console.log(
              '- DOM Ready Time:',
              Math.round(
                performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
              ),
              'ms',
            )
          }

          // 计算累积布局偏移 (CLS)
          let cls = 0
          const layoutShiftEntries = perf.getEntriesByType('layout-shift')

          // 安全地访问 CLS 数据
          for (const entry of layoutShiftEntries) {
            if (entry && (entry as any).value != undefined && !(entry as any).hadRecentInput) {
              cls += (entry as any).value
            }
          }

          console.log('Layout Metrics:')
          console.log('- CLS (Cumulative Layout Shift):', parseFloat(cls.toFixed(3)))
        }
      }, 1000)
    })

    // 提供基础性能标记/测量功能
    return {
      provide: {
        perf: {
          start() {
            if (typeof performance !== 'undefined' && performance.mark) {
              const id = Date.now().toString() + Math.random().toString(36).substr(2, 5)
              performance.mark(`start-${id}`)
              return id
            }
            return null
          },
          end(id: string | null, label: string) {
            if (
              !id
              || typeof performance === 'undefined'
              || !performance.mark
              || !performance.measure
            )
              return

            performance.mark(`end-${id}`)
            performance.measure(label, `start-${id}`, `end-${id}`)

            const measures = performance.getEntriesByName(label)
            if (measures.length > 0) {
              const measure = measures[0]
              console.log(`${label}: ${Math.round(measure.duration)}ms`)
            }
          },
        },
      },
    }
  }

  // 服务端回退
  return {
    provide: {
      perf: {
        start(): null {
          return null
        },
        end(): void {},
      },
    },
  }
})
