<template>
  <div
    ref="rootRef"
    class="category-fan"
    :class="[
      `category-fan--count-${bladeCount}`,
      { 'category-fan--opened': isOpened },
    ]"
  >
    <div class="category-fan__stack">
      <div
        v-for="(item, index) in blades"
        :key="item.id"
        class="category-fan__blade"
        :style="bladeStyle(index, bladeCount)"
        @click.stop="emit('select', index)"
      >
        <img
          :src="item.image"
          :alt="item.name"
          loading="lazy"
          @error="onImageError($event, item)"
        />
      </div>
    </div>

    <span v-if="totalCount > maxBlades" class="category-fan__badge">
      共 {{ totalCount }} 张
    </span>
    <span v-else-if="totalCount > 1" class="category-fan__badge">
      {{ totalCount }} 张
    </span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const HOVER_SPREAD_DEG = 59.2 // 32 × 1.85，保持悬停展开幅度不变

const props = defineProps({
  images: { type: Array, required: true },
  maxBlades: { type: Number, default: 5 },
  spreadDeg: { type: Number, default: 40 },
})

const emit = defineEmits(['select'])

const rootRef = ref(null)
const isOpened = ref(false)

let observer = null

const totalCount = computed(() => props.images.length)

const blades = computed(() => props.images.slice(0, props.maxBlades))

const bladeCount = computed(() => blades.value.length)

function bladeStyle(index, count) {
  const spread = props.spreadDeg

  if (count <= 1) {
    return {
      '--fan-angle': '0deg',
      '--fan-angle-hover': '0deg',
      '--fan-delay': '0ms',
      zIndex: 2,
    }
  }

  const step = spread / (count - 1)
  const angle = -spread / 2 + step * index
  const stepHover = HOVER_SPREAD_DEG / (count - 1)
  const angleHover = -HOVER_SPREAD_DEG / 2 + stepHover * index
  const center = (count - 1) / 2
  const zIndex = count - Math.abs(index - center)

  return {
    '--fan-angle': `${angle.toFixed(2)}deg`,
    '--fan-angle-hover': `${angleHover.toFixed(2)}deg`,
    '--fan-delay': `${index * 120}ms`,
    zIndex: Math.round(zIndex) + 1,
  }
}

function openFan() {
  if (isOpened.value) return
  isOpened.value = true
  observer?.disconnect()
  observer = null
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1
}

onMounted(() => {
  const el = rootRef.value
  if (!el) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isOpened.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) openFan()
      })
    },
    { threshold: 0.25, rootMargin: '0px 0px -6% 0px' },
  )

  observer.observe(el)

  // 已在视口内（如翻页后）— 先渲染收拢态，再触发展开
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (isInViewport(el)) openFan()
    })
  })
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})

function onImageError(e, item) {
  e.target.src = '/media/images/placeholder.svg'
  e.target.alt = item.name
}
</script>

<style scoped lang="scss">
.category-fan {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background:
    radial-gradient(ellipse 75% 55% at 50% 95%, rgba(45, 90, 39, 0.1) 0%, transparent 68%),
    var(--color-bg-warm);

  &__stack {
    position: absolute;
    inset: 0;
    transform: scale(0.93);
    transform-origin: 50% 100%;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &__blade {
    position: absolute;
    left: 50%;
    bottom: 5%;
    height: var(--fan-height, 81%);
    width: auto;
    aspect-ratio: 3 / 4;
    transform: translateX(-50%) rotate(0deg);
    transform-origin: 50% 100%;
    border-radius: 10px;
    overflow: hidden;
    border: 2.5px solid rgba(255, 252, 245, 0.95);
    box-shadow:
      0 6px 16px rgba(26, 61, 22, 0.14),
      0 2px 4px rgba(26, 61, 22, 0.08);
    transition:
      transform 0.72s cubic-bezier(0.22, 1, 0.36, 1) var(--fan-delay, 0ms),
      box-shadow 0.3s ease;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }
  }

  &__badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 4px 10px;
    background: rgba(26, 61, 22, 0.78);
    backdrop-filter: blur(4px);
    color: var(--color-white);
    font-size: 0.75rem;
    border-radius: 999px;
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease 0.35s;
  }

  &--count-1 {
    --fan-height: 88%;
  }

  &--count-2 {
    --fan-height: 84%;
  }

  &--count-3 {
    --fan-height: 82%;
  }

  &--count-4 {
    --fan-height: 80%;
  }

  &--count-5 {
    --fan-height: 78%;
  }

  // 首次进入视口：扇子展开
  &--opened {
    .category-fan__stack {
      transform: scale(1);
    }

    .category-fan__blade {
      transform: translateX(-50%) rotate(var(--fan-angle, 0deg));
    }

    .category-fan__badge {
      opacity: 1;
    }
  }

  // 悬停：整体放大并略向上，扇叶同时展开，铺满容器
  &--opened:hover {
    .category-fan__stack {
      transform: scale(1.14) translateY(-3%);
    }

    .category-fan__blade {
      transform: translateX(-50%) rotate(var(--fan-angle-hover, var(--fan-angle, 0deg)));
      box-shadow:
        0 10px 22px rgba(26, 61, 22, 0.18),
        0 3px 6px rgba(26, 61, 22, 0.1);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .category-fan {
    &__stack,
    &__blade,
    &__badge {
      transition: none !important;
    }

    &:not(.category-fan--opened) .category-fan__stack {
      transform: scale(1);
    }

    &:not(.category-fan--opened) .category-fan__blade {
      transform: translateX(-50%) rotate(var(--fan-angle, 0deg));
    }

    &:not(.category-fan--opened) .category-fan__badge {
      opacity: 1;
    }
  }
}
</style>
