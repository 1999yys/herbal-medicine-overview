const DEFAULT_OPTIONS = {
  threshold: 0.12,
  rootMargin: '0px 0px -6% 0px',
}

function parseBinding(binding) {
  const { value, arg } = binding

  if (typeof value === 'string') {
    return { direction: value }
  }

  if (typeof value === 'number') {
    return { direction: arg || 'up', delay: value }
  }

  return {
    direction: value?.direction ?? arg ?? 'up',
    delay: value?.delay ?? 0,
    threshold: value?.threshold,
    rootMargin: value?.rootMargin,
    once: value?.once ?? true,
  }
}

function applyReveal(el, options) {
  const { direction, delay } = options

  el.classList.add('reveal', `reveal--${direction}`)

  if (delay) {
    el.style.setProperty('--reveal-delay', `${delay}ms`)
  }
}

function showImmediately(el) {
  el.classList.add('reveal', 'is-visible')
}

export const scrollReveal = {
  beforeMount(el, binding) {
    applyReveal(el, parseBinding(binding))
  },

  mounted(el, binding) {
    const options = parseBinding(binding)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showImmediately(el)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          el.classList.add('is-visible')

          if (options.once) {
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: options.threshold ?? DEFAULT_OPTIONS.threshold,
        rootMargin: options.rootMargin ?? DEFAULT_OPTIONS.rootMargin,
      },
    )

    observer.observe(el)
    el._scrollRevealObserver = observer
  },

  unmounted(el) {
    el._scrollRevealObserver?.disconnect()
    delete el._scrollRevealObserver
  },
}
