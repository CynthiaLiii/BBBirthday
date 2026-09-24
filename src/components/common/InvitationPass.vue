<script setup lang="ts">
export interface PassRow {
  label: string
  value: string
}

defineProps<{
  eyebrow: string
  rows: PassRow[]
  footNote?: string
}>()
</script>

<template>
  <div class="invitation-pass" data-pass-capture>
    <div class="invitation-pass__notch invitation-pass__notch--left" aria-hidden="true" />
    <div class="invitation-pass__notch invitation-pass__notch--right" aria-hidden="true" />

    <p class="eyebrow invitation-pass__eyebrow">{{ eyebrow }}</p>

    <div class="invitation-pass__rows">
      <div v-for="row in rows" :key="row.label" class="invitation-pass__row">
        <span class="label invitation-pass__row-label">{{ row.label }}</span>
        <span class="invitation-pass__row-value">{{ row.value }}</span>
      </div>
    </div>

    <div class="invitation-pass__divider" aria-hidden="true" />

    <p v-if="footNote" class="label invitation-pass__foot">{{ footNote }}</p>
  </div>
</template>

<style scoped>
.invitation-pass {
  position: relative;
  width: 100%;
  padding: var(--space-md);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  color: var(--text);
  overflow: hidden;
}

.invitation-pass__notch {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: var(--bg);
  border-radius: 50%;
  transform: translateY(-50%);
}

.invitation-pass__notch--left {
  left: -10px;
}

.invitation-pass__notch--right {
  right: -10px;
}

.invitation-pass__eyebrow {
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.invitation-pass__rows {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.invitation-pass__row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.invitation-pass__row-label {
  color: var(--text-muted);
}

.invitation-pass__row-value {
  font-family: var(--font-serif);
  font-size: var(--fs-h3);
}

.invitation-pass__divider {
  height: 1px;
  margin: var(--space-sm) 0;
  background: repeating-linear-gradient(
    to right,
    var(--border) 0,
    var(--border) 6px,
    transparent 6px,
    transparent 12px
  );
}

.invitation-pass__foot {
  text-align: center;
  color: var(--text-muted);
}
</style>
