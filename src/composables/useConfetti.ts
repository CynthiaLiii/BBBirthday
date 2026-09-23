import confetti from 'canvas-confetti'

/**
 * 精緻、短暫的 Confetti 效果。
 * 使用 Champagne Gold / Ivory 色系，避免大量彩虹色。
 */
export function useConfetti() {
  function celebrate() {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const colors = ['#c8a866', '#f4efe7', '#8a8378']

    confetti({
      particleCount: 60,
      spread: 65,
      startVelocity: 32,
      gravity: 1.1,
      scalar: 0.8,
      ticks: 140,
      origin: { y: 0.62 },
      colors,
      disableForReducedMotion: true,
    })
  }

  return { celebrate }
}
