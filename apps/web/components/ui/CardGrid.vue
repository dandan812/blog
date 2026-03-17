<template>
  <div
    class="grid gap-px bg-black/10 dark:bg-white/10"
    :class="gridClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  cols?: 2 | 3 | 4
}>(), {
  cols: 3,
})

const gridClass = computed(() => {
  switch (props.cols) {
    case 2:
      return 'md:grid-cols-2'
    case 4:
      return 'md:grid-cols-2 lg:grid-cols-4'
    default:
      return 'md:grid-cols-3'
  }
})
</script>
