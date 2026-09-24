<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ complete: [] }>()

const HOLD_DURATION = 12000

type Phase = 'idle' | 'holding' | 'completing' | 'success' | 'failed'

const phase = ref<Phase>('idle')
const progress = ref(0)

let rafId: number | null = null
let completingTimeoutId: number | null = null
let startTime = 0

const captionStages = [
  { max: 3000, text: "要繳械了嗎，大寶？" },
  { max: 5000, text: '繼續繼續，不要停嘛 ♡' },
  { max: 8000, text: "喔齁齁~有人開始展現實力了哦" },
  { max: 12000, text: '大寶，你確定整晚都能維持這樣嗎？' },
  // { max: Infinity, text: "Okay, babe. Now you've got my attention. ♡" },
]

const caption = ref(captionStages[0]!.text)

function updateCaption(elapsed: number) {
  const stage = captionStages.find((item) => elapsed < item.max) ?? captionStages[captionStages.length - 1]!
  caption.value = stage.text
}

function stopRaf() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function tick(now: number) {
  const elapsed = now - startTime
  progress.value = Math.min(elapsed / HOLD_DURATION, 1)
  updateCaption(elapsed)

  if (progress.value >= 1) {
    phase.value = 'completing'
    completingTimeoutId = window.setTimeout(() => {
      phase.value = 'success'
    }, 600)
    return
  }

  rafId = requestAnimationFrame(tick)
}

function startHold() {
  if (phase.value !== 'idle' && phase.value !== 'failed') return
  phase.value = 'holding'
  progress.value = 0
  caption.value = captionStages[0]!.text
  startTime = performance.now()
  stopRaf()
  rafId = requestAnimationFrame(tick)
}

function cancelHold() {
  if (phase.value !== 'holding') return
  stopRaf()
  phase.value = 'failed'
}

function retry() {
  progress.value = 0
  phase.value = 'idle'
}

function handleBlur() {
  if (phase.value === 'holding') {
    cancelHold()
  }
}

const displayLine = computed(() => {
  if (phase.value === 'idle') return 'Press & hold to prove it.'
  return caption.value
})


onMounted(() => {
  window.addEventListener('blur', handleBlur)
})

onUnmounted(() => {
  stopRaf()
  if (completingTimeoutId !== null) {
    window.clearTimeout(completingTimeoutId)
  }
  window.removeEventListener('blur', handleBlur)
})
</script>

<template>
  <div class="mission-reveal">
    <template v-if="phase !== 'success'">
      <p class="label mission-reveal__label">Mission 02 · Stamina Test</p>
      <p class="heading-3 mission-reveal__question">Think you can last<br />all night, babe?</p>
      <!-- <p class="body-text mission-reveal__subtitle">讓我看看你的耐力有多好吧</p> -->

      <!-- <span
        class="mission-reveal__heart"
        aria-hidden="true"
        :style="{
          opacity: 0.35 + progress * 0.65,
          transform: `scale(${1 + progress * 0.3})`,
          color: progress > 0 ? 'var(--accent)' : 'var(--secondary)',
        }"
        >♡</span
      > -->

      <button
        class="mission-reveal__button label"
        type="button"
        :class="{ 'is-holding': phase === 'holding' || phase === 'completing' }"
        :disabled="phase === 'completing'"
        :style="{ boxShadow: `0 0 ${8 + progress * 28}px var(--accent-soft)` }"
        @pointerdown.prevent="startHold"
        @pointerup="cancelHold"
        @pointercancel="cancelHold"
        @pointerleave="cancelHold"
        @contextmenu.prevent
      >
        <span
          class="mission-reveal__progress"
          :style="{ transform: `scaleX(${progress})` }"
          aria-hidden="true"
        />
        <span class="mission-reveal__heart" aria-hidden="true"
        :style="{
          opacity: 0.35 + progress * 0.65,
          transform: `scale(${1 + progress * 0.3})`,
          color: progress > 0 ? 'var(--accent)' : 'var(--secondary)',
        }">♡</span>
      </button>

      <Transition name="fade" mode="out-in">
        <p :key="displayLine" class="body-text mission-reveal__caption">{{ displayLine }}</p>
      </Transition>
      <!-- <p v-if="displayLineZh" class="body-text mission-reveal__caption-zh">{{ displayLineZh }}</p> -->

      <AnimatedButton v-if="phase === 'failed'" variant="ghost" @click="retry">
        Try Again
      </AnimatedButton>
    </template>

    <template v-else>
      <p class="label mission-reveal__label">Mission Completed</p>
      <p class="heading-3 mission-reveal__question">Okay, babe. Now you've got my attention. ♡</p>
      <!-- <p class="body-text-lg mission-reveal__easter-egg">
        But I guess we&rsquo;ll have to test that in person.
      </p> -->
      <p class="body-text mission-reveal__caption-zh">
        看來還是得親自驗證一下(⁎⁍̴̛ᴗ⁍̴̛⁎)
      </p>

      <AnimatedButton @click="emit('complete')">Next</AnimatedButton>
    </template>
  </div>
</template>

<style scoped>
.mission-reveal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  text-align: center;
  color: var(--text);
}

.mission-reveal__label {
  color: var(--accent);
}

.mission-reveal__subtitle {
  color: var(--text-muted);
  margin-top: calc(-1 * var(--space-sm));
}

.mission-reveal__heart {
  font-size: 1.4rem;
  line-height: 1;
  transition:
    opacity var(--duration-fast) var(--ease-editorial),
    transform var(--duration-fast) var(--ease-editorial);
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
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--duration-fast) var(--ease-editorial);
}

.mission-reveal__button.is-holding {
  transform: scale(0.97);
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

.mission-reveal__caption {
  color: var(--text-muted);
  min-height: 1.5em;
}

.mission-reveal__caption-zh {
  color: var(--text-muted);
  margin-top: calc(-1 * var(--space-sm));
}

.mission-reveal__easter-egg {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
  max-width: 280px;
}

@media (prefers-reduced-motion: reduce) {
  .mission-reveal__progress {
    transition: none;
  }

  .mission-reveal__button.is-holding {
    transform: none;
  }

  .mission-reveal__heart {
    transition: none;
  }
}
</style>
