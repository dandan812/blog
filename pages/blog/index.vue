<!-- eslint-disable vue/comma-dangle -->
<!-- pages/blog/index.vue -->
<template>
  <div class="space-y-12">
    <!-- 页面标题 - 增强版 -->
    <div class="relative py-16 text-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <!-- 背景装饰 -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div class="relative container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          博客文章
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          探索关于前端开发、Vue 生态和软件工程的技术文章
        </p>
      </div>
    </div>

    <!-- 筛选结果统计 -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <Icon
            name="lucide:file-text"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <p class="text-xl font-bold text-gray-900">
            {{ totalFilteredCount }} 篇文章
          </p>
        </div>
      </div>

      <!-- 视图切换 -->
      <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        <button
          :class="[
            'p-2 rounded-lg transition-all duration-300',
            viewMode === 'grid' ? 'bg-white shadow-lg text-purple-600' : 'text-gray-500 hover:text-gray-700'
          ]"
          @click="viewMode = 'grid'"
        >
          <Icon
            name="lucide:grid"
            class="w-5 h-5"
          />
        </button>
        <button
          :class="[
            'p-2 rounded-lg transition-all duration-300',
            viewMode === 'list' ? 'bg-white shadow-lg text-purple-600' : 'text-gray-500 hover:text-gray-700'
          ]"
          @click="viewMode = 'list'"
        >
          <Icon
            name="lucide:list"
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>

    <!-- 文章列表 - 根据视图模式切换 -->
    <div
      v-if="filteredArticles?.length"
      :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-4'"
    >
      <TransitionGroup
        :name="viewMode === 'grid' ? 'article-grid' : 'article-list'"
        tag="div"
        :class="viewMode === 'grid' ? 'contents' : ''"
      >
        <ArticleCard
          v-for="(article, index) in filteredArticles"
          :key="article.path"
          :article="{ ...article, path: article.path as string, date: (article.meta?.date as string) || '', tags: (article.meta?.tags as string[]) || [], readingTime: (article.meta?.readingTime as number) || 0 }"
          :class="viewMode === 'list' ? 'w-full' : ''"
          class="transform transition-all duration-500"
          :style="{ animationDelay: `${index * 0.1}s` }"
        />
      </TransitionGroup>
    </div>

    <!-- 空状态 - 增强版 -->
    <div
      v-else
      class="text-center py-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl"
    >
      <div class="relative inline-block mb-8">
        <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
          <Icon
            name="lucide:file-x"
            class="w-16 h-16 text-gray-400"
          />
        </div>
        <div class="absolute -top-2 -right-2 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Icon
            name="lucide:x"
            class="w-6 h-6 text-red-500"
          />
        </div>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-3">
        没有找到相关文章
      </h3>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        尝试调整筛选条件或搜索关键词，找到你感兴趣的内容
      </p>
      <button
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
        @click="resetFilters"
      >
        <Icon
          name="lucide:rotate-ccw"
          class="w-5 h-5"
        />
        重置筛选
      </button>
    </div>

    <!-- 分页 - 增强版 -->
    <div
      v-if="totalPages > 1"
      class="flex flex-col items-center gap-4"
    >
      <!-- 页码指示器 -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">
          第 {{ filterState.currentPage }} 页，共 {{ totalPages }} 页
        </span>
      </div>

      <!-- 分页按钮 -->
      <div class="flex items-center gap-3">
        <button
          :disabled="filterState.currentPage === 1"
          class="group relative px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          @click="goToPage(1)"
        >
          <Icon
            name="lucide:chevrons-left"
            class="w-5 h-5"
          />
        </button>

        <button
          :disabled="filterState.currentPage === 1"
          class="group relative px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          @click="goToPage(filterState.currentPage - 1)"
        >
          <Icon
            name="lucide:chevron-left"
            class="w-5 h-5"
          />
        </button>

        <!-- 页码列表 -->
        <div class="flex items-center gap-2">
          <button
            v-for="page in displayedPages"
            :key="page"
            :class="[
              'w-10 h-10 rounded-xl font-medium transition-all duration-300',
              page === filterState.currentPage
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="filterState.currentPage === totalPages"
          class="group relative px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          @click="goToPage(filterState.currentPage + 1)"
        >
          <Icon
            name="lucide:chevron-right"
            class="w-5 h-5"
          />
        </button>

        <button
          :disabled="filterState.currentPage === totalPages"
          class="group relative px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          @click="goToPage(totalPages)"
        >
          <Icon
            name="lucide:chevrons-right"
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FilterState } from '~/types'

useHead({
  title: '博客文章 - My Blog',
  meta: [
    { name: 'description', content: '探索关于前端开发、Vue 生态和软件工程的技术文章' },
  ],
})

const viewMode = ref<'grid' | 'list'>('grid')

const { data: articles } = await useAsyncData('blog-posts', () =>
  queryCollection('content')
    .all(),
)

const filterState = reactive<FilterState>({
  category: 'all',
  searchQuery: '',
  currentPage: 1,
})

const itemsPerPage = 9

const totalFilteredCount = computed(() => {
  if (!articles.value) return 0

  let result = articles.value

  if (filterState.category !== 'all') {
    result = result.filter((a) => {
      const cat = a.meta?.category
      return Array.isArray(cat) ? cat.includes(filterState.category) : cat === filterState.category
    })
  }

  if (filterState.searchQuery.trim()) {
    const query = filterState.searchQuery.toLowerCase()
    result = result.filter(a =>
      a.title?.toLowerCase().includes(query)
      || a.description?.toLowerCase().includes(query)
      || (Array.isArray(a.meta?.tags) && a.meta.tags.some((t: string) => t.toLowerCase().includes(query))),
    )
  }

  return result.length
})

const filteredArticles = computed(() => {
  if (!articles.value) return []

  let result = articles.value

  if (filterState.category !== 'all') {
    result = result.filter((a) => {
      const cat = a.meta?.category
      return Array.isArray(cat) ? cat.includes(filterState.category) : cat === filterState.category
    })
  }

  if (filterState.searchQuery.trim()) {
    const query = filterState.searchQuery.toLowerCase()
    result = result.filter(a =>
      a.title?.toLowerCase().includes(query)
      || a.description?.toLowerCase().includes(query)
      || (Array.isArray(a.meta?.tags) && a.meta.tags.some((t: string) => t.toLowerCase().includes(query))),
    )
  }

  const start = (filterState.currentPage - 1) * itemsPerPage
  return result.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(totalFilteredCount.value / itemsPerPage) || 1
})

const displayedPages = computed(() => {
  const current = filterState.currentPage
  const total = totalPages.value
  const delta = 2
  const range: number[] = []
  const rangeWithDots: number[] = []

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
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

const goToPage = (page: number) => {
  filterState.currentPage = Math.max(1, Math.min(page, totalPages.value))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetFilters = () => {
  filterState.category = 'all'
  filterState.searchQuery = ''
  filterState.currentPage = 1
}
</script>

<style scoped>
.article-grid-enter-active,
.article-grid-leave-active {
  transition: all 0.5s ease;
}

.article-grid-enter-from,
.article-grid-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.article-grid-move {
  transition: transform 0.5s ease;
}
</style>
