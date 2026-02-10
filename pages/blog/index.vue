<!-- eslint-disable vue/comma-dangle -->
<!-- pages/blog/index.vue -->
<template>
  <div class="space-y-8">
    <!-- 页面标题 -->
    <div class="text-center py-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        博客文章
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        探索关于前端开发、Vue 生态和软件工程的技术文章
      </p>
    </div>

    <!-- 筛选和搜索 -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
      <!-- 分类筛选 -->
      <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
        <button
          v-for="category in categories"
          :key="category as PropertyKey"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
            filterState.category === category
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
          @click="filterState.category = category as string"
        >
          {{ category === 'all' ? '全部' : category }}
        </button>
      </div>

      <!-- 搜索框 -->
      <div class="relative w-full md:w-64">
        <Icon
          name="lucide:search"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
        <input
          v-model="filterState.searchQuery"
          type="text"
          placeholder="搜索文章..."
          class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
      </div>
    </div>

    <!-- 文章网格 -->
    <div
      v-if="filteredArticles?.length"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.path"
        :article="{ ...article, path: article.path as string, date: (article.meta?.date as string) || '', tags: (article.meta?.tags as string[]) || [], readingTime: (article.meta?.readingTime as number) || 0 }"
      />
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="text-center py-20"
    >
      <Icon
        name="lucide:file-x"
        class="w-16 h-16 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        没有找到相关文章
      </h3>
      <p class="text-gray-500">
        尝试调整筛选条件或搜索关键词
      </p>
    </div>

    <!-- 分页（简单实现） -->
    <div
      v-if="filteredArticles?.length > itemsPerPage"
      class="flex justify-center pt-8"
    >
      <button
        class="btn"
        :disabled="!hasMore"
        @click="loadMore"
      >
        {{ hasMore ? '加载更多' : '没有更多了' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FilterState } from '~/types'

useHead({
  title: '博客文章 - My Blog',
  meta: [
    { name: 'description', content: '探索关于前端开发、Vue 生态和软件工程的技术文章' },
  ],
})

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

const categories = computed(() => {
  const cats = new Set(
    articles.value?.flatMap((a) => {
      const cat = a.meta?.category
      return Array.isArray(cat) ? cat : []
    }) || [],
  )
  return ['all', ...Array.from(cats).sort()]
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

const hasMore = computed(() => {
  if (!articles.value) return false
  const totalFiltered = articles.value.filter((a) => {
    if (filterState.category !== 'all') {
      const cat = a.meta?.category
      if (!Array.isArray(cat) && cat !== filterState.category) return false
    }
    if (filterState.searchQuery.trim()) {
      const query = filterState.searchQuery.toLowerCase()
      const matchesSearch = a.title?.toLowerCase().includes(query)
        || a.description?.toLowerCase().includes(query)
        || (Array.isArray(a.meta?.tags) && a.meta.tags.some((t: string) => t.toLowerCase().includes(query)))
      if (!matchesSearch) return false
    }
    return true
  }).length
  return filteredArticles.value.length < totalFiltered
})

const loadMore = () => {
  filterState.currentPage++
}
</script>
