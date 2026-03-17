<template>
  <section class="py-20 bg-[#fafafa] dark:bg-[#111]">
    <div class="container mx-auto px-6 md:px-12">
      <div :class="contentClass">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
}>(), {
  maxWidth: 'full',
})

const contentClass = computed(() => {
  const maxWidths: Record<string, string> = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    'full': '',
  }
  return maxWidths[props.maxWidth ?? 'full']
})
</script>
