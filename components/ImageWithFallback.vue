<template>
  <NuxtImg
    v-bind="$attrs"
    :src="finalSrc"
    :loading="lazy ? 'lazy' : 'eager'"
    :alt="alt"
    @load="onLoad"
    @error="onError"
    :quality="quality || 80"
    :format="format || 'webp'"
    :sizes="sizes || '100vw'"
  />
</template>

<script setup lang="ts">
  interface Props {
    src: string
    alt?: string
    lazy?: boolean
    width?: string | number
    height?: string | number
    quality?: number
    format?: 'webp' | 'avif' | 'jpeg' | 'png'
    sizes?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    lazy: true,
    alt: '',
    quality: 80,
    format: 'webp',
  })

  // 处理图像源，如果没有则提供占位符
  const finalSrc = computed(() => {
    if (props.src) return props.src
    return '/images/placeholder.jpg' // 提供默认占位符图像
  })

  const emit = defineEmits<{
    load: [Event]
    error: [Event]
  }>()

  const onLoad = (event: Event) => {
    emit('load', event)
  }

  const onError = (event: Event) => {
    // 在图像加载失败时可能将 src 设置为占位符
    emit('error', event)
  }
</script>
