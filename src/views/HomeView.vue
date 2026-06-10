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
import { onMounted, onUnmounted, nextTick } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import ContactSection from '@/components/ContactSection.vue'

const AUTO_SCROLL_DELAY = 1000
const AUTO_SCROLL_DURATION = 3000

let autoScrollTimer = null
let scrollAnimationId = null
let isAutoScrolling = false
let onUserIntent = null
let scrollAllowedAfter = 0

function waitForPageReady() {
  if (document.readyState === 'complete') {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    window.addEventListener('load', resolve, { once: true })
  })
}

function waitForFirstPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve)
    })
  })
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function scrollToY(y) {
  window.scrollTo(0, y)
}

function cancelScrollAnimation() {
  if (scrollAnimationId !== null) {
    cancelAnimationFrame(scrollAnimationId)
    scrollAnimationId = null
  }
  isAutoScrolling = false
  document.documentElement.style.scrollBehavior = ''
}

function cancelAutoScroll() {
  if (autoScrollTimer) {
    clearTimeout(autoScrollTimer)
    autoScrollTimer = null
  }
  cancelScrollAnimation()
}

function smoothScrollTo(targetY, duration) {
  cancelScrollAnimation()

  const html = document.documentElement
  html.style.scrollBehavior = 'auto'

  const startY = window.scrollY
  const distance = targetY - startY

  if (Math.abs(distance) < 2) {
    html.style.scrollBehavior = ''
    return
  }

  isAutoScrolling = true
  const startTime = performance.now()

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    scrollToY(startY + distance * easeOutCubic(progress))

    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(step)
    } else {
      scrollToY(targetY)
      cancelScrollAnimation()
    }
  }

  scrollAnimationId = requestAnimationFrame(step)
}

function scrollToProducts() {
  autoScrollTimer = null

  const waitMs = scrollAllowedAfter - Date.now()
  if (waitMs > 0) {
    autoScrollTimer = window.setTimeout(scrollToProducts, waitMs)
    return
  }

  const el = document.getElementById('products')
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY
  smoothScrollTo(targetY, AUTO_SCROLL_DURATION)
}

function scheduleAutoScroll() {
  scrollAllowedAfter = Date.now() + AUTO_SCROLL_DELAY
  autoScrollTimer = window.setTimeout(scrollToProducts, AUTO_SCROLL_DELAY)
}

function handleUserIntent() {
  if (isAutoScrolling || autoScrollTimer) {
    cancelAutoScroll()
  }
}

onMounted(async () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  if (window.scrollY > 0) {
    const html = document.documentElement
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = ''
  }

  await waitForPageReady()
  await nextTick()
  await waitForFirstPaint()

  scheduleAutoScroll()

  onUserIntent = handleUserIntent
  window.addEventListener('wheel', onUserIntent, { passive: true })
  window.addEventListener('touchstart', onUserIntent, { passive: true })
  window.addEventListener('keydown', onUserIntent)
})

onUnmounted(() => {
  cancelAutoScroll()
  if (onUserIntent) {
    window.removeEventListener('wheel', onUserIntent)
    window.removeEventListener('touchstart', onUserIntent)
    window.removeEventListener('keydown', onUserIntent)
  }
})
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}
</style>
