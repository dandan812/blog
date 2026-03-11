<template>
  <ClientOnly>
    <button
      class="p-2 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
      :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
      @click="toggleDark"
    >
      <Icon
        :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
        class="w-4 h-4"
      />
    </button>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
