<script setup lang="ts">
import { ref } from 'vue'
import type { Memory } from '@/data/memories'

const props = defineProps<{ memory: Memory }>()

const flipped = ref(false)

function toggleFlip() {
  flipped.value = !flipped.value
}
</script>

<template>
  <button
    class="memory-card"
    type="button"
    :style="{ '--rotate': `${props.memory.rotate}deg` }"
    :class="{ 'is-flipped': flipped }"
    :aria-pressed="flipped"
    :aria-label="`${props.memory.date ?? '回憶照片'}，點擊翻面查看文字`"
    @click="toggleFlip"
  >
    <span class="memory-card__inner">
      <span class="memory-card__face memory-card__face--front">
        <img :src="props.memory.image" :alt="props.memory.date ?? '回憶照片'" loading="lazy" />
        <span v-if="props.memory.date" class="memory-card__date label">{{ props.memory.date }}</span>
      </span>

      <span class="memory-card__face memory-card__face--back">
        <!-- <span v-if="props.memory.date" class="heading-3 memory-card__title">{{
          props.memory.date
        }}</span> -->
        <span class="body-text memory-card__message">{{ props.memory.message }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.memory-card {
  perspective: 1000px;
  width: 100%;
  aspect-ratio: 4 / 5;
  transform: rotate(var(--rotate));
}

.memory-card__inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform var(--duration-slow) var(--ease-editorial);
  transform-style: preserve-3d;
}

.memory-card.is-flipped .memory-card__inner {
  transform: rotateY(180deg);
}

.memory-card__face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
  background: var(--surface);
  border: 6px solid var(--surface);
  box-shadow: var(--shadow-paper);
  border-radius: 2px;
  overflow: hidden;
}

.memory-card__face--front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--bg-alt);
}

.memory-card__date {
  position: absolute;
  bottom: var(--space-xs);
  left: var(--space-xs);
  color: var(--white);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.memory-card__face--back {
  transform: rotateY(180deg);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-md);
  gap: var(--space-xs);
  color: var(--text);
}

.memory-card__message {
  color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .memory-card__inner {
    transition-duration: 1ms;
  }
}
</style>
