<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- components/SearchModal.vue -->
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        @click="close"
      >
        <div
          class="fixed inset-x-4 top-[20%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- 搜索输入 -->
          <div class="flex items-center px-4 py-3 border-b border-gray-200">
            <Icon
              name="lucide:search"
              class="w-5 h-5 text-gray-400"
            />
            <input
              ref="inputRef"
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="flex-1 ml-3 outline-none text-lg placeholder:text-gray-400"
              @keydown.esc="close"
            >
            <kbd class="hidden md:inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">
              <span>ESC</span>
            </kbd>
          </div>

          <!-- 搜索结果 -->
          <div class="max-h-[60vh] overflow-y-auto p-2">
            <div
              v-if="pending"
              class="p-8 text-center text-gray-500"
            >
              <Icon
                name="lucide:loader-2"
                class="w-6 h-6 animate-spin mx-auto"
              />
              <p class="mt-2">
                搜索中...
              </p>
            </div>

            <div
              v-else-if="results?.length === 0"
              class="p-8 text-center text-gray-500"
            >
              <Icon
                name="lucide:file-x"
                class="w-8 h-8 mx-auto mb-2"
              />
              <p>未找到相关文章</p>
            </div>

            <div
              v-else
              class="space-y-1"
            >
              <NuxtLink
                v-for="result in results"
                :key="result.id"
                :to="result.path"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                @click="close"
              >
                <Icon
                  :name="result.type === 'blog' ? 'lucide:file-text' : 'lucide:page'"
                  class="w-5 h-5 text-gray-400 mt-0.5 group-hover:text-primary"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 truncate">{{ result.title }}</h3>
                  <p class="text-sm text-gray-500 line-clamp-1">{{ result.description }}</p>
                  <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{{ formatDate(result.date) }}</span>
                    <span v-if="result.readingTime">· {{ result.readingTime }} 分钟阅读</span>
                  </div>
                </div>
                <Icon
                  name="lucide:arrow-right"
                  class="w-4 h-4 text-gray-300 group-hover:text-primary"
                />
              </NuxtLink>
            </div>
          </div>

          <!-- 底部提示 -->
          <div class="flex items-center justify-between px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-white rounded border">↑</kbd>
                <kbd class="px-1.5 py-0.5 bg-white rounded border">↓</kbd>
                <span>选择</span>
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-white rounded border">↵</kbd>
                <span>打开</span>
              </span>
            </div>
            <span>{{ results?.length || 0 }} 个结果</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface SearchResult {
  id: string
  title: string
  description: string
  path: string
  type: string
  date: string
  readingTime?: number
}

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const searchQuery = ref('')
const inputRef = ref<HTMLInputElement>()

// 搜索逻辑
const { data: results, pending } = await useAsyncData(
  'search',
  () => queryCollectionSearchSections('content', {
    ignoredTags: ['style', 'script'],
  }),
  {
    server: false,
    transform: (data): SearchResult[] => {
      if (!searchQuery.value) return []
      return data
        .filter(item =>
          item.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
          || item.content?.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
        .map(item => ({
          id: item.id,
          title: item.title,
          description: item.content?.slice(0, 100) + '...',
          path: item.id,
          type: item.id.startsWith('/blog') ? 'blog' : 'page',
          date: (item as { date?: string }).date || '',
          readingTime: (item as { readingTime?: number }).readingTime,
        }))
    },
    watch: [searchQuery],
  },
)

// 自动聚焦
watch(() => props.open, (val) => {
  if (val) {
    nextTick(() => inputRef.value?.focus())
  }
  else {
    searchQuery.value = ''
  }
})

const close = () => emit('update:open', false)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
