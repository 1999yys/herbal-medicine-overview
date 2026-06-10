<template>
  <section id="products" class="section products">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-tag">PRODUCTS</span>
        <h2 class="section-title">{{ siteConfig.products.title }}</h2>
        <p class="section-subtitle">{{ siteConfig.products.subtitle }}</p>
      </div>

      <div class="stage-selector fade-in" role="tablist" aria-label="药材阶段选择">
        <button
          v-for="(stage, index) in stages"
          :key="stage.id"
          type="button"
          role="tab"
          class="stage-selector__item"
          :class="{ 'stage-selector__item--active': activeStageId === stage.id }"
          :aria-selected="activeStageId === stage.id"
          @click="selectStage(stage.id)"
        >
          <!-- <span class="stage-selector__step">阶段 {{ index + 1 }}</span> -->
          <span class="stage-selector__icon" aria-hidden="true">{{ stage.icon }}</span>
          <span class="stage-selector__label">{{ stage.label }}</span>
          <span class="stage-selector__summary">{{ stage.summary }}</span>
        </button>
      </div>

      <!-- <div class="stage-flow fade-in" aria-hidden="true">
        <template v-for="(stage, index) in stages" :key="stage.id">
          <span
            class="stage-flow__node"
            :class="{ 'stage-flow__node--active': activeStageId === stage.id }"
          >
            {{ stage.icon }} {{ stage.label }}
          </span>
          <span v-if="index < stages.length - 1" class="stage-flow__arrow">→</span>
        </template>
      </div> -->

      <Transition name="stage-panel" mode="out-in">
        <div :key="activeStageId" class="stage-panel">
          <div class="stage-panel__intro">
            <h3 class="stage-panel__title">
              <span aria-hidden="true">{{ currentStage.icon }}</span>
              {{ currentStage.label }}
            </h3>
            <p class="stage-panel__desc">{{ currentStage.description }}</p>
          </div>

          <div class="stage-panel__section">
            <h4 class="stage-panel__section-title">实拍图片</h4>
            <div class="products__grid">
              <article
                v-for="(item, i) in currentStage.images"
                :key="item.id"
                class="product-card"
                :style="{ animationDelay: `${i * 0.06}s` }"
                @click="openPreview(item)"
              >
                <div class="product-card__image-wrap">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="product-card__image"
                    loading="lazy"
                    @error="onImageError($event, item)"
                  />
                  <div class="product-card__origin">{{ item.origin }}</div>
                </div>
                <div class="product-card__body">
                  <h3 class="product-card__name">{{ item.name }}</h3>
                  <p class="product-card__desc">{{ item.description }}</p>
                </div>
              </article>
            </div>
          </div>

          <div v-if="currentStage.videos.length" class="stage-panel__section">
            <h4 class="stage-panel__section-title">相关视频</h4>
            <div class="videos__grid">
              <article
                v-for="item in currentStage.videos"
                :key="item.id"
                class="video-card"
              >
                <div class="video-card__player">
                  <video
                    :ref="(el) => setVideoRef(el, item.id)"
                    :poster="item.poster"
                    controls
                    preload="metadata"
                    playsinline
                    @error="onVideoError($event, item)"
                  >
                    <source :src="item.src" type="video/mp4" />
                    您的浏览器不支持视频播放
                  </video>
                </div>
                <div class="video-card__body">
                  <h3 class="video-card__title">{{ item.title }}</h3>
                  <p class="video-card__desc">{{ item.description }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="previewItem" class="lightbox" @click.self="closePreview">
          <button class="lightbox__close" aria-label="关闭" @click="closePreview">×</button>
          <div class="lightbox__content">
            <img
              :src="previewItem.image"
              :alt="previewItem.name"
              class="lightbox__img"
            />
            <div class="lightbox__info">
              <h3>{{ previewItem.name }}</h3>
              <p class="lightbox__origin">{{ previewItem.origin }}</p>
              <p>{{ previewItem.description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { siteConfig } from '@/config/site'

const stages = siteConfig.products.stages
const activeStageId = ref(stages[0].id)
const previewItem = ref(null)
const videoRefs = {}

const currentStage = computed(
  () => stages.find((s) => s.id === activeStageId.value) ?? stages[0],
)

function selectStage(id) {
  pauseAllVideos()
  activeStageId.value = id
}

function pauseAllVideos() {
  Object.values(videoRefs).forEach((video) => {
    if (video && !video.paused) video.pause()
  })
}

function setVideoRef(el, id) {
  if (el) {
    videoRefs[id] = el
  } else {
    delete videoRefs[id]
  }
}

watch(activeStageId, () => pauseAllVideos())

function openPreview(item) {
  previewItem.value = item
  document.body.style.overflow = 'hidden'
}

function closePreview() {
  previewItem.value = null
  document.body.style.overflow = ''
}

function onImageError(e, item) {
  e.target.src = '/media/images/placeholder.svg'
  e.target.alt = item.name
}

function onVideoError(e, item) {
  const wrap = e.target.closest('.video-card__player')
  if (wrap && !wrap.querySelector('.video-card__fallback')) {
    const fallback = document.createElement('div')
    fallback.className = 'video-card__fallback'
    fallback.innerHTML = `<p>视频暂未上传</p><span>${item.title}</span>`
    e.target.style.display = 'none'
    wrap.appendChild(fallback)
  }
}
</script>

<style scoped lang="scss">
.products {
  background: var(--color-bg);
}

.stage-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    padding: 24px 16px;
    background: var(--color-bg-card);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition:
      border-color 0.25s,
      background 0.25s,
      box-shadow 0.25s,
      transform 0.2s;

    &:hover {
      border-color: var(--color-primary-light);
      transform: translateY(-2px);
    }

    &--active {
      border-color: var(--color-primary);
      background: #f0f7ee;
      box-shadow: var(--shadow-md);

      .stage-selector__label {
        color: var(--color-primary-dark);
      }

      .stage-selector__step {
        background: var(--color-primary);
        color: var(--color-white);
      }
    }
  }

  &__step {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 4px 12px;
    border-radius: 999px;
    background: var(--color-bg-warm);
    color: var(--color-text-muted);
  }

  &__icon {
    font-size: 2rem;
    line-height: 1;
  }

  &__label {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }

  &__summary {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
}

.stage-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-bottom: 40px;
  padding: 14px 20px;
  background: var(--color-bg-card);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);

  &__node {
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    transition: color 0.25s;

    &--active {
      color: var(--color-primary-dark);
      font-weight: 600;
    }
  }

  &__arrow {
    color: var(--color-accent);
    font-size: 1.125rem;
  }
}

.stage-panel {
  &__intro {
    margin-bottom: 36px;
    padding: 24px 28px;
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
    border-left: 4px solid var(--color-primary);
  }

  &__title {
    font-family: var(--font-serif);
    font-size: 1.375rem;
    color: var(--color-primary-dark);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__desc {
    font-size: 1.0625rem;
    color: var(--color-text-muted);
    line-height: 1.75;
    max-width: 720px;
  }

  &__section {
    margin-bottom: 48px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    color: var(--color-primary-dark);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
  }
}

.stage-panel-enter-active,
.stage-panel-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.stage-panel-enter-from,
.stage-panel-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.product-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);

    .product-card__image {
      transform: scale(1.05);
    }
  }

  &__image-wrap {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--color-bg-warm);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &__origin {
    position: absolute;
    bottom: 12px;
    left: 12px;
    padding: 4px 12px;
    background: rgba(26, 61, 22, 0.75);
    backdrop-filter: blur(4px);
    color: var(--color-white);
    font-size: 0.8125rem;
    border-radius: 999px;
  }

  &__body {
    padding: 20px 24px 24px;
  }

  &__name {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    color: var(--color-primary-dark);
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.videos__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.video-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: var(--shadow-md);
  }

  &__player {
    position: relative;
    aspect-ratio: 16 / 9;
    background: var(--color-primary-dark);

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #000;
    }

    :deep(.video-card__fallback) {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.7);
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));

      p {
        font-size: 0.875rem;
      }

      span {
        font-family: var(--font-serif);
        font-size: 1rem;
        color: var(--color-accent-light);
      }
    }
  }

  &__body {
    padding: 24px;
  }

  &__title {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    color: var(--color-primary-dark);
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(26, 61, 22, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  &__close {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 44px;
    height: 44px;
    font-size: 1.75rem;
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  &__content {
    max-width: 800px;
    width: 100%;
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  &__img {
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
    background: var(--color-bg-warm);
  }

  &__info {
    padding: 28px 32px;

    h3 {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      color: var(--color-primary-dark);
      margin-bottom: 8px;
    }
  }

  &__origin {
    color: var(--color-accent);
    font-size: 0.875rem;
    margin-bottom: 12px;
  }

  &__info p:last-child {
    color: var(--color-text-muted);
    line-height: 1.7;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s;

  .lightbox__content {
    transition: transform 0.3s;
  }
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .lightbox__content {
    transform: scale(0.95);
  }
}

@media (max-width: 900px) {
  .stage-selector {
    grid-template-columns: 1fr;
  }

  .stage-flow {
    display: none;
  }

  .products__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .videos__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .products__grid {
    grid-template-columns: 1fr;
  }

  .stage-selector__label {
    font-size: 1.125rem;
  }
}
</style>
