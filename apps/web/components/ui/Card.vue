<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group relative p-10 bg-[#fafafa] dark:bg-[#111] hover:bg-white dark:hover:bg-[#1a1a1a] transition-all duration-500"
  >
    <div class="text-6xl font-bold text-black/10 dark:text-white/20 group-hover:text-amber-500/30 transition-colors mb-6">
      {{ String(index).padStart(2, '0') }}
    </div>

    <div
      v-if="$slots.icon || icon"
      class="w-12 h-12 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-amber-500 group-hover:bg-amber-500 transition-all duration-300 mb-6"
    >
      <slot name="icon">
        <Icon
          :name="icon!"
          class="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-white transition-colors"
        />
      </slot>
    </div>

    <h3 class="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-amber-500 transition-colors">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>

    <p class="text-black/50 dark:text-white/50 leading-relaxed">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

withDefaults(defineProps<{
  index: number
  title?: string
  description?: string
  icon?: string
  to?: string
}>(), {
  title: '',
  description: '',
  icon: undefined,
  to: undefined,
})
</script>
