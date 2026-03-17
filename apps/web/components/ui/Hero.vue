<template>
  <section class="relative py-24 md:py-32 bg-[#0a0a0a]">
    <div class="absolute inset-0">
      <div
        class="absolute inset-0"
        style="
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
        "
      />
    </div>

    <div class="relative container mx-auto px-6 md:px-12">
      <div class="inline-flex items-center gap-3 mb-8 text-white/40 text-sm tracking-widest uppercase">
        <span class="w-8 h-px bg-amber-500" />
        <span>{{ label }}</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-6">
        <slot />
      </h1>

      <p
        v-if="$slots.subtitle"
        class="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light"
      >
        <slot name="subtitle" />
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
