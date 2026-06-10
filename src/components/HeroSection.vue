<template>
  <section id="hero" class="hero">
    <div class="hero__bg">
      <img
        :src="siteConfig.hero.backgroundImage"
        :alt="siteConfig.hero.title"
        class="hero__bg-img"
        @error="onImageError"
      />
      <div class="hero__overlay"></div>
    </div>

    <div class="container hero__content fade-in">
      <p class="hero__eyebrow">{{ siteConfig.brand.tagline }}</p>
      <h1 class="hero__title">{{ siteConfig.hero.title }}</h1>
      <p class="hero__subtitle">{{ siteConfig.hero.subtitle }}</p>
      <p class="hero__desc">{{ siteConfig.hero.description }}</p>
      <div class="hero__actions">
        <a
          href="#products"
          class="hero__btn hero__btn--primary"
          @click.prevent="scrollTo('products')"
        >
          浏览产品
        </a>
        <a
          href="#contact"
          class="hero__btn hero__btn--outline"
          @click.prevent="scrollTo('contact')"
        >
          联系我们
        </a>
      </div>
    </div>

    <div class="hero__scroll-hint" aria-hidden="true">
      <span>向下滚动</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { siteConfig } from "@/config/site";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function onImageError(e) {
  e.target.style.display = "none";
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--header-height);
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a3d16 0%, #2d5a27 40%, #4a7c3f 100%);
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.78;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(26, 61, 22, 0.1) 0%,
      rgba(26, 61, 22, 0.2) 55%,
      rgba(26, 61, 22, 0.3) 100%
    );
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 680px;
    padding-block: 80px;
  }

  &__eyebrow {
    font-size: 0.9375rem;
    letter-spacing: 0.25em;
    color: #f0deb0;
    margin-bottom: 20px;
  }

  &__title {
    font-family: var(--font-serif);
    font-size: clamp(2.25rem, 6vw, 3.75rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    color: #fffcf5;
  }

  &__subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 600;
    color: #f5f0e6;
    margin-bottom: 20px;
  }

  &__desc {
    font-size: 1.0625rem;
    line-height: 1.85;
    color: #ede8dc;
    margin-bottom: 40px;
    max-width: 540px;
  }

  &__actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    padding: 14px 32px;
    font-size: 0.9375rem;
    font-weight: 500;
    border-radius: 999px;
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      background 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    &--primary {
      background: var(--color-accent);
      color: var(--color-primary-dark);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

      &:hover {
        background: var(--color-accent-light);
      }
    }

    &--outline {
      border: 2px solid #fffcf5;
      color: #fffcf5;

      &:hover {
        background: rgba(255, 252, 245, 0.15);
        border-color: #fffcf5;
      }
    }
  }

  &__scroll-hint {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #ede8dc;
    font-size: 0.8125rem;
    animation: bounce 2s infinite;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(8px);
  }
}
</style>
