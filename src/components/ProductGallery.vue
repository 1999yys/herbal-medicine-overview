<template>
  <section id="products" class="section products">
    <div class="container">
      <div class="section-header" v-scroll-reveal="'up'">
        <span class="section-tag">PRODUCTS</span>
        <h2 class="section-title">{{ siteConfig.products.title }}</h2>
        <p class="section-subtitle">{{ siteConfig.products.subtitle }}</p>
      </div>

      <div class="stage-selector" v-scroll-reveal:left role="tablist" aria-label="药材阶段选择">
        <button
          v-for="stage in stages"
          :key="stage.id"
          type="button"
          role="tab"
          class="stage-selector__item"
          :class="{ 'stage-selector__item--active': activeStageId === stage.id }"
          :aria-selected="activeStageId === stage.id"
          @click="selectStage(stage.id)"
        >
          <span class="stage-selector__icon" aria-hidden="true">{{ stage.icon }}</span>
          <span class="stage-selector__label">{{ stage.label }}</span>
          <span class="stage-selector__summary">{{ stage.summary }}</span>
        </button>
      </div>

      <Transition name="stage-panel" mode="out-in">
        <div :key="activeStageId" class="stage-panel">
          <div class="stage-panel__intro" v-scroll-reveal:right>
            <h3 class="stage-panel__title">
              <span aria-hidden="true">{{ currentStage.icon }}</span>
              {{ currentStage.label }}
            </h3>
            <p class="stage-panel__desc">{{ currentStage.description }}</p>
          </div>

          <div v-if="currentStage.imageCategories?.length" class="stage-panel__section">
            <div class="stage-panel__section-head">
              <h4 class="stage-panel__section-title">实拍图片</h4>
              <p class="stage-panel__section-hint">按药材类别浏览，点击可预览并左右切换同类图片</p>
            </div>

            <div class="products__grid">
              <article
                v-for="(category, i) in pagedCategories"
                :key="category.id"
                class="category-card"
                v-scroll-reveal="{
                  direction: i % 2 === 0 ? 'left' : 'right',
                  delay: i * 100,
                }"
                @click="openCategoryPreview(category, 0)"
              >
                <CategoryFan
                  :images="category.images"
                  @select="(index) => openCategoryPreview(category, index)"
                />
                <div class="category-card__body">
                  <h3 class="category-card__name">{{ category.name }}</h3>
                  <p v-if="category.origin" class="category-card__origin">{{ category.origin }}</p>
                  <p class="category-card__desc">{{ category.summary }}</p>
                </div>
              </article>
            </div>

            <PaginationBar
              v-if="categoryTotalPages > 1"
              :current="categoryPage"
              :total="categoryTotalPages"
              @change="categoryPage = $event"
            />
          </div>

          <div v-if="currentStage.videos?.length" class="stage-panel__section">
            <div class="stage-panel__section-head">
              <h4 class="stage-panel__section-title">相关视频</h4>
              <p class="stage-panel__section-hint">当前阶段视频介绍，支持分页浏览</p>
            </div>

            <div class="videos__grid">
              <article
                v-for="(item, i) in pagedVideos"
                :key="item.id"
                class="video-card"
                v-scroll-reveal="{
                  direction: i % 2 === 0 ? 'right' : 'left',
                  delay: i * 120,
                }"
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

            <PaginationBar
              v-if="videoTotalPages > 1"
              :current="videoPage"
              :total="videoTotalPages"
              @change="videoPage = $event"
            />
          </div>
        </div>
      </Transition>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="previewCategory"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`${previewCategory.name} 图片预览`"
          @click.self="closePreview"
        >
          <button class="lightbox__close" aria-label="关闭" @click="closePreview">×</button>

          <button
            v-if="previewCategory.images.length > 1"
            class="lightbox__nav lightbox__nav--prev"
            aria-label="上一张"
            :disabled="previewIndex === 0"
            @click.stop="prevImage"
          >
            ‹
          </button>

          <div class="lightbox__content">
            <div class="lightbox__header">
              <span class="lightbox__category">{{ previewCategory.name }}</span>
              <span class="lightbox__counter">
                {{ previewIndex + 1 }} / {{ previewCategory.images.length }}
              </span>
            </div>
            <img
              :key="currentPreviewImage.id"
              :src="currentPreviewImage.image"
              :alt="currentPreviewImage.name"
              class="lightbox__img"
              @error="onPreviewImageError"
            />
            <div class="lightbox__info">
              <h3>{{ currentPreviewImage.name }}</h3>
              <p v-if="previewCategory.origin" class="lightbox__origin">
                {{ previewCategory.origin }}
              </p>
              <p>{{ currentPreviewImage.description }}</p>
            </div>
          </div>

          <button
            v-if="previewCategory.images.length > 1"
            class="lightbox__nav lightbox__nav--next"
            aria-label="下一张"
            :disabled="previewIndex === previewCategory.images.length - 1"
            @click.stop="nextImage"
          >
            ›
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '@/config/site'
import PaginationBar from '@/components/PaginationBar.vue'
import CategoryFan from '@/components/CategoryFan.vue'

const stages = siteConfig.products.stages
const categoriesPerPage = siteConfig.products.categoriesPerPage ?? 3
const videosPerPage = siteConfig.products.videosPerPage ?? 3

const activeStageId = ref(stages[0].id)
const categoryPage = ref(1)
const videoPage = ref(1)
const previewCategory = ref(null)
const previewIndex = ref(0)
const videoRefs = {}

const currentStage = computed(
  () => stages.find((s) => s.id === activeStageId.value) ?? stages[0],
)

const categoryTotalPages = computed(() => {
  const total = currentStage.value.imageCategories?.length ?? 0
  return Math.max(1, Math.ceil(total / categoriesPerPage))
})

const videoTotalPages = computed(() => {
  const total = currentStage.value.videos?.length ?? 0
  return Math.max(1, Math.ceil(total / videosPerPage))
})

const pagedCategories = computed(() => {
  const list = currentStage.value.imageCategories ?? []
  const start = (categoryPage.value - 1) * categoriesPerPage
  return list.slice(start, start + categoriesPerPage)
})

const pagedVideos = computed(() => {
  const list = currentStage.value.videos ?? []
  const start = (videoPage.value - 1) * videosPerPage
  return list.slice(start, start + videosPerPage)
})

const currentPreviewImage = computed(() => {
  if (!previewCategory.value) return { id: '', name: '', description: '', image: '' }
  return previewCategory.value.images[previewIndex.value] ?? previewCategory.value.images[0]
})

function selectStage(id) {
  pauseAllVideos()
  activeStageId.value = id
  categoryPage.value = 1
  videoPage.value = 1
  closePreview()
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

watch(categoryPage, () => closePreview())

function openCategoryPreview(category, index) {
  previewCategory.value = category
  previewIndex.value = index
  document.body.style.overflow = 'hidden'
}

function closePreview() {
  previewCategory.value = null
  previewIndex.value = 0
  document.body.style.overflow = ''
}

function prevImage() {
  if (previewIndex.value > 0) previewIndex.value -= 1
}

function nextImage() {
  if (previewCategory.value && previewIndex.value < previewCategory.value.images.length - 1) {
    previewIndex.value += 1
  }
}

function onKeydown(e) {
  if (!previewCategory.value) return

  if (e.key === 'Escape') closePreview()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  closePreview()
})

function onPreviewImageError(e) {
  e.target.src = '/media/images/placeholder.svg'
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
    }
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

  &__section-head {
    margin-bottom: 20px;
  }

  &__section-title {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    color: var(--color-primary-dark);
    margin-bottom: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
  }

  &__section-hint {
    font-size: 0.875rem;
    color: var(--color-text-muted);
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
  margin-bottom: 28px;
}

.category-card {
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
  }

  &__body {
    padding: 20px 24px 24px;
  }

  &__name {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    color: var(--color-primary-dark);
    margin-bottom: 6px;
  }

  &__origin {
    font-size: 0.8125rem;
    color: var(--color-accent);
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.videos__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 28px;
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
    padding: 20px;
  }

  &__title {
    font-family: var(--font-serif);
    font-size: 1.0625rem;
    color: var(--color-primary-dark);
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(26, 61, 22, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 72px;

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
    z-index: 2;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    font-size: 2rem;
    line-height: 1;
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, opacity 0.2s;
    z-index: 2;

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.28);
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &--prev {
      left: 20px;
    }

    &--next {
      right: 20px;
    }
  }

  &__content {
    max-width: 880px;
    width: 100%;
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: var(--color-bg-warm);
    border-bottom: 1px solid var(--color-border);
  }

  &__category {
    font-family: var(--font-serif);
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary-dark);
  }

  &__counter {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  &__img {
    width: 100%;
    max-height: 62vh;
    object-fit: contain;
    background: #1a1a1a;
  }

  &__info {
    padding: 24px 28px;

    h3 {
      font-family: var(--font-serif);
      font-size: 1.375rem;
      color: var(--color-primary-dark);
      margin-bottom: 8px;
    }
  }

  &__origin {
    color: var(--color-accent);
    font-size: 0.875rem;
    margin-bottom: 10px;
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

  .products__grid,
  .videos__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .lightbox {
    padding: 16px 56px;
  }
}

@media (max-width: 560px) {
  .products__grid,
  .videos__grid {
    grid-template-columns: 1fr;
  }

  .lightbox {
    padding: 12px;

    &__nav {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;

      &--prev {
        left: 8px;
      }

      &--next {
        right: 8px;
      }
    }
  }
}
</style>
