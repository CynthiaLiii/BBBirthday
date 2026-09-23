import { defineStore } from 'pinia'

export const DINNER_SCENES = ['opening', 'identity', 'invitation', 'confirmed', 'teaser'] as const
export type DinnerScene = (typeof DINNER_SCENES)[number]

export const GETAWAY_SCENES = [
  'unlock',
  'memories',
  'mission',
  'invitation',
  'confirmed',
  'pass',
] as const
export type GetawayScene = (typeof GETAWAY_SCENES)[number]

export const MISSION_IDS = ['mission-01', 'mission-02', 'mission-03'] as const
export type MissionId = (typeof MISSION_IDS)[number]

interface InvitationState {
  dinnerAccepted: boolean
  dinnerScene: DinnerScene
  getawayAccepted: boolean
  getawayScene: GetawayScene
  completedMissions: MissionId[]
  musicEnabled: boolean
}

const STORAGE_KEY = 'bbbirthday-invitation-state'

function loadPersistedState(): Partial<InvitationState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Partial<InvitationState>) : null
  } catch {
    // localStorage 不可用時退化為 memory state
    return null
  }
}

function persistState(state: InvitationState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 靜默失敗，不影響邀請流程
  }
}

const persisted = loadPersistedState()

export const useInvitationStore = defineStore('invitation', {
  state: (): InvitationState => ({
    dinnerAccepted: persisted?.dinnerAccepted ?? false,
    dinnerScene: persisted?.dinnerScene ?? 'opening',
    getawayAccepted: persisted?.getawayAccepted ?? false,
    getawayScene: persisted?.getawayScene ?? 'unlock',
    completedMissions: persisted?.completedMissions ?? [],
    musicEnabled: persisted?.musicEnabled ?? false,
  }),

  actions: {
    setDinnerScene(scene: DinnerScene) {
      this.dinnerScene = scene
      this._save()
    },

    acceptDinner() {
      this.dinnerAccepted = true
      this._save()
    },

    setGetawayScene(scene: GetawayScene) {
      this.getawayScene = scene
      this._save()
    },

    completeMission(missionId: MissionId) {
      if (!this.completedMissions.includes(missionId)) {
        this.completedMissions.push(missionId)
        this._save()
      }
    },

    acceptGetaway() {
      this.getawayAccepted = true
      this._save()
    },

    toggleMusic(enabled?: boolean) {
      this.musicEnabled = enabled ?? !this.musicEnabled
      this._save()
    },

    replayDinner() {
      this.dinnerAccepted = false
      this.dinnerScene = 'opening'
      this._save()
    },

    replayGetaway() {
      this.getawayAccepted = false
      this.getawayScene = 'unlock'
      this.completedMissions = []
      this._save()
    },

    _save() {
      persistState(this.$state)
    },
  },
})
