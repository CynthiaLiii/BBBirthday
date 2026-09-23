import { computed } from 'vue'

/**
 * 通用 Scene 步進邏輯。
 * Route 負責 Chapter，這個 composable 負責 Chapter 內部的 Scene 流程。
 */
export function useScene<T extends readonly string[]>(
  scenes: T,
  current: () => T[number],
  setCurrent: (scene: T[number]) => void,
) {
  const currentIndex = computed(() => scenes.indexOf(current()))
  const isFirst = computed(() => currentIndex.value <= 0)
  const isLast = computed(() => currentIndex.value >= scenes.length - 1)

  function goTo(scene: T[number]) {
    setCurrent(scene)
  }

  function next() {
    if (!isLast.value) {
      setCurrent(scenes[currentIndex.value + 1] as T[number])
    }
  }

  function prev() {
    if (!isFirst.value) {
      setCurrent(scenes[currentIndex.value - 1] as T[number])
    }
  }

  return { currentIndex, isFirst, isLast, goTo, next, prev }
}
