<script setup lang="ts">
import { useAudio } from '@/composables/useAudio'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const { toggle } = useAudio()
</script>

<template>
  <button
    class="music-toggle"
    type="button"
    :aria-pressed="store.musicEnabled"
    :aria-label="store.musicEnabled ? '關閉背景音樂' : '播放背景音樂'"
    @click="toggle"
  >
    <span class="music-toggle__bars" :class="{ 'is-playing': store.musicEnabled }">
      <span />
      <span />
      <span />
    </span>
  </button>
</template>

<style scoped>
.music-toggle {
  position: fixed;
  top: max(env(safe-area-inset-top), 16px);
  right: 16px;
  z-index: 40;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(6px);
}

.music-toggle__bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 14px;
}

.music-toggle__bars span {
  width: 3px;
  height: 40%;
  background: var(--dinner-text, #f4efe7);
  border-radius: 2px;
  transition: height 200ms ease;
}

.music-toggle__bars.is-playing span {
  animation: musicBar 900ms ease-in-out infinite;
}

.music-toggle__bars.is-playing span:nth-child(2) {
  animation-delay: 150ms;
}

.music-toggle__bars.is-playing span:nth-child(3) {
  animation-delay: 300ms;
}

@keyframes musicBar {
  0%,
  100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .music-toggle__bars.is-playing span {
    animation: none;
    height: 70%;
  }
}
</style>
