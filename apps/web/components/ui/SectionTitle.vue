<template>
  <div class="max-w-2xl mb-20">
    <div class="inline-flex items-center gap-3 mb-6 text-black/40 dark:text-white/40 text-sm tracking-widest uppercase">
      <span class="w-8 h-px bg-amber-500" />
      <span>{{ label }}</span>
    </div>
    <h2 class="text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight">
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
