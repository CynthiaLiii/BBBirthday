<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ opened: [] }>()

const isOpening = ref(false)

function handleOpen() {
  if (isOpening.value) return
  isOpening.value = true
  // 開啟動畫約 800ms，不可略過但時長受控
  window.setTimeout(() => {
    emit('opened')
  }, 800)
}
</script>

<template>
  <section class="dinner-opening">
    <p class="eyebrow rise-in">A Private Message For You</p>

    <div class="dinner-opening__envelope" :class="{ 'is-opening': isOpening }">
      <div class="dinner-opening__flap" />
      <div class="dinner-opening__seal" aria-hidden="true" />
      <div class="dinner-opening__card" />
    </div>

    <h1 class="heading-1 dinner-opening__title rise-in">You&rsquo;ve Got<br />Something Special.</h1>
    <p class="body-text dinner-opening__subtitle rise-in">
      A private invitation is waiting for you.
    </p>

    <button
      class="dinner-opening__cta label"
      type="button"
      :disabled="isOpening"
      @click="handleOpen"
    >
      Open Invitation
    </button>
  </section>
</template>

<style scoped>
.dinner-opening {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-lg);
  padding: var(--space-2xl) var(--space-lg);
  color: var(--text);
}

.dinner-opening__envelope {
  position: relative;
  width: 180px;
  height: 120px;
  margin: var(--space-md) 0;
}

.dinner-opening__envelope::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.dinner-opening__flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transition: transform var(--duration-slow) var(--ease-editorial);
}

.dinner-opening__seal {
  position: absolute;
  top: 42px;
  left: 50%;
  width: 28px;
  height: 28px;
  transform: translateX(-50%);
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  transition:
    opacity var(--duration-fast) var(--ease-editorial),
    transform var(--duration-fast) var(--ease-editorial);
  z-index: 2;
}

.dinner-opening__card {
  position: absolute;
  bottom: 0;
  left: 8%;
  width: 84%;
  height: 90%;
  background: var(--text);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  transform: translateY(6%);
  opacity: 0.94;
  transition: transform var(--duration-slow) var(--ease-editorial);
  z-index: 1;
}

.dinner-opening__envelope.is-opening .dinner-opening__flap {
  transform: rotateX(160deg);
}

.dinner-opening__envelope.is-opening .dinner-opening__seal {
  opacity: 0;
  transform: translateX(-50%) scale(0.6);
}

.dinner-opening__envelope.is-opening .dinner-opening__card {
  transform: translateY(-38%);
}

.dinner-opening__title {
  animation-delay: 80ms;
}

.dinner-opening__subtitle {
  color: var(--text-muted);
  animation-delay: 160ms;
  max-width: 280px;
}

.dinner-opening__cta {
  margin-top: var(--space-md);
  padding: 1rem 2.4rem;
  min-height: 48px;
  color: var(--bg);
  background: var(--accent);
  border-radius: var(--radius-sm);
  letter-spacing: 0.2em;
  transition: opacity var(--duration-fast) var(--ease-editorial);
}

.dinner-opening__cta:disabled {
  opacity: 0.6;
}
</style>
