<template>
  <div class="min-h-screen">
    <div
      v-if="pending"
      class="min-h-[60vh] flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]"
    >
      <div class="text-center">
        <Icon
          name="lucide:loader-2"
          class="w-12 h-12 animate-spin text-black/40 mx-auto"
        />
        <p class="text-black/40 mt-4">
          加载中...
        </p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="min-h-[60vh] flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]"
    >
      <div class="text-center">
        <Icon
          name="luc:alert-circle"
          class="w-12 h-12 text-red-500 mx-auto"
        />
        <h1 class="text-2xl font-bold text-black mt-4 mb-2">
          加载失败
        </h1>
        <p class="text-black/40 mb-8">
          {{ errorMessage }}
        </p>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-black/80 transition-color"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-4 h-4"
          />
          返回博客
        </NuxtLink>
      </div>
    </div>

    <article
      v-else-if="post || contentPost"
      class="min-h-screen"
    >
      <header class="relative py-24 md:py-32 bg-[#0a0a0a]">
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

        <div class="relative container mx-auto px-6 md:px-12 max-w-4xl">
          <div class="mb-12">
            <NuxtLink
              to="/blog"
              class="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm tracking-widest uppercase"
            >
              <Icon
                name="lucide:arrow-left"
                class="w-4 h-4"
              />
              返回
            </NuxtLink>
          </div>

          <div
            v-if="post?.tags?.length"
            class="flex flex-wrap gap-2 mb-6"
          >
            <span
              v-for="tag in post.tags"
              :key="tag.id"
              class="px-3 py-1 text-xs text-white/60 border border-white/10"
            >
              {{ tag.name }}
            </span>
          </div>

            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-6"
            >
            {{ articleTitle }}
          </h1>

          <p class="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
            {{ articleExcerpt }}
          </p>

          <div class="flex items-center gap-6 text-sm text-white/30">
            <div class="flex items-center gap-2">
              <Icon
                name="lucide:calendar"
                class="w-4 h-4"
              />
              <time :datetime="articleDate">
                {{ formatDate(articleDate) }}
              </time>
            </div>
            <span class="flex items-center gap-2">
              <Icon
                name="lucide:eye"
                class="w-4 h-4"
              />
              {{ articleViewCount }} 次阅读
            </span>
          </div>
        </div>
      </header>

      <div class="py-16 bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div class="container mx-auto px-6 md:px-12">
          <div class="max-w-3xl mx-auto">
            <div
              class="prose prose-lg max-w-none dark:prose-invert"
            >
              <ContentRenderer
                v-if="contentPost"
                :value="contentPost"
              />
              <div
                v-else
                v-html="renderedContent"
              />
            </div>

            <footer class="mt-16 pt-12 border-t border-black/5 dark:border-white/5">
              <div class="flex items-center justify-between mb-12">
                <div class="text-sm text-black/40 dark:text-white/40 tracking-widest uppercase">
                  分享
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-amber-500 hover:bg-black dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all"
                    @click="shareToTwitter"
                  >
                    <Icon
                      name="lucide:twitter"
                      class="w-4 h-4"
                    />
                  </button>
                  <button
                    class="w-10 h-10 flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-amber-500 hover:bg-black dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all"
                    @click="copyLink"
                  >
                    <Icon
                      name="lucide:link"
                      class="w-4 h-4"
                    />
                  </button>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-px bg-black/5 dark:bg-white/5">
                <NuxtLink
                  v-if="prevPost"
                  :to="`/blog/${prevPost.slug}`"
                  class="group p-6 bg-[#fafafa] dark:bg-[#0a0a0a] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
                >
                  <div class="text-xs text-black/30 mb-2 tracking-widest uppercase">上一篇</div>
                  <div class="flex items-center gap-3">
                    <Icon
                      name="lucide:arrow-left"
                      class="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-amber-500 transition-colors"
                    />
                    <span class="font-medium text-black dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {{ prevPost.title }}
                    </span>
                  </div>
                </NuxtLink>
                <div
                  v-else
                  class="p-6 bg-[#fafafa] dark:bg-[#0a0a0a]"
                />

                <NuxtLink
                  v-if="nextPost"
                  :to="`/blog/${nextPost.slug}`"
                  class="group p-6 bg-[#fafafa] dark:bg-[#0a0a0a] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300 text-right"
                >
                  <div class="text-xs text-black/30 mb-2 tracking-widest uppercase">下一篇</div>
                  <div class="flex items-center justify-end gap-3">
                    <span class="font-medium text-black dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {{ nextPost.title }}
                    </span>
                    <Icon
                      name="lucide:arrow-right"
                      class="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-amber-500 transition-colors"
                    />
                  </div>
                </NuxtLink>
                <div
                  v-else
                  class="p-6 bg-[#fafafa] dark:bg-[#0a0a0a]"
                />
              </div>
            </footer>

            <section
              v-if="relatedPosts?.length"
              class="mt-16 pt-12 border-t border-black/5 dark:border-white/5"
            >
              <div class="inline-flex items-center gap-3 mb-8 text-black/40 dark:text-white/40 text-sm tracking-widest uppercase">
                <span class="w-8 h-px bg-amber-500" />
                <span>相关文章</span>
              </div>

              <div class="space-y-px bg-black/5 dark:bg-white/5">
                <NuxtLink
                  v-for="article in relatedPosts"
                  :key="article.id"
                  :to="`/blog/${article.slug}`"
                  class="group flex items-center gap-6 p-6 bg-[#fafafa] dark:bg-[#0a0a0a] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-300"
                >
                  <div class="flex-1">
                    <h3 class="font-bold text-black dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1">
                      {{ article.title }}
                    </h3>
                    <p class="text-black/40 dark:text-white/40 text-sm line-clamp-1">
                      {{ article.excerpt }}
                    </p>
                  </div>
                  <Icon
                    name="lucide:arrow-right"
                    class="w-4 h-4 text-black/20 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                  />
                </NuxtLink>
              </div>
            </section>
            <GiscusComments
              :repo="giscusConfig.repo"
              :repo-id="giscusConfig.repoId"
              :category="giscusConfig.category"
              :category-id="giscusConfig.categoryId"
              :mapping="giscusMapping"
              :lang="giscusConfig.lang"
            />
          </div>
        </div>
      </div>
    </article>

    <div
      v-else
      class="min-h-[60vh] flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]"
    >
      <div class="text-center">
        <div class="text-8xl font-bold text-black/10 mb-6">
          404
        </div>
        <h1 class="text-2xl font-bold text-black mb-4">
          文章未找到
        </h1>
        <p class="text-black/40 mb-8">
          这篇文章可能已被删除或移动
        </p>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-black/80 transition-colors"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-4 h-4"
          />
          返回博客
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import type { Post } from '~/composables/usePosts'
import { fetchAllPostsForUi, fetchPostWithFallback } from '~/composables/useBlogData'

marked.setOptions({
  breaks: true,
  gfm: true,
})

const config = useRuntimeConfig()
const route = useRoute()
const slug = route.params.slug as string

/**
 * 详情页首屏直接取数，API 异常时自动回退到本地 Markdown。
 */
const { data: postData, pending, error } = await useAsyncData(
  `blog-post-${slug}`,
  async () => {
    const [postResult, posts] = await Promise.all([
      fetchPostWithFallback(slug),
      fetchAllPostsForUi(),
    ])

    return {
      ...postResult,
      allPosts: posts,
    }
  },
  {
    default: () => ({
      apiPost: null,
      contentPost: null,
      allPosts: [],
    }),
  },
)

const post = computed<Post | null>(() => postData.value.apiPost)
const contentPost = computed(() => postData.value.contentPost)
const allPosts = computed<Post[]>(() => postData.value.allPosts)
const errorMessage = computed(() => error.value?.message || '加载失败')
const relatedPosts = computed(() =>
  allPosts.value
    .filter(item => item.slug !== slug)
    .slice(0, 3),
)

onMounted(() => {
  if (post.value?.id) {
    const { recordView } = useRecordView()
    recordView(post.value.id)
  }
})

const articleTitle = computed(() => post.value?.title || contentPost.value?.title || '')
const articleExcerpt = computed(() => post.value?.excerpt || contentPost.value?.excerpt || contentPost.value?.description || '')
const articleDate = computed(() => post.value?.createdAt || contentPost.value?.date || '')
const articleViewCount = computed(() => post.value?.viewCount || 0)

const currentIndex = computed(() => {
  return allPosts.value.findIndex(p => p.slug === slug) ?? -1
})

const prevPost = computed(() => {
  const idx = currentIndex.value
  return idx >= 0 && idx < allPosts.value.length - 1 ? allPosts.value[idx + 1] : null
})

const nextPost = computed(() => {
  const idx = currentIndex.value
  return idx > 0 ? allPosts.value[idx - 1] : null
})

const shareUrl = computed(() => (typeof window === 'undefined' ? '' : window.location.href))

const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  return marked.parse(post.value.content) as string
})

useHead(() => ({
  title: articleTitle.value,
  meta: [
    { name: 'description', content: articleExcerpt.value },
    { property: 'og:title', content: articleTitle.value },
    { property: 'og:description', content: articleExcerpt.value },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: shareUrl.value },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
}))

const shareToTwitter = () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle.value)}&url=${encodeURIComponent(shareUrl.value)}`,
    '_blank',
    'noopener,noreferrer',
  )
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
  }
  catch {
    const textarea = document.createElement('textarea')
    textarea.value = shareUrl.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

const giscusMapping = computed(() => (config.public.giscus as { mapping?: 'pathname' | 'url' | 'title' | 'og:title' }).mapping || 'pathname')

const giscusConfig = computed(() => config.public.giscus as {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  lang?: string
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
