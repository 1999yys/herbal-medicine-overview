<template>
  <div class="home">
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ProductGallery />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import ContactSection from '@/components/ContactSection.vue'

const AUTO_SCROLL_DELAY = 1000

let autoScrollTimer = null
let onUserScroll = null

function cancelAutoScroll() {
  if (autoScrollTimer) {
    clearTimeout(autoScrollTimer)
    autoScrollTimer = null
  }
}

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  autoScrollTimer = setTimeout(scrollToProducts, AUTO_SCROLL_DELAY)

  onUserScroll = () => {
    if (window.scrollY > 0) cancelAutoScroll()
  }

  window.addEventListener('scroll', onUserScroll, { passive: true })
})

onUnmounted(() => {
  cancelAutoScroll()
  if (onUserScroll) {
    window.removeEventListener('scroll', onUserScroll)
  }
})
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}
</style>
