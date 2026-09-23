/**
 * Chapter 02 — Memory Archive 使用的回憶資料
 * 照片全部由本地 assets 載入，尚未提供的照片使用 placeholder 圖片。
 */

export interface Memory {
  id: string
  image: string
  date?: string
  title?: string
  message: string
  rotate: number // 極小角度旋轉，營造自然紙張排列
}

export const memories: Memory[] = [
  {
    id: 'memory-01',
    image: '/images/memories/placeholder-01.svg',
    date: 'PLACEHOLDER',
    title: 'PLACEHOLDER',
    message: 'PLACEHOLDER（回憶文字）',
    rotate: -2,
  },
  {
    id: 'memory-02',
    image: '/images/memories/placeholder-02.svg',
    date: 'PLACEHOLDER',
    title: 'PLACEHOLDER',
    message: 'PLACEHOLDER（回憶文字）',
    rotate: 1,
  },
  {
    id: 'memory-03',
    image: '/images/memories/placeholder-03.svg',
    date: 'PLACEHOLDER',
    title: 'PLACEHOLDER',
    message: 'PLACEHOLDER（回憶文字）',
    rotate: -1,
  },
  {
    id: 'memory-04',
    image: '/images/memories/placeholder-04.svg',
    date: 'PLACEHOLDER',
    title: 'PLACEHOLDER',
    message: 'PLACEHOLDER（回憶文字）',
    rotate: 2,
  },
]
