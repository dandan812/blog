<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta v-if="description" name="description" :content="description" />
    <Meta v-if="ogTitle" property="og:title" :content="ogTitle" />
    <Meta v-if="ogDescription" property="og:description" :content="ogDescription" />
    <Meta v-if="ogType" property="og:type" :content="ogType" />
    <Meta v-if="ogUrl" property="og:url" :content="ogUrl" />
    <Meta v-if="ogImage" property="og:image" :content="ogImage" />
    <Meta v-if="ogImageWidth" property="og:image:width" :content="ogImageWidth.toString()" />
    <Meta v-if="ogImageHeight" property="og:image:height" :content="ogImageHeight.toString()" />
    <Meta v-if="twitterCard" name="twitter:card" :content="twitterCard" />
    <Meta v-if="twitterTitle" name="twitter:title" :content="twitterTitle" />
    <Meta v-if="twitterDescription" name="twitter:description" :content="twitterDescription" />
    <Meta v-if="twitterImage" name="twitter:image" :content="twitterImage" />
    <Meta v-if="author" name="author" :content="author" />
    <Meta v-if="keywords" name="keywords" :content="keywords.join(', ')" />
    <Meta name="theme-color" content="#0a0a0a" />
    <Link v-if="canonical" rel="canonical" :href="canonical" />
    <Link
      rel="alternate"
      type="application/rss+xml"
      title="RSS Feed"
      :href="$config.public.siteUrl + '/rss.xml'"
      v-if="$config.public.siteUrl"
    />
  </Head>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    description?: string
    ogTitle?: string
    ogDescription?: string
    ogType?: string
    ogUrl?: string
    ogImage?: string
    ogImageWidth?: number
    ogImageHeight?: number
    twitterCard?: string
    twitterTitle?: string
    twitterDescription?: string
    twitterImage?: string
    canonical?: string
    author?: string
    keywords?: string[]
  }

  defineProps<Props>()
</script>
