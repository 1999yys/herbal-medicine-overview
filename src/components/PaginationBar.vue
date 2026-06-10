<template>
  <nav class="pagination" aria-label="分页导航">
    <button
      type="button"
      class="pagination__btn"
      :disabled="current <= 1"
      aria-label="上一页"
      @click="go(current - 1)"
    >
      ‹
    </button>

    <button
      v-for="page in total"
      :key="page"
      type="button"
      class="pagination__page"
      :class="{ 'pagination__page--active': page === current }"
      :aria-label="`第 ${page} 页`"
      :aria-current="page === current ? 'page' : undefined"
      @click="go(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="pagination__btn"
      :disabled="current >= total"
      aria-label="下一页"
      @click="go(current + 1)"
    >
      ›
    </button>
  </nav>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})

const emit = defineEmits(['change'])

function go(page) {
  emit('change', page)
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &__btn,
  &__page {
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: var(--color-bg-card);
    color: var(--color-text);
    font-size: 0.9375rem;
    transition:
      background 0.2s,
      border-color 0.2s,
      color 0.2s;

    &:hover:not(:disabled) {
      border-color: var(--color-primary-light);
      color: var(--color-primary-dark);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__page--active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
    font-weight: 600;

    &:hover {
      color: var(--color-white);
    }
  }
}
</style>
