<template>
  <section :class="sectionClass">
    <div class="container mx-auto px-6 md:px-12">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'default' | 'alternate' | 'dark'
}>(), {
  variant: 'default',
})

const sectionClass = computed(() => {
  switch (props.variant) {
    case 'alternate':
      return 'relative py-32 bg-[#fafafa] dark:bg-[#111]'
    case 'dark':
      return 'relative py-32 bg-[#0a0a0a]'
    default:
      return 'relative py-32 bg-[#fafafa] dark:bg-[#0a0a0a]'
  }
})
</script>
