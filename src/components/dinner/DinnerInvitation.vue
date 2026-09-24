<script setup lang="ts">
import { computed } from 'vue'
import { birthdayConfig } from '@/data/config'
import { formatDateParts } from '@/utils/date'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ accept: [] }>()

const dateParts = computed(() => formatDateParts(birthdayConfig.dinner.date))
</script>

<template>
  <section class="dinner-invitation">
    <p class="eyebrow rise-in">You Are Cordially Invited</p>

    <h2 class="heading-2 dinner-invitation__title rise-in">A Birthday<br />Dinner For Two</h2>

    <div class="dinner-invitation__details rise-in">
      <p class="label dinner-invitation__date">
        {{ dateParts.month }} {{ dateParts.day }}
      </p>
      <p class="body-text dinner-invitation__weekday">
        {{ dateParts.weekday }} &middot; {{ dateParts.year }}
      </p>
      <p class="heading-3 dinner-invitation__time">{{ birthdayConfig.dinner.time }}</p>

      <div class="dinner-invitation__venue">
        <p class="body-text-lg">{{ birthdayConfig.dinner.restaurant }}</p>
        <p class="body-text dinner-invitation__address">{{ birthdayConfig.dinner.address }}</p>
      </div>

      <p class="label dinner-invitation__dresscode">{{ birthdayConfig.dinner.dressCode }}</p>
    </div>

    <p class="body-text dinner-invitation__note rise-in">
      在這個特別的日子，<br />想邀請你和我一起度過美好夜晚
    </p>

    <AnimatedButton class="dinner-invitation__cta" @click="emit('accept')">
      Accept Invitation
    </AnimatedButton>
  </section>
</template>

<style scoped>
.dinner-invitation {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-lg);
  text-align: center;
  color: var(--text);
}

.dinner-invitation__details {
  width: 100%;
  max-width: 320px;
  padding: var(--space-lg) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.dinner-invitation__date {
  color: var(--accent);
  letter-spacing: 0.3em;
}

.dinner-invitation__weekday {
  color: var(--text-muted);
}

.dinner-invitation__time {
  margin-top: var(--space-sm);
}

.dinner-invitation__venue {
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--border);
  width: 100%;
}

.dinner-invitation__address {
  color: var(--text-muted);
  margin-top: var(--space-2xs);
}

.dinner-invitation__dresscode {
  margin-top: var(--space-md);
  color: var(--secondary);
}

.dinner-invitation__note {
  color: var(--text-muted);
  max-width: 280px;
}

.dinner-invitation__cta {
  min-width: 240px;
}
</style>
