<template>
  <div class="giscus-comments mt-12 pt-12 border-t border-black/5 dark:border-white/5">
    <div class="inline-flex items-center gap-3 mb-8 text-black/40 dark:text-white/40 text-sm tracking-widest uppercase">
      <span class="w-8 h-px bg-amber-500" />
      <span>评论</span>
    </div>
    <div
      ref="giscusContainer"
      class="giscus"
    />
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GiscusConfig {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title'
  theme?: string
  lang?: string
}

const props = withDefaults(defineProps<{
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title'
  theme?: string
  lang?: string
}>(), {
  repo: '',
  repoId: '',
  category: '',
  categoryId: '',
  mapping: 'pathname',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
})

const giscusContainer = ref<HTMLElement | null>(null)
const colorMode = useColorMode()

const loadGiscus = () => {
  if (!giscusContainer.value || !props.repo || !props.repoId) return

  giscusContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', props.mapping)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', colorMode.value === 'dark' ? 'dark' : 'light')
  script.setAttribute('data-lang', props.lang)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  giscusContainer.value.appendChild(script)
}

watch(() => colorMode.value, () => {
  loadGiscus()
})

onMounted(() => {
  if (props.repo && props.repoId) {
    loadGiscus()
  }
})

watch([() => props.repo, () => props.repoId], () => {
  if (props.repo && props.repoId) {
    loadGiscus()
  }
})
</script>

<style>
.giscus {
  min-height: 200px;
}

.giscus iframe {
  width: 100%;
  border: none;
}
</style>
