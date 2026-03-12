<!-- error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
    <div class="text-center max-w-md mx-auto">
      <div class="text-9xl font-bold text-black/10 mb-6">
        {{ error.statusCode }}
      </div>
      <h1 class="text-2xl font-bold text-black mb-4">
        {{ error.message || '页面未找到' }}
      </h1>
      <p class="text-black/40 mb-8">
        {{ errorMessage }}
      </p>
      <div class="space-y-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-black/80 transition-colors w-full max-w-xs mx-auto"
        >
          <Icon
            name="lucide:home"
            class="w-4 h-4"
          />
          返回首页
        </NuxtLink>
        <button
          v-if="canRetry"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 transition-colors w-full max-w-xs mx-auto"
          @click="handleRetry"
        >
          <Icon
            name="lucide:refresh-cw"
            class="w-4 h-4"
          />
          重新尝试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorObject {
  statusCode?: number
  message?: string
  fatal?: boolean
}

const props = defineProps<{
  error: ErrorObject
}>()

const canRetry = computed(() => {
  return props.error.statusCode && [404, 500, 502, 503, 504].includes(props.error.statusCode)
})

const errorMessage = computed(() => {
  if (props.error.message) return props.error.message

  switch (props.error.statusCode) {
    case 404:
      return '抱歉，您访问的页面不存在'
    case 500:
      return '服务器内部错误，请稍后重试'
    case 502:
      return '网络错误，请检查网络连接'
    case 503:
      return '服务暂时不可用，请稍后再试'
    case 504:
      return '请求超时，请稍后再试'
    default:
      return '发生了未知错误'
  }
})

const handleRetry = () => {
  if (import.meta.client) {
    window.location.reload()
  }
}

// 页面 SEO 配置
useHead({
  title: `${props.error.statusCode || 500} - 错误`,
  meta: [{ name: 'robots', content: 'noindex,follow' }],
})
</script>
