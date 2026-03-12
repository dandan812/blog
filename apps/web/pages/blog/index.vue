<template>
  <div class="min-h-screen">
    <section class="relative py-24 md:py-32 bg-[#0a0a0a]">
      <div class="absolute inset-0">
        <div
          class="absolute inset-0"
          style="
            background-image:
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 80px 80px;
          "
        />
      </div>

      <div class="relative container mx-auto px-6 md:px-12">
        <div
          class="inline-flex items-center gap-3 mb-8 text-white/40 text-sm tracking-widest uppercase"
        >
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

    <section class="sticky top-0 z-10 bg-[#fafafa] border-b border-black/5">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-1">
            <span class="text-2xl font-bold text-black">{{ total }}</span>
            <span class="text-black/40 text-2xl tracking-widest uppercase">篇文章</span>
          </div>

          <div class="flex items-center gap-1 p-1 bg-black/5">
            <button
              :class="[
                'p-2 transition-all duration-300',
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-black/40 hover:text-black',
              ]"
              @click="viewMode = 'grid'"
            >
              <Icon name="lucide:grid" class="w-4 h-4" />
            </button>
            <button
              :class="[
                'p-2 transition-all duration-300',
                viewMode === 'list'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-black/40 hover:text-black',
              ]"
              @click="viewMode = 'list'"
            >
              <Icon name="lucide:list" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#fafafa]">
      <div class="container mx-auto px-6 md:px-12">
        <div v-if="pending" class="py-16 text-center">
          <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-black/40 mx-auto" />
          <p class="text-black/40 mt-4">加载中...</p>
        </div>

        <div v-else-if="error" class="py-16 text-center">
          <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-500 mx-auto" />
          <p class="text-black/60 mt-4">{{ error }}</p>
          <button
            class="mt-4 px-6 py-2 bg-black text-white hover:bg-black/80 transition-colors"
            @click="loadPosts"
          >
            重试
          </button>
        </div>

        <template v-else>
          <div
            v-if="posts.length && viewMode === 'grid'"
            class="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5"
          >
            <NuxtLink
              v-for="(article, index) in posts"
              :key="article.id"
              :to="`/blog/${article.slug}`"
              class="group relative p-8 bg-[#fafafa] hover:bg-white transition-all duration-500"
            >
              <div
                class="text-5xl font-bold text-black/5 group-hover:text-amber-500/10 transition-colors mb-6"
              >
                {{ String(index + 1 + (currentPage - 1) * pageSize).padStart(2, '0') }}
              </div>

              <div v-if="article.tags?.length" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in article.tags.slice(0, 2)"
                  :key="tag.id"
                  class="px-2 py-1 text-xs text-black/40 border border-black/10"
                >
                  {{ tag.name }}
                </span>
              </div>

              <h3
                class="text-xl font-bold text-black group-hover:text-amber-600 transition-colors mb-3 line-clamp-2"
              >
                {{ article.title }}
              </h3>

              <p class="text-black/50 text-sm leading-relaxed line-clamp-2 mb-6">
                {{ article.excerpt || article.content?.slice(0, 100) }}
              </p>

              <div class="flex items-center justify-between text-xs text-black/30">
                <span>{{ formatDate(article.createdAt) }}</span>
                <span>{{ article.viewCount }} 次阅读</span>
              </div>
            </NuxtLink>
          </div>

          <div
            v-if="posts.length && viewMode === 'list'"
            class="space-y-px bg-black/5"
          >
            <NuxtLink
              v-for="(article, index) in posts"
              :key="article.id"
              :to="`/blog/${article.slug}`"
              class="group flex items-center gap-8 p-6 md:p-8 bg-[#fafafa] hover:bg-white transition-all duration-300"
            >
              <div
                class="hidden md:block text-4xl font-bold text-black/5 group-hover:text-amber-500/30 transition-colors w-16"
              >
                {{ String(index + 1 + (currentPage - 1) * pageSize).padStart(2, '0') }}
              </div>

              <div class="flex-1">
                <h3
                  class="text-xl md:text-2xl font-bold text-black group-hover:text-amber-600 transition-colors mb-2"
                >
                  {{ article.title }}
                </h3>
                <p class="text-black/40 line-clamp-1">
                  {{ article.excerpt || article.content?.slice(0, 100) }}
                </p>
              </div>

              <div class="hidden md:block text-right">
                <div class="text-black/60 text-sm">
                  {{ formatDate(article.createdAt) }}
                </div>
                <div class="text-black/30 text-xs mt-1">
                  {{ article.viewCount }} 次阅读
                </div>
              </div>

              <Icon
                name="lucide:arrow-right"
                class="w-5 h-5 text-black/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all"
              />
            </NuxtLink>
          </div>

          <div v-if="!posts.length" class="py-32 text-center">
            <div class="text-6xl font-bold text-black/10 mb-6">00</div>
            <h3 class="text-2xl font-bold text-black mb-3">没有找到文章</h3>
            <p class="text-black/40">暂无发布的文章</p>
          </div>
        </template>
      </div>
    </section>

    <section
      v-if="totalPages > 1"
      class="py-12 bg-[#fafafa] border-t border-black/5"
    >
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-center gap-2">
          <button
            :disabled="currentPage === 1"
            class="p-3 border border-black/10 text-black/40 hover:text-black hover:border-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            @click="goToPage(currentPage - 1)"
          >
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in displayedPages"
              :key="page"
              :class="[
                'w-10 h-10 text-sm font-medium transition-all',
                page === -1 ? 'text-black/30' : '',
                page === currentPage
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
            :disabled="currentPage === totalPages"
            class="p-3 border border-black/10 text-black/40 hover:text-black hover:border-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            @click="goToPage(currentPage + 1)"
          >
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>

        <div class="text-center mt-4 text-sm text-black/40">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Post, PostsResponse } from '~/composables/usePosts'

useHead({
  title: '博客文章 - My Blog',
  meta: [{ name: 'description', content: '探索关于前端开发、Vue 生态和软件工程的技术文章' }],
})

const viewMode = ref<'grid' | 'list'>('grid')
const posts = ref<Post[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 9
const totalPages = ref(1)
const pending = ref(false)
const error = ref<string | null>(null)

const loadPosts = async () => {
  pending.value = true
  error.value = null
  try {
    const { fetchPosts } = usePosts()
    const res = await fetchPosts({ page: currentPage.value, pageSize, published: true })
    if (res) {
      posts.value = res.data
      total.value = res.total
      totalPages.value = res.totalPages
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    pending.value = false
  }
}

onMounted(loadPosts)

const displayedPages = computed(() => {
  if (totalPages.value <= 1) return []

  const current = currentPage.value
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
      } else if (i - prev !== 1) {
        rangeWithDots.push(-1)
      }
    }
    rangeWithDots.push(i)
    prev = i
  }

  return rangeWithDots
})

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadPosts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>