<template>
  <section id="videos" class="section videos">
    <div class="container">
      <div class="section-header fade-in">
        <span class="section-tag">VIDEO</span>
        <h2 class="section-title">{{ siteConfig.videos.title }}</h2>
        <p class="section-subtitle">{{ siteConfig.videos.subtitle }}</p>
      </div>

      <div class="videos__grid">
        <article
          v-for="(item, i) in siteConfig.videos.items"
          :key="item.id"
          class="video-card fade-in"
          :style="{ animationDelay: `${i * 0.1}s` }"
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
  </section>
</template>

<script setup>
import { siteConfig } from '@/config/site'

const videoRefs = {}

function setVideoRef(el, id) {
  if (el) videoRefs[id] = el
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
.videos {
  background: var(--color-bg-card);

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

.video-card {
  background: var(--color-bg);
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
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .videos__grid {
    grid-template-columns: 1fr;
  }
}
</style>
