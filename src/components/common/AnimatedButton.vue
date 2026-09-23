<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'ghost'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  type: 'button',
})

const emit = defineEmits<{ click: [MouseEvent] }>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    class="animated-button"
    :class="[`animated-button--${variant}`, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span class="animated-button__label" :class="{ 'is-hidden': loading }">
      <slot />
    </span>
    <span v-if="loading" class="animated-button__spinner" aria-hidden="true" />
  </button>
</template>

<style scoped>
.animated-button {
  position: relative;
  min-height: 48px;
  padding: 0.9rem 2rem;
  font-family: var(--font-sans);
  font-size: var(--fs-label);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: var(--radius-sm);
  transition:
    transform var(--duration-fast) var(--ease-editorial),
    opacity var(--duration-fast) var(--ease-editorial),
    background-color var(--duration-fast) var(--ease-editorial);
}

.animated-button:active:not(:disabled) {
  transform: scale(0.98);
}

.animated-button:disabled {
  opacity: 0.55;
  cursor: default;
}

.animated-button--primary {
  background: var(--accent);
  color: var(--bg);
}

.animated-button--ghost {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.animated-button__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--duration-fast) var(--ease-editorial);
}

.animated-button__label.is-hidden {
  opacity: 0;
}

.animated-button__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated-button__spinner {
    animation-duration: 1200ms;
  }
}
</style>
