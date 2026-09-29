<script setup lang="ts">
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
</script>

<template>
  <section class="dinner-teaser">
    <p class="eyebrow-zh rise-in">還有一件事……</p>

    <h2 class="heading-2 rise-in">你的生日<br />還沒有結束</h2>

    <p class="dinner-teaser__dates label rise-in">Nov 06 — Nov 07</p>

    <p class="body-text dinner-teaser__note rise-in">
      這兩天也要留給你的小寶<br />不可以偷偷安排其他行程哦
    </p>

    <div class="dinner-teaser__lock rise-in">
      <p class="label dinner-teaser__lock-title">Chapter 02</p>
      <p class="heading-3 dinner-teaser__lock-status">尚未解鎖</p>
      <p class="body-text dinner-teaser__lock-note">
        下一份邀請，<br />會在你生日當天送達
      </p>
    </div>

    <button class="dinner-teaser__replay label-zh" type="button" @click="store.replayDinner">
      重新播放
    </button>
  </section>
</template>

<style scoped>
.dinner-teaser {
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

.dinner-teaser__dates {
  color: var(--accent);
  letter-spacing: 0.35em;
}

.dinner-teaser__note {
  color: var(--text-muted);
  max-width: 280px;
}

.dinner-teaser__lock {
  margin-top: var(--space-2xs);
  padding: var(--space-md);
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
  margin-top: var(--space-2xs);
  color: var(--text-muted);
  opacity: 0.5;
}
</style>
