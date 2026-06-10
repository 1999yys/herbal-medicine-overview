<template>
  <footer class="footer">
      <div class="container footer__inner" v-scroll-reveal="'up'">
      <div class="footer__brand">
        <img :src="siteConfig.brand.logo" :alt="siteConfig.brand.name" class="footer__logo" />
        <span>{{ siteConfig.brand.name }}</span>
      </div>
      <p class="footer__tagline">{{ siteConfig.brand.tagline }}</p>
      <div class="footer__divider"></div>
      <p class="footer__copyright">{{ siteConfig.footer.copyright }}</p>
      <p v-if="siteConfig.footer.icp" class="footer__icp">{{ siteConfig.footer.icp }}</p>
    </div>
  </footer>
</template>

<script setup>
import { siteConfig } from '@/config/site'
</script>

<style scoped lang="scss">
.footer {
  background: var(--color-primary-dark);
  color: rgba(255, 255, 255, 0.85);
  padding: 48px 0 32px;

  &__inner {
    text-align: center;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-serif);
    font-size: 1.125rem;
    margin-bottom: 8px;
  }

  &__logo {
    width: 28px;
    height: 28px;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }

  &__tagline {
    font-size: 0.875rem;
    opacity: 0.65;
    margin-bottom: 24px;
  }

  &__divider {
    width: 48px;
    height: 2px;
    background: var(--color-accent);
    margin: 0 auto 24px;
  }

  &__copyright,
  &__icp {
    font-size: 0.8125rem;
    opacity: 0.5;
  }

  &__icp {
    margin-top: 4px;
  }
}
</style>
