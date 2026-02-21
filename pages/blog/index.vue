<template>
  <div class="min-h-screen">
    <!-- 页面标题 -->
    <section class="relative py-24 md:py-32 bg-[#0a0a0a]">
      <!-- 网格线 -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0"
          style="background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 80px 80px;"
        />
      </div>

      <div class="relative container mx-auto px-6 md:px-12">
        <!-- 状态标签 -->
        <div class="inline-flex items-center gap-3 mb-8 text-white/40 text-sm tracking-widest uppercase">
          <span class="w-8 h-px bg-amber-500" />
          <span>博客文章</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-6">
          思考与记录
        </h1>
        <p class="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light">
          探索前端开发的边界，记录技术成长的轨迹
        </p>
      </div>
    </section>

    <!-- 筛选区域 -->
    <section class="sticky top-0 z-10 bg-[#fafafa] border-b border-black/5">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-between py-4">
          <!-- 文章数量 -->
          <div class="flex items-center gap-1">
            <span class="text-2xl font-bold text-black">{{ totalFilteredCount }}</span>
            <span class="text-black/40 text-2xl tracking-widest uppercase">篇文章</span>
          </div>

          <!-- 视图切换 -->
          <div class="flex items-center gap-1 p-1 bg-black/5">
            <button
              :class="[
                'p-2 transition-all duration-300',
                viewMode === 'grid' ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black',
              ]"
              @click="viewMode = 'grid'"
            >
              <Icon
                name="lucide:grid"
                class="w-4 h-4"
              />
            </button>
            <button
              :class="[
                'p-2 transition-all duration-300',
                viewMode === 'list' ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black',
              ]"
              @click="viewMode = 'list'"
            >
              <Icon
                name="lucide:list"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 文章列表 -->
    <section class="py-16 bg-[#fafafa]">
      <div class="container mx-auto px-6 md:px-12">
        <!-- 网格视图 -->
        <div
          v-if="filteredArticles?.length && viewMode === 'grid'"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5"
        >
          <NuxtLink
            v-for="(article, index) in filteredArticles"
            :key="article.path"
            :to="article.path"
            class="group relative p-8 bg-[#fafafa] hover:bg-white transition-all duration-500"
          >
            <!-- 序号 -->
            <div class="text-5xl font-bold text-black/5 group-hover:text-amber-500/10 transition-colors mb-6">
              {{ String(index + 1 + (filterState.currentPage - 1) * itemsPerPage).padStart(2, '0') }}
            </div>

            <!-- 标签 -->
            <div
              v-if="(article.meta?.tags as string[])?.length"
              class="flex flex-wrap gap-2 mb-4"
            >
              <span
                v-for="tag in (article.meta?.tags as string[])?.slice(0, 2)"
                :key="tag"
                class="px-2 py-1 text-xs text-black/40 border border-black/10"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 标题 -->
            <h3 class="text-xl font-bold text-black group-hover:text-amber-600 transition-colors mb-3 line-clamp-2">
              {{ article.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-black/50 text-sm leading-relaxed line-clamp-2 mb-6">
              {{ article.description }}
            </p>

            <!-- 底部信息 -->
            <div class="flex items-center justify-between text-xs text-black/30">
              <span>{{ formatDate(article.meta?.date) }}</span>
              <span>{{ article.meta?.readingTime || 5 }} 分钟</span>
            </div>
          </NuxtLink>
        </div>

        <!-- 列表视图 -->
        <div
          v-if="filteredArticles?.length && viewMode === 'list'"
          class="space-y-px bg-black/5"
        >
          <NuxtLink
            v-for="(article, index) in filteredArticles"
            :key="article.path"
            :to="article.path"
            class="group flex items-center gap-8 p-6 md:p-8 bg-[#fafafa] hover:bg-white transition-all duration-300"
          >
            <!-- 序号 -->
            <div class="hidden md:block text-4xl font-bold text-black/5 group-hover:text-amber-500/30 transition-colors w-16">
              {{ String(index + 1 + (filterState.currentPage - 1) * itemsPerPage).padStart(2, '0') }}
            </div>

            <!-- 内容 -->
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-black group-hover:text-amber-600 transition-colors mb-2">
                {{ article.title }}
              </h3>
              <p class="text-black/40 line-clamp-1">
                {{ article.description }}
              </p>
            </div>

            <!-- 日期 -->
            <div class="hidden md:block text-right">
              <div class="text-black/60 text-sm">
                {{ formatDate(article.meta?.date) }}
              </div>
              <div class="text-black/30 text-xs mt-1">
                {{ article.meta?.readingTime || 5 }} 分钟
              </div>
            </div>

            <!-- 箭头 -->
            <Icon
              name="lucide:arrow-right"
              class="w-5 h-5 text-black/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all"
            />
          </NuxtLink>
        </div>

        <!-- 空状态 -->
        <div
          v-if="!filteredArticles?.length"
          class="py-32 text-center"
        >
          <div class="text-6xl font-bold text-black/10 mb-6">
            00
          </div>
          <h3 class="text-2xl font-bold text-black mb-3">
            没有找到文章
          </h3>
          <p class="text-black/40 mb-8">
            尝试调整筛选条件
          </p>
          <button
            class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-black/80 transition-colors"
            @click="resetFilters"
          >
            <Icon
              name="lucide:rotate-ccw"
              class="w-4 h-4"
            />
            重置
          </button>
        </div>
      </div>
    </section>

    <!-- 分页 -->
    <section
      v-if="totalPages > 1"
      class="py-12 bg-[#fafafa] border-t border-black/5"
    >
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-center gap-2">
          <button
            :disabled="filterState.currentPage === 1"
            class="p-3 border border-black/10 text-black/40 hover:text-black hover:border-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            @click="goToPage(filterState.currentPage - 1)"
          >
            <Icon
              name="lucide:chevron-left"
              class="w-4 h-4"
            />
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in displayedPages"
              :key="page"
              :class="[
                'w-10 h-10 text-sm font-medium transition-all',
                page === -1 ? 'text-black/30' : '',
                page === filterState.currentPage
                  ? 'bg-black text-white'
                  : 'border border-black/10 text-black/60 hover:border-black/20 hover:text-black',
              ]"
              :disabled="page === -1"
              @click="page !== -1 && goToPage(page)"
            >
              {{ page === -1 ? '...' : page }}
            </button>
          </div>

          <button
            :disabled="filterState.currentPage === totalPages"
            class="p-3 border border-black/10 text-black/40 hover:text-black hover:border-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            @click="goToPage(filterState.currentPage + 1)"
          >
            <Icon
              name="lucide:chevron-right"
              class="w-4 h-4"
            />
          </button>
        </div>

        <!-- 页码信息 -->
        <div class="text-center mt-4 text-sm text-black/40">
          第 {{ filterState.currentPage }} 页，共 {{ totalPages }} 页
        </div>
      </div>
    </section>
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
  {
    server: true,
    lazy: false,
    immediate: true,
  },
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

const formatDate = (date: unknown) => {
  if (!date) return ''
  return new Date(date as string).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>
