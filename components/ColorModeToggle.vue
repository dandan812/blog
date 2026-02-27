<template>
  <ClientOnly>
    <button
      class="p-2 text-black/30 hover:text-black transition-colors"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      @click="toggleDark"
    >
      <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4" />
    </button>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
  const colorMode = useColorMode()

  const isDark = computed({
    get() {
      return colorMode.preference === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })

  function toggleDark() {
    isDark.value = !isDark.value
  }
</script>
