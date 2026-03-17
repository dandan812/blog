import { ref, reactive, type Ref, type Reactive } from 'vue'

interface Pagination {
  page: number
  pageSize: number
  total: number
}

interface UseListReturn<T> {
  loading: Ref<boolean>
  data: Ref<T[]>
  pagination: Reactive<Pagination>
  fetchData: () => Promise<void>
}

export function useList<T>(
  fetchFn: (page: number, pageSize: number) => Promise<{ data: T[]; total: number }>,
  defaultPageSize = 10
): UseListReturn<T> {
  const loading = ref(false)
  const data = ref<T[]>([]) as Ref<T[]>
  const pagination = reactive<Pagination>({
    page: 1,
    pageSize: defaultPageSize,
    total: 0,
  })

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await fetchFn(pagination.page, pagination.pageSize)
      data.value = res.data
      pagination.total = res.total
    } finally {
      loading.value = false
    }
  }

  return { loading, data, pagination, fetchData }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}