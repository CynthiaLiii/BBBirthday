<script setup lang="ts">
import { ref } from 'vue'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ complete: [] }>()

const isOpen = ref(false)

const packingItems = ['換洗衣物', '個人用品', '充電器', '還有你本人']

function openBox() {
  if (isOpen.value) return
  isOpen.value = true
}
</script>

<template>
  <div class="mission-packing">
    <p class="label mission-packing__label">Mission 02</p>
    <p class="heading-3 mission-packing__question">What should<br />you bring?</p>

    <button
      class="mission-packing__box"
      type="button"
      :class="{ 'is-open': isOpen }"
      :disabled="isOpen"
      aria-label="點擊打開禮物盒"
      @click="openBox"
    >
      <span class="mission-packing__lid" />
      <span class="mission-packing__base" />
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="mission-packing__reveal">
        <p class="label mission-packing__tag">Overnight Bag Required</p>
        <ul class="mission-packing__list body-text">
          <li v-for="item in packingItems" :key="item">{{ item }}</li>
        </ul>
        <AnimatedButton @click="emit('complete')">Next</AnimatedButton>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mission-packing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  text-align: center;
  color: var(--text);
}

.mission-packing__label {
  color: var(--accent);
}

.mission-packing__box {
  position: relative;
  width: 120px;
  height: 100px;
}

.mission-packing__base {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
}

.mission-packing__lid {
  position: absolute;
  top: 0;
  left: -6%;
  width: 112%;
  height: 34px;
  background: var(--accent);
  border-radius: var(--radius-sm);
  transform-origin: top left;
  transition:
    transform var(--duration-slow) var(--ease-editorial),
    opacity var(--duration-slow) var(--ease-editorial);
}

.mission-packing__box.is-open .mission-packing__lid {
  transform: translateY(-30px) rotate(-18deg);
  opacity: 0.7;
}

.mission-packing__reveal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.mission-packing__tag {
  color: var(--accent);
}

.mission-packing__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  color: var(--text-muted);
}
</style>
