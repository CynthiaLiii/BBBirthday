<script setup lang="ts">
import { birthdayConfig } from '@/data/config'
import { formatDateParts } from '@/utils/date'
import { useCalendar } from '@/composables/useCalendar'
import { useInvitationStore } from '@/stores/invitation'
import AnimatedButton from '@/components/common/AnimatedButton.vue'
import InvitationPass from '@/components/common/InvitationPass.vue'

const store = useInvitationStore()

const startParts = formatDateParts(birthdayConfig.getaway.startDate)
const endParts = formatDateParts(birthdayConfig.getaway.endDate)

const { addToCalendar } = useCalendar()

function handleAddToCalendar() {
  const start = new Date(`${birthdayConfig.getaway.startDate}T18:00:00`)
  const end = new Date(`${birthdayConfig.getaway.endDate}T12:00:00`)

  addToCalendar({
    title: 'Birthday Getaway ❤️',
    description: '這是個秘密 ♡',
    start,
    end,
    filename: 'birthday-getaway.ics',
  })
}
</script>

<template>
  <section class="birthday-pass">
    <p class="eyebrow-zh rise-in">生日旅行通行證</p>

    <div class="birthday-pass__card rise-in">
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
      <AnimatedButton variant="ghost" @click="handleAddToCalendar">加入行事曆</AnimatedButton>
    </div>

    <button class="birthday-pass__replay label-zh" type="button" @click="store.replayGetaway">
      重新播放
    </button>
  </section>
</template>

<style scoped>
.birthday-pass {
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

.birthday-pass__card {
  width: 100%;
  max-width: 300px;
  margin: 0;
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
  margin-top: 0;
}

.birthday-pass__replay {
  margin-top: var(--space-2xs);
  color: var(--text-muted);
  opacity: 0.6;
}
</style>
