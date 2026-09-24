<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ complete: [] }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isRevealed = ref(false)
const isScratching = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let scratchedPixels = 0
let totalPixels = 0
const REVEAL_THRESHOLD = 0.45

function setupCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(dpr, dpr)
  ctx.fillStyle = '#a79c8c'
  ctx.fillRect(0, 0, rect.width, rect.height)
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.font = '600 0.7rem Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('刮開查看日期', rect.width / 2, rect.height / 2)

  totalPixels = rect.width * rect.height
  scratchedPixels = 0
}

function getPoint(event: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas) return { x: 0, y: 0 }
  const rect = canvas.getBoundingClientRect()
  return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

function scratchAt(x: number, y: number) {
  if (!ctx) return
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, 22, 0, Math.PI * 2)
  ctx.fill()
}

function checkProgress() {
  const canvas = canvasRef.value
  if (!canvas || !ctx || isRevealed.value) return

  const rect = canvas.getBoundingClientRect()
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let transparent = 0
  for (let i = 3; i < imageData.data.length; i += 4 * 8) {
    if ((imageData.data[i] ?? 0) === 0) transparent += 8
  }
  scratchedPixels = transparent
  totalPixels = rect.width * rect.height

  if (scratchedPixels / totalPixels > REVEAL_THRESHOLD) {
    isRevealed.value = true
  }
}

function handlePointerDown(event: PointerEvent) {
  if (isRevealed.value) return
  isScratching.value = true
  const { x, y } = getPoint(event)
  scratchAt(x, y)
}

function handlePointerMove(event: PointerEvent) {
  if (!isScratching.value || isRevealed.value) return
  const { x, y } = getPoint(event)
  scratchAt(x, y)
}

function handlePointerUp() {
  if (!isScratching.value) return
  isScratching.value = false
  checkProgress()
}

onMounted(setupCanvas)
</script>

<template>
  <div class="mission-date">
    <p class="label mission-date__label">Mission 01</p>
    <p class="heading-3 mission-date__question">One date isn't<br />enough, right?</p>

    <div class="mission-date__scratch-area">
      <p class="heading-2 mission-date__answer" aria-hidden="true">NOV 06 — 07</p>
      <canvas
        v-show="!isRevealed"
        ref="canvasRef"
        class="mission-date__canvas"
        aria-label="刮刮卡，刮開以查看日期"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerleave="handlePointerUp"
      />
    </div>

    <Transition name="fade">
      <p v-if="isRevealed" class="body-text-lg mission-date__message">
        But I'm actually planning to steal you for a lifetime
      </p>
    </Transition>

    <Transition name="fade">
      <AnimatedButton v-if="isRevealed" class="mission-date__next" @click="emit('complete')">
        Next
      </AnimatedButton>
    </Transition>
  </div>
</template>

<style scoped>
.mission-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  text-align: center;
  color: var(--text);
}

.mission-date__label {
  color: var(--accent);
}

.mission-date__scratch-area {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 120px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-paper);
  background: var(--surface);
}

.mission-date__answer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mission-date__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: pointer;
}

.mission-date__message {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
  max-width: 280px;
}
</style>
