<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="section-header" v-scroll-reveal="'up'">
        <span class="section-tag">CONTACT</span>
        <h2 class="section-title">{{ siteConfig.contact.title }}</h2>
        <p class="section-subtitle">{{ siteConfig.contact.subtitle }}</p>
      </div>

      <div class="contact__wrapper">
        <div
          v-for="(card, i) in contactCards"
          :key="card.key"
          class="contact__card"
          :class="{ 'contact__card--primary': card.primary }"
          v-scroll-reveal="{
            direction: i % 2 === 0 ? 'left' : 'right',
            delay: i * 100,
          }"
        >
          <div class="contact__card-header">
            <span class="contact__icon">{{ card.icon }}</span>
            <h3>{{ card.title }}</h3>
          </div>
          <a
            v-if="card.href"
            :href="card.href"
            class="contact__value"
            :class="{ 'contact__value--large': card.primary }"
          >
            {{ card.value }}
          </a>
          <p v-else class="contact__value">{{ card.value }}</p>
          <p v-if="card.hint" class="contact__hint">{{ card.hint }}</p>
        </div>
      </div>

      <p class="contact__note" v-scroll-reveal="'up'">{{ siteConfig.contact.note }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { siteConfig } from '@/config/site'

const contactCards = computed(() => [
  {
    key: 'phone',
    primary: true,
    icon: '📞',
    title: '电话咨询',
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/-/g, '')}`,
    hint: '点击可直接拨打',
  },
  {
    key: 'wechat',
    icon: '💬',
    title: '微信联系',
    value: siteConfig.contact.wechat,
    hint: '添加微信时请备注「药材咨询」',
  },
  {
    key: 'email',
    icon: '✉️',
    title: '电子邮箱',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    key: 'address',
    icon: '📍',
    title: '联系地址',
    value: siteConfig.contact.address,
    hint: siteConfig.contact.workTime,
  },
])
</script>

<style scoped lang="scss">
.contact {
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-warm) 100%);

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 40px;
  }

  &__card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 28px 24px;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    &--primary {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);

      .contact__card-header h3,
      .contact__value,
      .contact__hint {
        color: var(--color-white);
      }

      .contact__hint {
        opacity: 0.75;
      }

      .contact__value--large {
        font-size: 1.375rem;
        font-weight: 600;
        color: var(--color-accent-light);

        &:hover {
          color: var(--color-white);
        }
      }
    }
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;

    h3 {
      font-family: var(--font-serif);
      font-size: 1rem;
      color: var(--color-primary-dark);
    }
  }

  &__icon {
    font-size: 1.25rem;
  }

  &__value {
    font-size: 1.0625rem;
    color: var(--color-text);
    word-break: break-all;
    transition: color 0.2s;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__hint {
    margin-top: 10px;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  &__note {
    text-align: center;
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    max-width: 600px;
    margin-inline: auto;
    padding: 20px 28px;
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
    border: 1px dashed var(--color-border);
  }
}

@media (max-width: 900px) {
  .contact__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .contact__wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
