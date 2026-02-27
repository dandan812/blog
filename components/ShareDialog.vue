<template>
  <div
    v-if="showShareDialog"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-black dark:text-white">分享这篇文章</h3>
        <button
          @click="closeDialog"
          class="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          @click="share('twitter')"
          class="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="lucide:twitter" class="w-5 h-5 text-blue-400" />
          <span class="text-sm">Twitter</span>
        </button>
        <button
          @click="share('linkedin')"
          class="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="lucide:linkedin" class="w-5 h-5 text-blue-600" />
          <span class="text-sm">LinkedIn</span>
        </button>
        <button
          @click="share('facebook')"
          class="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="lucide:facebook" class="w-5 h-5 text-blue-500" />
          <span class="text-sm">Facebook</span>
        </button>
        <button
          @click="copyLink"
          class="flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="lucide:link" class="w-5 h-5" />
          <span class="text-sm">复制链接</span>
        </button>
      </div>

      <div class="mt-6 flex items-center gap-2">
        <input
          v-model="currentUrl"
          readonly
          class="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 text-sm truncate"
        />
        <button
          @click="copyLink"
          class="px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors text-sm"
        >
          复制
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: boolean
    title: string
    url: string
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  const showShareDialog = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
  })

  const currentUrl = computed(() => props.url || window?.location?.href || '')

  const closeDialog = () => {
    showShareDialog.value = false
  }

  const share = (platform: string) => {
    let url = ''
    const encodedUrl = encodeURIComponent(currentUrl.value)
    const encodedTitle = encodeURIComponent(props.title)

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      default:
        return
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl.value)
      // 简单的通知，显示链接已复制
      alert('链接已复制到剪贴板！')
    } catch (err) {
      // 降级方案
      const textarea = document.createElement('textarea')
      textarea.value = currentUrl.value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('链接已复制到剪贴板！')
    }
  }
</script>
