<script setup lang="ts">
import { computed, ref } from 'vue'
import { identityQuestions } from '@/data/questions'
import AnimatedButton from '@/components/common/AnimatedButton.vue'

const emit = defineEmits<{ verified: [] }>()

const currentIndex = ref(0)
const selectedId = ref<string | null>(null)
const status = ref<'idle' | 'correct' | 'incorrect'>('idle')

const currentQuestion = computed(() => identityQuestions[currentIndex.value])
const isLastQuestion = computed(() => currentIndex.value >= identityQuestions.length - 1)

function selectOption(id: string) {
  selectedId.value = id
  const option = currentQuestion.value?.options.find((item) => item.id === id)
  status.value = option?.correct ? 'correct' : 'incorrect'

  if (option?.correct) {
    window.setTimeout(() => {
      if (isLastQuestion.value) {
        emit('verified')
      } else {
        currentIndex.value += 1
        selectedId.value = null
        status.value = 'idle'
      }
    }, 1800)
  }
}

function retry() {
  selectedId.value = null
  status.value = 'idle'
}
</script>

<template>
  <section class="identity-check">
    <p class="eyebrow rise-in">
      Identity Verification ({{ currentIndex + 1 }}/{{ identityQuestions.length }})
    </p>

    <p class="body-text-lg identity-check__question rise-in">
      {{ currentQuestion?.question }}
    </p>

    <div v-if="status !== 'correct'" class="identity-check__options">
      <button
        v-for="option in currentQuestion?.options"
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
        <p class="body-text">{{ currentQuestion?.failureMessage }}</p>
        <AnimatedButton variant="ghost" @click="retry">再試一次</AnimatedButton>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="status === 'correct'" class="identity-check__feedback identity-check__feedback--verified">
        <p class="label">Identity Verified</p>
        <p class="heading-3">{{ currentQuestion?.successMessage }}</p>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.identity-check {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-xl) var(--space-lg);
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
