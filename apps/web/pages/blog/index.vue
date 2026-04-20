<template>
  <div class="min-h-screen">
    <UiHero label="博客文章">
      思考与记录
    </UiHero>

    <section class="sticky top-0 z-10 bg-[#fafafa] dark:bg-[#111] border-b border-black/5 dark:border-white/10">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-1">
            <span class="text-2xl font-bold text-black dark:text-white">{{ total }}</span>
            <span class="text-black/40 dark:text-white/40 text-2xl tracking-widest uppercase">篇文章</span>
          </div>

          <div class="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/10">
            <button
              :class="[
                'p-2 transition-all duration-300',
                viewMode === 'grid'
                  ? 'bg-white dark:bg-white text-black shadow-sm'
                  : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white',
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
                viewMode === 'list'
                  ? 'bg-white dark:bg-white text-black shadow-sm'
                  : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white',
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

    <UiContentSection>
      <UiLoadingState v-if="pending" />

      <div
        v-else-if="errorMessage"
        class="py-16 text-center"
      >
        <Icon
          name="lucide:alert-circle"
          class="w-12 h-12 text-red-500 mx-auto"
        />
        <p class="text-black/60 dark:text-white/60 mt-4">
          {{ errorMessage }}
        </p>
        <button
          class="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
          @click="loadPosts"
        >
          重试
        </button>
      </div>

      <template v-else>
        <UiCardGrid v-if="posts.length && viewMode === 'grid'">
          <NuxtLink
            v-for="(article, index) in posts"
            :key="article.id"
            :to="`/blog/${article.slug}`"
            class="group relative p-8 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-500"
          >
            <div class="text-5xl font-bold text-black/10 dark:text-white/20 group-hover:text-amber-500/30 transition-colors mb-6">
              {{ String(index + 1 + (currentPage - 1) * pageSize).padStart(2, '0') }}
            </div>

            <div
              v-if="article.tags?.length"
              class="flex flex-wrap gap-2 mb-4"
            >
              <span
                v-for="tag in article.tags.slice(0, 2)"
                :key="tag.id"
                class="px-2 py-1 text-xs text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10"
              >
                {{ tag.name }}
              </span>
            </div>

            <h3 class="text-xl font-bold text-black dark:text-white group-hover:text-amber-500 transition-colors mb-3 line-clamp-2">
              {{ article.title }}
            </h3>

            <p class="text-black/50 dark:text-white/50 text-sm leading-relaxed line-clamp-2 mb-6">
              {{ article.excerpt || article.content?.slice(0, 100) }}
            </p>

            <div class="flex items-center justify-between text-xs text-black/30 dark:text-white/30">
              <span>{{ formatDate(article.createdAt) }}</span>
              <span>{{ article.viewCount }} 次阅读</span>
            </div>
          </NuxtLink>
        </UiCardGrid>

        <div
          v-if="posts.length && viewMode === 'list'"
          class="space-y-px bg-black/5 dark:bg-white/10"
        >
          <NuxtLink
            v-for="(article, index) in posts"
            :key="article.id"
            :to="`/blog/${article.slug}`"
            class="group flex items-center gap-8 p-6 md:p-8 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
          >
            <div class="hidden md:block text-4xl font-bold text-black/10 dark:text-white/20 group-hover:text-amber-500/30 transition-colors w-16">
              {{ String(index + 1 + (currentPage - 1) * pageSize).padStart(2, '0') }}
            </div>

            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-black dark:text-white group-hover:text-amber-500 transition-colors mb-2">
                {{ article.title }}
              </h3>
              <p class="text-black/40 dark:text-white/40 line-clamp-1">
                {{ article.excerpt || article.content?.slice(0, 100) }}
              </p>
            </div>

            <div class="hidden md:block text-right">
              <div class="text-black/60 dark:text-white/60 text-sm">{{ formatDate(article.createdAt) }}</div>
              <div class="text-black/30 dark:text-white/30 text-xs mt-1">{{ article.viewCount }} 次阅读</div>
            </div>

            <Icon
              name="lucide:arrow-right"
              class="w-5 h-5 text-black/20 dark:text-white/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all"
            />
          </NuxtLink>
        </div>

        <UiEmptyState
          v-if="!posts.length"
          title="没有找到文章"
          description="暂无发布的文章"
        />
      </template>
    </UiContentSection>

    <section
      v-if="totalPages > 1"
      class="py-12 bg-[#fafafa] dark:bg-[#111] border-t border-black/5 dark:border-white/10"
    >
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-center gap-2">
          <button
            :disabled="currentPage === 1"
            class="p-3 border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            @click="goToPage(currentPage - 1)"
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
                page === -1 ? 'text-black/30 dark:text-white/30' : '',
                page === currentPage
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white',
              ]"
              :disabled="page === -1"
              @click="page !== -1 && goToPage(page)"
            >
              {{ page === -1 ? '...' : page }}
            </button>
          </div>

          <button
            :disabled="currentPage === totalPages"
            class="p-3 border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            @click="goToPage(currentPage + 1)"
          >
            <Icon
              name="lucide:chevron-right"
              class="w-4 h-4"
            />
          </button>
        </div>

        <div class="text-center mt-4 text-sm text-black/40 dark:text-white/40">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/composables/usePosts'
import { fetchPostsWithFallback } from '~/composables/useBlogData'

useHead({
  title: '博客文章 - My Blog',
  meta: [{ name: 'description', content: '探索关于前端开发、Vue 生态和软件工程的技术文章' }],
})

const route = useRoute()
const router = useRouter()
const viewMode = ref<'grid' | 'list'>('grid')
const pageSize = 9
const currentPage = ref(Math.max(1, Number(route.query.page) || 1))

/**
 * 文章列表优先使用 API，失败时回退到本地 Markdown。
 */
const { data: postsResponse, pending, error, refresh } = await useAsyncData(
  'blog-posts',
  () => fetchPostsWithFallback({ page: currentPage.value, pageSize, published: true }),
  {
    watch: [currentPage],
    default: () => ({ data: [], total: 0, page: 1, pageSize, totalPages: 1 }),
  },
)

const posts = computed<Post[]>(() => postsResponse.value.data)
const total = computed(() => postsResponse.value.total)
const totalPages = computed(() => postsResponse.value.totalPages)
const errorMessage = computed(() => error.value?.message || null)

const loadPosts = async () => {
  await refresh()
}

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
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  router.replace({
    query: page === 1 ? {} : { page: String(page) },
  })
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
