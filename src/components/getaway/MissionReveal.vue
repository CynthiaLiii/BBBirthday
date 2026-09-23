<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ complete: [] }>()

const HOLD_DURATION = 1500
const progress = ref(0)
const isHolding = ref(false)
const isComplete = ref(false)

let rafId: number | null = null
let startTime = 0

function tick(timestamp: number) {
  if (!startTime) startTime = timestamp
  const elapsed = timestamp - startTime
  progress.value = Math.min(elapsed / HOLD_DURATION, 1)

  if (progress.value >= 1) {
    isComplete.value = true
    isHolding.value = false
    window.setTimeout(() => emit('complete'), 300)
    return
  }

  rafId = requestAnimationFrame(tick)
}

function startHold() {
  if (isComplete.value) return
  isHolding.value = true
  startTime = 0
  rafId = requestAnimationFrame(tick)
}

function cancelHold() {
  if (isComplete.value) return
  isHolding.value = false
  if (rafId) cancelAnimationFrame(rafId)
  progress.value = 0
}
</script>

<template>
  <div class="mission-reveal">
    <p class="label mission-reveal__label">Mission 03</p>
    <p class="heading-3 mission-reveal__question">Ready for<br />one more adventure?</p>

    <button
      class="mission-reveal__button label"
      type="button"
      :disabled="isComplete"
      @pointerdown="startHold"
      @pointerup="cancelHold"
      @pointerleave="cancelHold"
    >
      <span
        class="mission-reveal__progress"
        :style="{ transform: `scaleX(${progress})` }"
        aria-hidden="true"
      />
      <span class="mission-reveal__text">{{ isComplete ? 'Unlocked' : 'Hold To Reveal' }}</span>
    </button>

    <p class="body-text mission-reveal__hint">按住按鈕約 1.5 秒</p>
  </div>
</template>

<style scoped>
.mission-reveal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  text-align: center;
  color: var(--text);
}

.mission-reveal__label {
  color: var(--accent);
}

.mission-reveal__button {
  position: relative;
  width: 240px;
  min-height: 52px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--accent);
  overflow: hidden;
  color: var(--text);
  background: var(--surface);
  touch-action: none;
  user-select: none;
}

.mission-reveal__progress {
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform-origin: left center;
  transform: scaleX(0);
}

.mission-reveal__text {
  position: relative;
  z-index: 1;
}

.mission-reveal__hint {
  color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .mission-reveal__progress {
    transition: none;
  }
}
</style>
