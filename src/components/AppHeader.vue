<template>
  <header
    class="header"
    :class="{ 'header--scrolled': isScrolled, 'header--top': !isScrolled }"
  >
    <div class="container header__inner">
      <a href="#hero" class="header__brand" @click.prevent="scrollTo('hero')">
        <img :src="siteConfig.brand.logo" :alt="siteConfig.brand.name" class="header__logo" />
        <span class="header__name">{{ siteConfig.brand.name }}</span>
      </a>

      <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }">
        <a
          v-for="item in siteConfig.nav"
          :key="item.id"
          :href="`#${item.id}`"
          class="header__link"
          :class="{ 'header__link--active': activeSection === item.id }"
          @click.prevent="handleNavClick(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <a
        href="#contact"
        class="header__cta"
        @click.prevent="scrollTo('contact')"
      >
        立即咨询
      </a>

      <button
        class="header__toggle"
        :aria-expanded="menuOpen"
        aria-label="切换菜单"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '@/config/site'

const isScrolled = ref(false)
const menuOpen = ref(false)
const activeSection = ref('hero')

const sectionIds = siteConfig.nav.map((n) => n.id)

function scrollTo(id) {
  menuOpen.value = false
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleNavClick(id) {
  scrollTo(id)
}

function onScroll() {
  isScrolled.value = window.scrollY > 40

  const scrollPos = window.scrollY + 100
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i])
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = sectionIds[i]
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  transition: background 0.3s, box-shadow 0.3s;

  &--top {
    background: rgba(255, 252, 245, 0.32);
    backdrop-filter: blur(10px);
  }

  &--scrolled {
    background: rgba(255, 252, 245, 0.92);
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-sm);
  }

  &__inner {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 32px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  &__logo {
    width: 36px;
    height: 36px;
  }

  &__name {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary-dark);
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  &__link {
    padding: 8px 16px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #3d5238;
    border-radius: var(--radius-sm);
    transition: color 0.2s, border-color 0.2s;

    &:hover {
      color: var(--color-primary-dark);
    }

    &--active {
      color: var(--color-primary-dark);
      box-shadow: inset 0 -2px 0 var(--color-accent);
    }
  }

  &__cta {
    flex-shrink: 0;
    padding: 10px 24px;
    background: var(--color-primary);
    color: var(--color-white);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 999px;
    transition: background 0.2s, transform 0.2s;

    &:hover {
      background: var(--color-primary-light);
      transform: translateY(-1px);
    }
  }

  &__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 8px;

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--color-primary-dark);
      border-radius: 2px;
      transition: transform 0.3s;
    }
  }
}

@media (max-width: 768px) {
  .header {
    &__nav {
      position: fixed;
      top: var(--header-height);
      left: 0;
      right: 0;
      flex-direction: column;
      background: var(--color-bg-card);
      padding: 16px;
      box-shadow: var(--shadow-md);
      transform: translateY(-120%);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s, opacity 0.3s;
      margin-left: 0;

      &--open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
    }

    &__link {
      width: 100%;
      text-align: center;
      padding: 12px;
    }

    &__cta {
      display: none;
    }

    &__toggle {
      display: flex;
      margin-left: auto;
    }
  }
}
</style>
