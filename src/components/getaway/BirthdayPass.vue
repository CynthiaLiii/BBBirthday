<script setup lang="ts">
import { ref } from 'vue'
import { birthdayConfig } from '@/data/config'
import { formatDateParts } from '@/utils/date'
import { useCalendar } from '@/composables/useCalendar'
import { useInvitationStore } from '@/stores/invitation'
import AnimatedButton from '@/components/common/AnimatedButton.vue'
import InvitationPass from '@/components/common/InvitationPass.vue'

const store = useInvitationStore()
const passRef = ref<HTMLElement | null>(null)
const isSaving = ref(false)

const startParts = formatDateParts(birthdayConfig.getaway.startDate)
const endParts = formatDateParts(birthdayConfig.getaway.endDate)

const { addToCalendar } = useCalendar()

function handleAddToCalendar() {
  const start = new Date(`${birthdayConfig.getaway.startDate}T18:00:00`)
  const end = new Date(`${birthdayConfig.getaway.endDate}T12:00:00`)

  addToCalendar({
    title: 'Birthday Getaway ❤️',
    description: "It's a secret.",
    start,
    end,
    filename: 'birthday-getaway.ics',
  })
}

async function handleSavePass() {
  if (!passRef.value || isSaving.value) return
  isSaving.value = true
  try {
    const { toPng } = await import('html-to-image')
    const dataUrl = await toPng(passRef.value, { pixelRatio: 2 })
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'birthday-pass.png'
    link.click()
  } catch {
    // Save Pass 失敗不影響邀請流程
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <section class="birthday-pass">
    <p class="eyebrow rise-in">Birthday Pass</p>

    <div ref="passRef" class="birthday-pass__card rise-in">
      <InvitationPass
        eyebrow="Birthday Getaway"
        :rows="[
          { label: 'Passenger', value: birthdayConfig.boyfriend.name },
          { label: 'Companion', value: birthdayConfig.girlfriend.name },
          { label: 'Date', value: `${startParts.month.slice(0, 3)} ${startParts.day} — ${endParts.day}` },
          { label: 'Duration', value: 'One Night' },
          { label: 'Destination', value: birthdayConfig.getaway.destination },
        ]"
        foot-note="Admit Two"
      />
    </div>

    <p class="body-text-lg birthday-pass__ending rise-in">See you Friday.</p>

    <div class="birthday-pass__actions rise-in">
      <AnimatedButton variant="ghost" @click="handleAddToCalendar">Add To Calendar</AnimatedButton>
      <AnimatedButton variant="ghost" :loading="isSaving" @click="handleSavePass">
        Save My Pass
      </AnimatedButton>
    </div>

    <button class="birthday-pass__replay label" type="button" @click="store.replayGetaway">
      Replay
    </button>
  </section>
</template>

<style scoped>
.birthday-pass {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  color: var(--text);
}

.birthday-pass__card {
  width: 100%;
  max-width: 320px;
  margin: var(--space-sm) 0;
}

.birthday-pass__ending {
  font-family: var(--font-serif);
  color: var(--accent);
}

.birthday-pass__actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-sm);
}

.birthday-pass__replay {
  margin-top: var(--space-lg);
  color: var(--text-muted);
  opacity: 0.6;
  letter-spacing: 0.2em;
}
</style>
