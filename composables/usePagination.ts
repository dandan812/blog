export const usePagination = (total: number, current: number, pageSize: number) => {
  const totalPages = Math.ceil(total / pageSize) || 1

  const displayedPages = computed(() => {
    if (totalPages <= 1) return []

    const delta = 2
    const range: number[] = []
    const rangeWithDots: number[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
        range.push(i)
      }
    }

    let prev = 0
    for (const i of range) {
      if (prev) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1)
        }
        else if (i - prev !== 1) {
          rangeWithDots.push(-1)
        }
      }
      rangeWithDots.push(i)
      prev = i
    }

    return rangeWithDots
  })

  return {
    totalPages,
    displayedPages,
  }
}
