<template>
  <div class="py-16 text-center">
    <h3 class="text-2xl font-bold text-black dark:text-white mb-3">
      {{ title }}
    </h3>
    <p class="text-black/40 dark:text-white/40">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
