<script setup lang="ts">
import { ref } from 'vue'
import { identityQuestion } from '@/data/questions'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ verified: [] }>()

const selectedId = ref<string | null>(null)
const status = ref<'idle' | 'correct' | 'incorrect'>('idle')

function selectOption(id: string) {
  selectedId.value = id
  const option = identityQuestion.options.find((item) => item.id === id)
  status.value = option?.correct ? 'correct' : 'incorrect'

  if (option?.correct) {
    window.setTimeout(() => emit('verified'), 900)
  }
}

function retry() {
  selectedId.value = null
  status.value = 'idle'
}
</script>

<template>
  <section class="identity-check">
    <p class="eyebrow rise-in">Identity Verification</p>

    <p class="body-text-lg identity-check__question rise-in">
      {{ identityQuestion.question }}
    </p>

    <div v-if="status !== 'correct'" class="identity-check__options">
      <button
        v-for="option in identityQuestion.options"
        :key="option.id"
        type="button"
        class="identity-check__option body-text"
        :class="{ 'is-selected': selectedId === option.id && status === 'incorrect' }"
        @click="selectOption(option.id)"
      >
        {{ option.label }}
      </button>
    </div>

    <Transition name="fade">
      <div v-if="status === 'incorrect'" class="identity-check__feedback identity-check__feedback--denied">
        <p class="label">Access Denied</p>
        <p class="body-text">{{ identityQuestion.failureMessage }}</p>
        <AnimatedButton variant="ghost" @click="retry">再試一次</AnimatedButton>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="status === 'correct'" class="identity-check__feedback identity-check__feedback--verified">
        <p class="label">Identity Verified</p>
        <p class="heading-3">{{ identityQuestion.successMessage }}</p>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.identity-check {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  color: var(--text);
}

.identity-check__question {
  max-width: 320px;
}

.identity-check__options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
  max-width: 320px;
}

.identity-check__option {
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  background: var(--surface);
  transition:
    border-color var(--duration-fast) var(--ease-editorial),
    transform var(--duration-fast) var(--ease-editorial);
}

.identity-check__option:hover {
  border-color: var(--accent);
}

.identity-check__option.is-selected {
  border-color: #a3503f;
}

.identity-check__feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.identity-check__feedback--denied .label {
  color: #c17a68;
}

.identity-check__feedback--verified .label {
  color: var(--accent);
}
</style>
