<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { MISSION_IDS, useInvitationStore, type GetawayScene, type MissionId } from '@/stores/invitation'
import SceneTransition from '@/components/common/SceneTransition.vue'
import MusicToggle from '@/components/common/MusicToggle.vue'
import GetawayUnlock from '@/components/getaway/GetawayUnlock.vue'
import MemoryArchive from '@/components/getaway/MemoryArchive.vue'
import MissionDate from '@/components/getaway/MissionDate.vue'
import MissionPacking from '@/components/getaway/MissionPacking.vue'
import MissionReveal from '@/components/getaway/MissionReveal.vue'
import GetawayInvitation from '@/components/getaway/GetawayInvitation.vue'
import GetawayConfirmed from '@/components/getaway/GetawayConfirmed.vue'
import BirthdayPass from '@/components/getaway/BirthdayPass.vue'

const store = useInvitationStore()

const scene = computed(() => store.getawayScene)

function goTo(next: GetawayScene) {
  store.setGetawayScene(next)
}

const currentMissionIndex = computed(() => store.completedMissions.length)

function completeMission(id: MissionId) {
  store.completeMission(id)
  if (store.completedMissions.length >= MISSION_IDS.length) {
    goTo('invitation')
  }
}

function handleAcceptGetaway() {
  store.acceptGetaway()
  goTo('confirmed')
}

onMounted(() => {
  // 重新整理後若任務已全部完成卻停留在 mission Scene，直接前進到 Invitation
  if (scene.value === 'mission' && currentMissionIndex.value >= MISSION_IDS.length) {
    goTo('invitation')
  }
})
</script>

<template>
  <div class="getaway-view" :class="{ 'theme-getaway': scene !== 'unlock' }">
    <MusicToggle />

    <SceneTransition :scene-key="scene">
      <GetawayUnlock v-if="scene === 'unlock'" @continue="goTo('memories')" />

      <MemoryArchive v-else-if="scene === 'memories'" @continue="goTo('mission')" />

      <section v-else-if="scene === 'mission'" class="getaway-view__mission">
        <MissionDate
          v-if="currentMissionIndex === 0"
          @complete="completeMission('mission-01')"
        />
        <MissionPacking
          v-else-if="currentMissionIndex === 1"
          @complete="completeMission('mission-02')"
        />
        <MissionReveal
          v-else-if="currentMissionIndex === 2"
          @complete="completeMission('mission-03')"
        />
      </section>

      <GetawayInvitation v-else-if="scene === 'invitation'" @accept="handleAcceptGetaway" />

      <GetawayConfirmed v-else-if="scene === 'confirmed'" @continue="goTo('pass')" />

      <BirthdayPass v-else-if="scene === 'pass'" />
    </SceneTransition>
  </div>
</template>

<style scoped>
.getaway-view {
  background: var(--bg, var(--getaway-bg));
  color: var(--text, var(--getaway-text));
  min-height: 100vh;
  min-height: 100dvh;
  transition: background-color var(--duration-slow) var(--ease-editorial);
}

.getaway-view__mission {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl) var(--space-lg);
}
</style>
