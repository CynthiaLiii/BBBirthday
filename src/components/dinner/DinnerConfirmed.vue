<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { birthdayConfig } from '@/data/config'
import { formatDateParts } from '@/utils/date'
import { useCalendar } from '@/composables/useCalendar'
import AnimatedButton from '@/components/common/AnimatedButton.vue'
import ConfettiEffect from '@/components/common/ConfettiEffect.vue'
import InvitationPass from '@/components/common/InvitationPass.vue'

const emit = defineEmits<{ continue: [] }>()

const phase = ref<'loading' | 'confirmed'>('loading')
const showConfetti = ref(false)

const dateParts = formatDateParts(birthdayConfig.dinner.date)
const { addToCalendar } = useCalendar()

onMounted(() => {
  window.setTimeout(() => {
    phase.value = 'confirmed'
    showConfetti.value = true
  }, 500)
})

function handleAddToCalendar() {
  const start = new Date(`${birthdayConfig.dinner.date}T${birthdayConfig.dinner.time}:00`)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

  addToCalendar({
    title: 'Birthday Dinner ❤️',
    description: `與 ${birthdayConfig.girlfriend.name} 的生日晚餐`,
    location: birthdayConfig.dinner.restaurant,
    start,
    end,
    filename: 'birthday-dinner.ics',
  })
}
</script>

<template>
  <section class="dinner-confirmed">
    <ConfettiEffect :active="showConfetti" />

    <Transition name="fade" mode="out-in">
      <div v-if="phase === 'loading'" key="loading" class="dinner-confirmed__loading">
        <span class="dinner-confirmed__spinner" aria-hidden="true" />
      </div>

      <div v-else key="confirmed" class="dinner-confirmed__content">
        <p class="label dinner-confirmed__status rise-in">Dinner Reservation</p>
        <h2 class="heading-2 rise-in">Confirmed</h2>

        <div class="dinner-confirmed__pass rise-in">
          <InvitationPass
            eyebrow="Birthday Dinner"
            :rows="[
              { label: 'Guest', value: birthdayConfig.boyfriend.name },
              { label: 'Date', value: `${dateParts.month.slice(0, 3)} ${dateParts.day} ${dateParts.year}` },
              { label: 'Time', value: birthdayConfig.dinner.time },
              { label: 'Host', value: birthdayConfig.girlfriend.name },
            ]"
            foot-note="Admit Two"
          />
        </div>

        <div class="dinner-confirmed__actions rise-in">
          <AnimatedButton variant="ghost" @click="handleAddToCalendar">
            Add To Calendar
          </AnimatedButton>
        </div>

        <button class="dinner-confirmed__continue label" type="button" @click="emit('continue')">
          Continue ↓
        </button>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.dinner-confirmed {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  color: var(--text);
}

.dinner-confirmed__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dinner-confirmed__spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.dinner-confirmed__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-align: center;
  width: 100%;
}

.dinner-confirmed__status {
  color: var(--accent);
}

.dinner-confirmed__pass {
  width: 100%;
  max-width: 300px;
  margin-top: var(--space-2xs);
}

.dinner-confirmed__actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
}

.dinner-confirmed__continue {
  margin-top: var(--space-2xs);
  color: var(--text-muted);
  letter-spacing: 0.2em;
}

@media (prefers-reduced-motion: reduce) {
  .dinner-confirmed__spinner {
    animation-duration: 1200ms;
  }
}
</style>
