<script setup lang="ts">
import { memories } from '@/data/memories'
import AnimatedButton from '@/components/common/AnimatedButton.vue'
import MemoryCard from './MemoryCard.vue'

defineEmits<{ continue: [] }>()
</script>

<template>
  <section class="memory-archive">
    <p class="eyebrow rise-in">Our Little Archive</p>
    <h2 class="heading-2 rise-in memory-archive__title">A Few Small<br />Moments.</h2>

    <div class="memory-archive__grid rise-in">
      <MemoryCard v-for="memory in memories" :key="memory.id" :memory="memory" />
    </div>

    <p class="body-text memory-archive__hint">點一下照片，翻到背面看看。</p>

    <AnimatedButton @click="$emit('continue')">Continue</AnimatedButton>
  </section>
</template>

<style scoped>
.memory-archive {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  color: var(--text);
}

.memory-archive__title {
  margin-bottom: var(--space-sm);
}

.memory-archive__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg) var(--space-md);
  width: 100%;
  max-width: 340px;
  padding: var(--space-md) 0;
}

.memory-archive__hint {
  color: var(--text-muted);
  margin-top: var(--space-xs);
}
</style>
