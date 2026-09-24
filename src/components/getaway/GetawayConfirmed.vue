<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AnimatedButton from '@/components/common/AnimatedButton.vue'
import ConfettiEffect from '@/components/common/ConfettiEffect.vue'

const emit = defineEmits<{ continue: [] }>()

const phase = ref<'fading' | 'confirmed' | 'tagline'>('fading')
const showConfetti = ref(false)

onMounted(() => {
  window.setTimeout(() => {
    phase.value = 'confirmed'
    showConfetti.value = true
  }, 400)

  window.setTimeout(() => {
    phase.value = 'tagline'
  }, 1600)
})
</script>

<template>
  <section class="getaway-confirmed">
    <ConfettiEffect :active="showConfetti" />

    <Transition name="fade" mode="out-in">
      <div v-if="phase === 'fading'" key="fading" class="getaway-confirmed__blank" />

      <div v-else key="content" class="getaway-confirmed__content">
        <p class="label getaway-confirmed__status rise-in">Reservation</p>
        <h2 class="heading-2 rise-in">Confirmed</h2>

        <Transition name="fade">
          <p v-if="phase === 'tagline'" class="body-text-lg getaway-confirmed__tagline">
            One birthday.<br />One little getaway.<br />Just us.
          </p>
        </Transition>

        <AnimatedButton v-if="phase === 'tagline'" class="getaway-confirmed__cta" @click="emit('continue')">
          Continue
        </AnimatedButton>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.getaway-confirmed {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  color: var(--text);
  text-align: center;
}

.getaway-confirmed__blank {
  width: 100%;
  height: 40vh;
}

.getaway-confirmed__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.getaway-confirmed__status {
  color: var(--accent);
}

.getaway-confirmed__tagline {
  color: var(--text-muted);
  margin-top: var(--space-sm);
}

.getaway-confirmed__cta {
  margin-top: var(--space-lg);
}
</style>
