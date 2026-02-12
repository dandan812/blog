<template>
  <article
    v-if="post"
    class="min-h-screen"
  >
    <!-- Hero 头部 -->
    <header class="relative py-24 md:py-32 bg-[#0a0a0a]">
      <!-- 网格线 -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0"
          style="background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 80px 80px;"
        />
      </div>

      <div class="relative container mx-auto px-6 md:px-12 max-w-4xl">
        <!-- 导航返回 -->
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

        <!-- 标签 -->
        <div
          v-if="(post.meta?.tags as string[])?.length"
          class="flex flex-wrap gap-2 mb-6"
        >
          <span
            v-for="tag in (post.meta?.tags as string[])"
            :key="tag"
            class="px-3 py-1 text-xs text-white/60 border border-white/10"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 标题 -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-6">
          {{ post.title }}
        </h1>

        <!-- 描述 -->
        <p class="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
          {{ post.description }}
        </p>

        <!-- 元信息 -->
        <div class="flex items-center gap-6 text-sm text-white/30">
          <div class="flex items-center gap-2">
            <Icon
              name="lucide:calendar"
              class="w-4 h-4"
            />
            <time :datetime="post.meta?.date as string">
              {{ formatDate((post.meta?.date as string) || '') }}
            </time>
          </div>
          <span
            v-if="post.meta?.readingTime"
            class="flex items-center gap-2"
          >
            <Icon
              name="lucide:clock"
              class="w-4 h-4"
            />
            {{ post.meta?.readingTime }} 分钟
          </span>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <div class="py-16 bg-[#fafafa]">
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-3xl mx-auto">
          <!-- 文章内容 -->
          <div class="prose prose-lg max-w-none">
            <ContentRenderer :value="post" />
          </div>

          <!-- 文章底部 -->
          <footer class="mt-16 pt-12 border-t border-black/5">
            <!-- 分享区域 -->
            <div class="flex items-center justify-between mb-12">
              <div class="text-sm text-black/40 tracking-widest uppercase">
                分享
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="w-10 h-10 flex items-center justify-center border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all"
                  @click="shareToTwitter"
                >
                  <Icon
                    name="lucide:twitter"
                    class="w-4 h-4"
                  />
                </button>
                <button
                  class="w-10 h-10 flex items-center justify-center border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all"
                  @click="copyLink"
                >
                  <Icon
                    name="lucide:link"
                    class="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            <!-- 导航卡片 -->
            <div class="grid md:grid-cols-2 gap-px bg-black/5">
              <!-- 上一篇 -->
              <NuxtLink
                v-if="prevPost"
                :to="prevPost.path"
                class="group p-6 bg-[#fafafa] hover:bg-white transition-all duration-300"
              >
                <div class="text-xs text-black/30 mb-2 tracking-widest uppercase">上一篇</div>
                <div class="flex items-center gap-3">
                  <Icon
                    name="lucide:arrow-left"
                    class="w-4 h-4 text-black/20 group-hover:text-amber-500 transition-colors"
                  />
                  <span class="font-medium text-black group-hover:text-amber-600 transition-colors line-clamp-1">
                    {{ prevPost.title }}
                  </span>
                </div>
              </NuxtLink>
              <div
                v-else
                class="p-6 bg-[#fafafa]"
              />

              <!-- 下一篇 -->
              <NuxtLink
                v-if="nextPost"
                :to="nextPost.path"
                class="group p-6 bg-[#fafafa] hover:bg-white transition-all duration-300 text-right"
              >
                <div class="text-xs text-black/30 mb-2 tracking-widest uppercase">下一篇</div>
                <div class="flex items-center justify-end gap-3">
                  <span class="font-medium text-black group-hover:text-amber-600 transition-colors line-clamp-1">
                    {{ nextPost.title }}
                  </span>
                  <Icon
                    name="lucide:arrow-right"
                    class="w-4 h-4 text-black/20 group-hover:text-amber-500 transition-colors"
                  />
                </div>
              </NuxtLink>
              <div
                v-else
                class="p-6 bg-[#fafafa]"
              />
            </div>
          </footer>

          <!-- 相关文章 -->
          <section
            v-if="relatedPosts?.length"
            class="mt-16 pt-12 border-t border-black/5"
          >
            <div class="inline-flex items-center gap-3 mb-8 text-black/40 text-sm tracking-widest uppercase">
              <span class="w-8 h-px bg-amber-500" />
              <span>相关文章</span>
            </div>

            <div class="space-y-px bg-black/5">
              <NuxtLink
                v-for="article in relatedPosts"
                :key="article.path"
                :to="article.path"
                class="group flex items-center gap-6 p-6 bg-[#fafafa] hover:bg-white transition-all duration-300"
              >
                <div class="flex-1">
                  <h3 class="font-bold text-black group-hover:text-amber-600 transition-colors mb-1">
                    {{ article.title }}
                  </h3>
                  <p class="text-black/40 text-sm line-clamp-1">
                    {{ article.description }}
                  </p>
                </div>
                <Icon
                  name="lucide:arrow-right"
                  class="w-4 h-4 text-black/20 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                />
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  </article>

  <!-- 404 状态 -->
  <div
    v-else
    class="min-h-[60vh] flex items-center justify-center bg-[#fafafa]"
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
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('content').path(`/blog/${slug}`).first(),
)

const { data: allPosts } = await useAsyncData(`all-posts-${slug}`, () =>
  queryCollection('content')
    .all(),
)

const { data: relatedPosts } = await useAsyncData(`related-${slug}`, async () => {
  const tags = post.value?.meta?.tags
  if (!tags || !Array.isArray(tags) || tags.length === 0) return []
  return queryCollection('content')
    .where('path', '<>', `/blog/${slug}`)
    .limit(4)
    .all()
})

const currentIndex = computed(() => {
  if (!allPosts.value || !post.value?.path) return -1
  return allPosts.value.findIndex(p => p.path === post.value?.path)
})

const prevPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value || currentIndex.value >= allPosts.value.length - 1) return null
  return allPosts.value[currentIndex.value + 1]
})

const nextPost = computed(() => {
  if (currentIndex.value <= 0 || !allPosts.value) return null
  return allPosts.value[currentIndex.value - 1]
})

const shareUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '')
const shareTitle = computed(() => post.value?.title || '')

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useHead(() => ({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description || '' },
    { property: 'og:type', content: 'article' },
  ],
}))

const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(shareUrl.value)}`
  window.open(url, '_blank', 'noopener,noreferrer')
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
</script>
