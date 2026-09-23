<script setup lang="ts">
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
</script>

<template>
  <section class="dinner-teaser">
    <p class="eyebrow rise-in">One More Thing&hellip;</p>

    <h2 class="heading-2 rise-in">Your Birthday<br />Isn&rsquo;t Over Yet.</h2>

    <p class="dinner-teaser__dates label rise-in">Nov 06 — Nov 07</p>

    <p class="body-text dinner-teaser__note rise-in">
      這兩天也要留給我。<br />不可以偷偷安排其他行程。
    </p>

    <div class="dinner-teaser__lock rise-in">
      <p class="label dinner-teaser__lock-title">Chapter 02</p>
      <p class="heading-3 dinner-teaser__lock-status">Locked</p>
      <p class="body-text dinner-teaser__lock-note">
        Your next invitation<br />will arrive on your birthday.
      </p>
    </div>

    <button class="dinner-teaser__replay label" type="button" @click="store.replayDinner">
      Replay
    </button>
  </section>
</template>

<style scoped>
.dinner-teaser {
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

.dinner-teaser__dates {
  color: var(--accent);
  letter-spacing: 0.35em;
}

.dinner-teaser__note {
  color: var(--text-muted);
  max-width: 280px;
}

.dinner-teaser__lock {
  margin-top: var(--space-lg);
  padding: var(--space-lg) var(--space-md);
  width: 100%;
  max-width: 300px;
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.dinner-teaser__lock-title {
  color: var(--secondary);
}

.dinner-teaser__lock-note {
  margin-top: var(--space-sm);
  color: var(--text-muted);
}

.dinner-teaser__replay {
  margin-top: var(--space-xl);
  color: var(--text-muted);
  opacity: 0.5;
  letter-spacing: 0.2em;
}
</style>
