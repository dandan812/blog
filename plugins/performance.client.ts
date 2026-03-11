interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
}

interface PerfPlugin {
  start: () => string | null
  end: (id: string | null, label: string) => void
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
}

export default defineNuxtPlugin(() => {
  const emptyPerf: PerfPlugin = {
    start: () => null,
    end: () => {},
  }

  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return { provide: { perf: emptyPerf } }
  }

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('[Performance] LCP:', Math.round(entry.startTime), 'ms')
      }
      if (entry.entryType === 'first-input') {
        console.log('[Performance] FID:', Math.round(entry.processingStart - entry.startTime), 'ms')
      }
      if (entry.entryType === 'layout-shift') {
        const layoutEntry = entry as LayoutShiftEntry
        if (!layoutEntry.hadRecentInput) {
          console.log('[Performance] CLS:', layoutEntry.value.toFixed(4))
        }
      }
    }
  })

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
  }
  catch {
    console.warn('[Performance] Observer not supported')
  }

  onNuxtReady(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      console.log(
        '[Performance] DOM Content Loaded:',
        Math.round(navigation.domContentLoadedEventEnd),
        'ms',
      )
      console.log('[Performance] Load Complete:', Math.round(navigation.loadEventEnd), 'ms')
    }
  })

  const perf: PerfPlugin = {
    start() {
      if (typeof performance === 'undefined' || !performance.mark) return null
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      performance.mark(`start-${id}`)
      return id
    },
    end(id, label) {
      if (!id || typeof performance === 'undefined' || !performance.mark || !performance.measure)
        return
      performance.mark(`end-${id}`)
      performance.measure(label, `start-${id}`, `end-${id}`)
      const measure = performance.getEntriesByName(label)[0]
      if (measure) {
        console.log(`[Performance] ${label}:`, Math.round(measure.duration), 'ms')
      }
    },
  }

  return { provide: { perf } }
})
