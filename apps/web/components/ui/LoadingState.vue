<template>
  <div class="py-16 text-center">
    <Icon
      name="lucide:loader-2"
      class="w-8 h-8 animate-spin text-black/40 dark:text-white/40 mx-auto"
    />
    <p class="text-black/40 dark:text-white/40 mt-4">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
}>(), {
  message: '加载中...',
})
</script>
