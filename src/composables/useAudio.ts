import { watch } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

let audioEl: HTMLAudioElement | null = null
let initialized = false

/**
 * 背景音樂控制。
 * 禁止自動播放：必須等待使用者第一次互動後才允許播放。
 * 若音樂載入失敗，網站仍正常使用。
 */
export function useAudio(src = '/audio/background-music.mp3') {
  const store = useInvitationStore()

  function ensureAudioElement() {
    if (audioEl || typeof window === 'undefined') return
    audioEl = new Audio(src)
    audioEl.loop = true
    audioEl.volume = 0.4
    audioEl.addEventListener('error', () => {
      // Audio 載入失敗：網站仍正常使用，僅關閉播放狀態
      store.toggleMusic(false)
    })
  }

  function bindFirstInteraction() {
    if (initialized || typeof window === 'undefined') return
    initialized = true

    const resume = () => {
      if (store.musicEnabled) {
        ensureAudioElement()
        audioEl?.play().catch(() => {
          // 使用者尚未互動或瀏覽器阻擋，靜默忽略
        })
      }
    }

    window.addEventListener('pointerdown', resume, { once: true })
    window.addEventListener('keydown', resume, { once: true })
  }

  function toggle() {
    ensureAudioElement()
    const next = !store.musicEnabled
    store.toggleMusic(next)

    if (next) {
      audioEl?.play().catch(() => {})
    } else {
      audioEl?.pause()
    }
  }

  watch(
    () => store.musicEnabled,
    (enabled) => {
      if (!audioEl) return
      if (enabled) {
        audioEl.play().catch(() => {})
      } else {
        audioEl.pause()
      }
    },
  )

  bindFirstInteraction()

  return { toggle, isEnabled: () => store.musicEnabled }
}
