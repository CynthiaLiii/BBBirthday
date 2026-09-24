<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineEmits<{ continue: [] }>()

const isTransitioned = ref(false)

onMounted(() => {
  window.setTimeout(() => {
    isTransitioned.value = true
  }, 300)
})
</script>

<template>
  <section class="getaway-unlock" :class="{ 'is-transitioned': isTransitioned }">
    <p class="eyebrow rise-in">Chapter 02</p>
    <h1 class="heading-1 rise-in">Unlocked</h1>

    <p class="heading-3 getaway-unlock__question rise-in">You Thought<br />That Was All?</p>

    <p class="body-text getaway-unlock__note rise-in">
      其實，我還偷偷準備了一些東西 ~
    </p>

    <button class="getaway-unlock__cta label" type="button" @click="$emit('continue')">
      Continue
    </button>
  </section>
</template>

<style scoped>
.getaway-unlock {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-lg);
  text-align: center;
  background: var(--dinner-bg);
  color: var(--dinner-text);
  transition:
    background-color 1400ms var(--ease-editorial),
    color 1400ms var(--ease-editorial);
}

.getaway-unlock.is-transitioned {
  background: var(--getaway-bg);
  color: var(--getaway-text);
}

.getaway-unlock__note {
  color: var(--dinner-text-muted);
  max-width: 260px;
  transition: color 1400ms var(--ease-editorial);
}

.getaway-unlock.is-transitioned .getaway-unlock__note {
  color: var(--getaway-text-muted);
}

.getaway-unlock__cta {
  margin-top: var(--space-2xs);
  padding: 1rem 2.4rem;
  min-height: 48px;
  color: var(--getaway-bg);
  background: var(--getaway-accent);
  border-radius: var(--radius-sm);
  letter-spacing: 0.2em;
  opacity: 0;
  animation: riseIn var(--duration-base) var(--ease-editorial) 500ms forwards;
}

@media (prefers-reduced-motion: reduce) {
  .getaway-unlock {
    transition-duration: 1ms;
  }

  .getaway-unlock__cta {
    animation: none;
    opacity: 1;
  }
}
</style>
