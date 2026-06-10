<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-tag">CONTACT</span>
        <h2 class="section-title">{{ siteConfig.contact.title }}</h2>
        <p class="section-subtitle">{{ siteConfig.contact.subtitle }}</p>
      </div>

      <div class="contact__wrapper fade-in">
        <div class="contact__card contact__card--primary">
          <div class="contact__card-header">
            <span class="contact__icon">📞</span>
            <h3>电话咨询</h3>
          </div>
          <a :href="`tel:${siteConfig.contact.phone.replace(/-/g, '')}`" class="contact__value contact__value--large">
            {{ siteConfig.contact.phone }}
          </a>
          <p class="contact__hint">点击可直接拨打</p>
        </div>

        <div class="contact__card">
          <div class="contact__card-header">
            <span class="contact__icon">💬</span>
            <h3>微信联系</h3>
          </div>
          <p class="contact__value">{{ siteConfig.contact.wechat }}</p>
          <p class="contact__hint">添加微信时请备注「药材咨询」</p>
        </div>

        <div class="contact__card">
          <div class="contact__card-header">
            <span class="contact__icon">✉️</span>
            <h3>电子邮箱</h3>
          </div>
          <a :href="`mailto:${siteConfig.contact.email}`" class="contact__value">
            {{ siteConfig.contact.email }}
          </a>
        </div>

        <div class="contact__card">
          <div class="contact__card-header">
            <span class="contact__icon">📍</span>
            <h3>联系地址</h3>
          </div>
          <p class="contact__value">{{ siteConfig.contact.address }}</p>
          <p class="contact__hint">{{ siteConfig.contact.workTime }}</p>
        </div>
      </div>

      <p class="contact__note fade-in">{{ siteConfig.contact.note }}</p>
    </div>
  </section>
</template>

<script setup>
import { siteConfig } from '@/config/site'
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
