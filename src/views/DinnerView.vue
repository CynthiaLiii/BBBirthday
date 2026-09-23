<script setup lang="ts">
import { computed } from 'vue'
import { useInvitationStore, type DinnerScene } from '@/stores/invitation'
import SceneTransition from '@/components/common/SceneTransition.vue'
import MusicToggle from '@/components/common/MusicToggle.vue'
import DinnerOpening from '@/components/dinner/DinnerOpening.vue'
import IdentityCheck from '@/components/dinner/IdentityCheck.vue'
import DinnerInvitation from '@/components/dinner/DinnerInvitation.vue'
import DinnerConfirmed from '@/components/dinner/DinnerConfirmed.vue'
import DinnerTeaser from '@/components/dinner/DinnerTeaser.vue'

const store = useInvitationStore()

const scene = computed(() => store.dinnerScene)

function goTo(next: DinnerScene) {
  store.setDinnerScene(next)
}

function handleAccept() {
  store.acceptDinner()
  goTo('confirmed')
}
</script>

<template>
  <div class="dinner-view theme-dinner">
    <MusicToggle />

    <SceneTransition :scene-key="scene">
      <DinnerOpening v-if="scene === 'opening'" @opened="goTo('identity')" />
      <IdentityCheck v-else-if="scene === 'identity'" @verified="goTo('invitation')" />
      <DinnerInvitation v-else-if="scene === 'invitation'" @accept="handleAccept" />
      <DinnerConfirmed v-else-if="scene === 'confirmed'" @continue="goTo('teaser')" />
      <DinnerTeaser v-else-if="scene === 'teaser'" />
    </SceneTransition>
  </div>
</template>

<style scoped>
.dinner-view {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  min-height: 100dvh;
  transition: background-color var(--duration-slow) var(--ease-editorial);
}
</style>
