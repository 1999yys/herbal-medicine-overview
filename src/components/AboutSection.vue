<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="section-header" v-scroll-reveal="'up'">
        <span class="section-tag">ABOUT</span>
        <h2 class="section-title">{{ siteConfig.about.title }}</h2>
      </div>

      <div class="about__grid">
        <div class="about__text" v-scroll-reveal:left>
          <p v-for="(para, i) in siteConfig.about.paragraphs" :key="i" class="about__para">
            {{ para }}
          </p>
        </div>

        <div class="about__highlights">
          <div
            v-for="(item, i) in siteConfig.about.highlights"
            :key="item.label"
            class="about__card"
            v-scroll-reveal="{
              direction: i % 2 === 0 ? 'right' : 'left',
              delay: i * 120,
            }"
          >
            <span class="about__icon">{{ item.icon }}</span>
            <h3 class="about__card-title">{{ item.label }}</h3>
            <p class="about__card-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig } from '@/config/site'
</script>

<style scoped lang="scss">
.about {
  background: var(--color-bg-card);

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  &__text {
    padding-right: 24px;
  }

  &__para {
    font-size: 1.0625rem;
    color: var(--color-text-muted);
    margin-bottom: 20px;
    text-align: justify;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__highlights {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 28px 24px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
  }

  &__icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 12px;
  }

  &__card-title {
    font-family: var(--font-serif);
    font-size: 1.0625rem;
    color: var(--color-primary-dark);
    margin-bottom: 6px;
  }

  &__card-desc {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about__text {
    padding-right: 0;
  }
}

@media (max-width: 480px) {
  .about__highlights {
    grid-template-columns: 1fr;
  }
}
</style>
