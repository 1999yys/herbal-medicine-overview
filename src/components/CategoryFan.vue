<template>
  <div
    class="category-fan"
    :class="`category-fan--count-${bladeCount}`"
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
import { computed } from 'vue'

const HOVER_SPREAD_DEG = 59.2 // 32 × 1.85，保持悬停展开幅度不变

const props = defineProps({
  images: { type: Array, required: true },
  maxBlades: { type: Number, default: 5 },
  spreadDeg: { type: Number, default: 40 },
})

const emit = defineEmits(['select'])

const totalCount = computed(() => props.images.length)

const blades = computed(() => props.images.slice(0, props.maxBlades))

const bladeCount = computed(() => blades.value.length)

function bladeStyle(index, count) {
  const spread = props.spreadDeg

  if (count <= 1) {
    return { '--fan-angle': '0deg', '--fan-angle-hover': '0deg', zIndex: 2 }
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
    zIndex: Math.round(zIndex) + 1,
  }
}

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
    transform-origin: 50% 100%;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &__blade {
    position: absolute;
    left: 50%;
    bottom: 5%;
    height: var(--fan-height, 81%);
    width: auto;
    aspect-ratio: 3 / 4;
    transform: translateX(-50%) rotate(var(--fan-angle, 0deg));
    transform-origin: 50% 100%;
    border-radius: 10px;
    overflow: hidden;
    border: 2.5px solid rgba(255, 252, 245, 0.95);
    box-shadow:
      0 6px 16px rgba(26, 61, 22, 0.14),
      0 2px 4px rgba(26, 61, 22, 0.08);
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
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
    transition: opacity 0.3s;
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

  // 悬停：整体放大并略向上，扇叶同时展开，铺满容器
  &:hover {
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
</style>
