<script setup lang="ts">
import { ref } from 'vue'
import { birthdayConfig } from '@/data/config'
import { formatDateParts } from '@/utils/date'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ accept: [] }>()

const startParts = formatDateParts(birthdayConfig.getaway.startDate)
const endParts = formatDateParts(birthdayConfig.getaway.endDate)

const noButtonPosition = ref<{ x: number; y: number } | null>(null)
const noButtonMoves = ref(0)
const noButtonGaveUp = ref(false)
const MAX_MOVES = 4

function dodgeNoButton() {
  if (noButtonMoves.value >= MAX_MOVES) {
    noButtonGaveUp.value = true
    return
  }
  noButtonMoves.value += 1
  const rangeX = 80
  const rangeY = 40
  noButtonPosition.value = {
    x: (Math.random() - 0.5) * rangeX * 2,
    y: (Math.random() - 0.5) * rangeY * 2,
  }
}
</script>

<template>
  <section class="getaway-invitation">
    <p class="eyebrow rise-in">An Exclusive Weekend For Two</p>

    <h2 class="heading-2 rise-in">The Birthday<br />Getaway</h2>

    <div class="getaway-invitation__details rise-in">
      <p class="label getaway-invitation__dates">
        {{ startParts.month.slice(0, 3) }} {{ startParts.day }} — {{ endParts.day }}
      </p>
      <p class="body-text getaway-invitation__weekday">{{ startParts.weekday }} — {{ endParts.weekday }}</p>

      <div class="getaway-invitation__row">
        <span class="label">Departure</span>
        <span class="body-text-lg">{{ birthdayConfig.getaway.departureNote }}</span>
      </div>

      <div class="getaway-invitation__row">
        <span class="label">Packing</span>
        <span class="body-text-lg">Overnight Bag Required</span>
      </div>

      <div class="getaway-invitation__row">
        <span class="label">Destination</span>
        <span class="body-text-lg getaway-invitation__classified">{{
          birthdayConfig.getaway.destination
        }}</span>
      </div>
    </div>

    <p class="body-text getaway-invitation__note rise-in">
      一個只屬於我們兩個的生日週末。
    </p>

    <p class="heading-3 getaway-invitation__ask rise-in">Will you come with me?</p>

    <div class="getaway-invitation__actions">
      <AnimatedButton @click="emit('accept')">Yes, I&rsquo;m In</AnimatedButton>

      <button
        v-if="!noButtonGaveUp"
        class="getaway-invitation__no label"
        type="button"
        :style="
          noButtonPosition
            ? { transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` }
            : undefined
        "
        @mouseenter="dodgeNoButton"
        @touchstart.prevent="dodgeNoButton"
        @click="dodgeNoButton"
      >
        No
      </button>
      <p v-else class="body-text getaway-invitation__no-caption">
        This button doesn&rsquo;t work :)
      </p>
    </div>
  </section>
</template>

<style scoped>
.getaway-invitation {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-md);
  text-align: center;
  color: var(--text);
}

.getaway-invitation__details {
  width: 100%;
  max-width: 320px;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.getaway-invitation__dates {
  color: var(--accent);
  letter-spacing: 0.3em;
  text-align: center;
}

.getaway-invitation__weekday {
  color: var(--text-muted);
  text-align: center;
}

.getaway-invitation__row {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-top: var(--space-2xs);
  border-top: 1px solid var(--border);
  text-align: left;
}

.getaway-invitation__classified {
  letter-spacing: 0.1em;
  color: var(--secondary);
}

.getaway-invitation__note {
  color: var(--text-muted);
  max-width: 260px;
}

.getaway-invitation__actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  min-height: 60px;
}

.getaway-invitation__no {
  padding: 0.6rem 1.2rem;
  color: var(--text-muted);
  transition: transform 220ms var(--ease-editorial);
}

.getaway-invitation__no-caption {
  color: var(--text-muted);
  font-style: italic;
}
</style>
