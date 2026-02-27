<template>
  <div
    v-if="tableOfContents.length"
    class="toc bg-[#fafafa] dark:bg-gray-800 p-4 rounded-lg border border-black/5 dark:border-white/10"
  >
    <h3 class="font-bold text-black dark:text-white mb-3 flex items-center gap-2">
      <Icon name="lucide:list" class="w-4 h-4" />
      文章目录
    </h3>
    <nav>
      <ul class="space-y-1">
        <li v-for="heading in tableOfContents" :key="heading.id">
          <a
            :href="`#${heading.id}`"
            :class="[
              'block py-1.5 px-3 text-sm text-black/60 dark:text-gray-300 hover:text-black dark:hover:text-white rounded transition-colors',
              `toc-level-${heading.level}`,
              heading.level > 2 ? 'pl-6' : 'pl-3',
            ]"
            @click.prevent="scrollToHeading(heading.id)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  interface Heading {
    id: string
    text: string
    level: number
  }

  interface TableOfContentsProps {
    headings: Heading[]
  }

  const props = defineProps<TableOfContentsProps>()

  const tableOfContents = computed(() => {
    return props.headings.filter((h) => h.level >= 2 && h.level <= 3) // 只显示 H2 和 H3
  })

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // 修正滚动位置，考虑固定头部的高度
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }
</script>

<style scoped>
  @reference "tailwindcss";

  .toc a.toc-level-2 {
    @apply font-medium;
  }
  .toc a.toc-level-3 {
    @apply font-normal text-sm;
  }
  .toc a.active {
    @apply text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20;
  }
</style>
