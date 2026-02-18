<template>
  <div class="min-h-screen">
    <!-- Hero 区域 - 反主流设计 -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a0a0a]">
      <!-- 噪点纹理 -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"
      />

      <!-- 网格线 -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0"
          style="background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 80px 80px;"
        />
      </div>

      <!-- 几何装饰 -->
      <div class="absolute top-20 right-20 w-64 h-64 border border-white/5 rotate-45" />
      <div class="absolute bottom-40 left-10 w-32 h-32 border border-amber-500/20 rotate-12" />
      <div class="absolute top-1/3 left-1/4 w-2 h-2 bg-amber-500 rounded-full" />
      <div class="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full" />

      <!-- 主要内容 -->
      <div class="relative container mx-auto px-6 md:px-12">
        <div class="max-w-4xl">
          <!-- 状态标签 -->
          <div class="inline-flex items-center gap-3 mb-8 text-white/40 text-sm tracking-widest uppercase">
            <span class="w-8 h-px bg-amber-500" />
            <span>技术博客</span>
          </div>

          <!-- 主标题 -->
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-8">
            <span class="block">思考</span>
            <span class="block text-white/20">·</span>
            <span class="block">创造</span>
            <span class="block text-white/20">·</span>
            <span class="block">分享</span>
          </h1>

          <!-- 副标题 -->
          <p class="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-12 font-light">
            探索前端开发的边界，记录技术成长的轨迹。<br>
            用代码构建有温度的数字世界。
          </p>

          <!-- CTA 按钮 -->
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/blog"
              class="group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-medium rounded-none hover:bg-amber-400 transition-all duration-300"
            >
              <span>浏览文章</span>
              <Icon
                name="lucide:arrow-right"
                class="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </NuxtLink>

            <a
              href="https://github.com/dandan812/blog"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              <Icon
                name="lucide:github"
                class="w-4 h-4"
              />
              <span>源码</span>
            </a>
          </div>
        </div>

        <!-- 右侧装饰 -->
        <div class="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
          <div class="text-right">
            <div class="text-white/10 text-[120px] font-bold leading-none select-none">
              01
            </div>
            <div class="text-white/30 text-sm tracking-widest mt-4">
              NUXR 4
            </div>
          </div>
        </div>
      </div>

      <!-- 底部滚动提示 -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span class="text-xs tracking-widest uppercase">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>

    <!-- 统计区域 -->
    <!-- <section class="relative py-20 bg-[#0a0a0a] border-t border-white/5">
      <div class="container mx-auto px-6 md:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10">
          <div class="text-center md:px-8">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">
              10+
            </div>
            <div class="text-white/40 text-sm tracking-widest uppercase">
              文章
            </div>
          </div>
          <div class="text-center md:px-8">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">
              500+
            </div>
            <div class="text-white/40 text-sm tracking-widest uppercase">
              阅读
            </div>
          </div>
          <div class="text-center md:px-8">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">
              3
            </div>
            <div class="text-white/40 text-sm tracking-widest uppercase">
              技术栈
            </div>
          </div>
          <div class="text-center md:px-8">
            <div class="text-4xl md:text-5xl font-bold text-amber-500 mb-2">
              ∞
            </div>
            <div class="text-white/40 text-sm tracking-widest uppercase">
              可能性
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- 特性展示 - 极简设计 -->
    <section class="relative py-32 bg-[#fafafa]">
      <div class="container mx-auto px-6 md:px-12">
        <!-- 标题 -->
        <div class="max-w-2xl mb-20">
          <div class="inline-flex items-center gap-3 mb-6 text-black/40 text-sm tracking-widest uppercase">
            <span class="w-8 h-px bg-amber-500" />
            <span>技术特性</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-black leading-tight">
            现代化的<br>
            <span class="text-black/30">技术架构</span>
          </h2>
        </div>

        <!-- 特性列表 -->
        <div class="grid md:grid-cols-3 gap-px bg-black/10">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="group relative p-10 bg-[#fafafa] hover:bg-white transition-all duration-500"
          >
            <!-- 序号 -->
            <div class="text-6xl font-bold text-black/5 group-hover:text-amber-500/10 transition-colors mb-6">
              0{{ index + 1 }}
            </div>

            <!-- 图标 -->
            <div class="w-12 h-12 flex items-center justify-center border border-black/10 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all duration-300 mb-6">
              <Icon
                :name="feature.icon"
                class="w-5 h-5 text-black/40 group-hover:text-white transition-colors"
              />
            </div>

            <!-- 标题 -->
            <h3 class="text-xl font-bold text-black mb-3">
              {{ feature.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-black/50 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="relative py-32 bg-[#0a0a0a]">
      <div class="container mx-auto px-6 md:px-12">
        <!-- 标题 -->
        <div class="flex items-end justify-between mb-16">
          <div>
            <div class="inline-flex items-center gap-3 mb-6 text-white/40 text-sm tracking-widest uppercase">
              <span class="w-8 h-px bg-amber-500" />
              <span>最新文章</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-white">
              思考与记录
            </h2>
          </div>
          <NuxtLink
            to="/blog"
            class="hidden md:inline-flex items-center gap-2 text-white/40 hover:text-amber-500 transition-colors"
          >
            <span class="text-sm tracking-widest uppercase">查看全部</span>
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>
        </div>

        <!-- 文章列表 -->
        <div
          v-if="latestArticles.length > 0"
          class="space-y-px bg-white/5"
        >
          <NuxtLink
            v-for="(article, index) in latestArticles"
            :key="article.path"
            :to="article.path"
            class="group flex items-center gap-8 p-6 md:p-8 bg-[#0a0a0a] hover:bg-white/[0.02] transition-all duration-300"
          >
            <!-- 序号 -->
            <div class="hidden md:block text-4xl font-bold text-white/10 group-hover:text-amber-500/30 transition-colors w-16">
              0{{ index + 1 }}
            </div>

            <!-- 内容 -->
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-amber-500 transition-colors mb-2">
                {{ article.title }}
              </h3>
              <p class="text-white/40 line-clamp-1">
                {{ article.description }}
              </p>
            </div>

            <!-- 日期 -->
            <!-- <div class="hidden md:block text-right">
              <div class="text-white/60 text-sm">
                {{ formatDate(article.meta?.date) }}
              </div>
              <div class="text-white/30 text-xs mt-1">
                {{ article.meta?.readingTime || 5 }} 分钟
              </div>
            </div> -->

            <!-- 箭头 -->
            <Icon
              name="lucide:arrow-right"
              class="w-5 h-5 text-white/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all"
            />
          </NuxtLink>
        </div>

        <!-- Loading 状态 -->
        <div
          v-else-if="articlesPending"
          class="py-16 text-center"
        >
          <div class="inline-flex items-center gap-3 text-white/40">
            <Icon
              name="lucide:loader-2"
              class="w-5 h-5 animate-spin"
            />
            <span>加载中...</span>
          </div>
        </div>

        <!-- 空状态 -->
        <div
          v-else
          class="py-16 text-center"
        >
          <p class="text-white/40">
            暂无文章
          </p>
        </div>

        <!-- 移动端查看全部 -->
        <div class="md:hidden mt-8">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-amber-500"
          >
            <span class="text-sm tracking-widest uppercase">查看全部文章</span>
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="relative py-32 bg-amber-500">
      <!-- 纹理 -->
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"
      />

      <div class="relative container mx-auto px-6 md:px-12 text-center">
        <h2 class="text-4xl md:text-6xl font-bold text-black mb-6">
          开始探索
        </h2>
        <p class="text-xl text-black/60 mb-12 max-w-xl mx-auto">
          在代码的世界里，每一行都是一个故事
        </p>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-medium hover:bg-black/80 transition-all duration-300"
        >
          <span>浏览全部文章</span>
          <Icon
            name="lucide:arrow-right"
            class="w-4 h-4"
          />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Feature } from '~/types'

useHead({
  title: 'My Blog - 思考·创造·分享',
  meta: [
    { name: 'description', content: '探索前端开发的边界，记录技术成长的轨迹' },
  ],
})

const { data: articles, pending: articlesPending } = await useAsyncData('blog-posts', () =>
  queryCollection('content')
    .all(),
)

const latestArticles = computed(() => {
  if (!articles.value) return []
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return articles.value
    .sort((a, b) => {
      const dateA = new Date((a.meta?.date as string) || '1970-01-01')
      const dateB = new Date((b.meta?.date as string) || '1970-01-01')
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 6)
})

// const formatDate = (date: unknown) => {
//   if (!date) return ''
//   return new Date(date as string).toLocaleDateString('zh-CN', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   })
// }

const features: Feature[] = [
  {
    icon: 'lucide:zap',
    title: '极速性能',
    description: 'Nitro 引擎驱动，支持 SSR/SSG/ISR 多种渲染模式',
  },
  {
    icon: 'lucide:file-text',
    title: '内容驱动',
    description: 'Nuxt Content 3 提供强大的 Markdown 内容管理',
  },
  {
    icon: 'lucide:search',
    title: '全文搜索',
    description: '内置内容搜索，支持模糊匹配和实时预览',
  },
]
</script>
