<script setup lang="ts">
import { watch } from 'vue'
import { useConfetti } from '@/composables/useConfetti'

const props = defineProps<{ active: boolean }>()
const { celebrate } = useConfetti()

watch(
  () => props.active,
  (isActive) => {
    if (isActive) celebrate()
  },
)
</script>

<template>
  <span class="visually-hidden" aria-hidden="true" />
</template>
