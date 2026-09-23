<script setup lang="ts">
defineProps<{ sceneKey: string }>()
</script>

<template>
  <Transition name="scene" mode="out-in">
    <div :key="sceneKey" class="scene-transition">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.scene-transition {
  width: 100%;
}
</style>
