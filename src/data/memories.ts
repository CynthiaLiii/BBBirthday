/**
 * Chapter 02 — Memory Archive 使用的回憶資料
 * 照片全部由本地 assets 載入，尚未提供的照片使用 placeholder 圖片。
 */

export interface Memory {
  id: string
  image: string
  date?: string
  message: string
  rotate: number // 極小角度旋轉，營造自然紙張排列
}

export const memories: Memory[] = [
  {
    id: 'memory-01',
    image: '/images/memories/TheBeginning-01.jpg',
    date: 'THE BEGINNING',
    message: '那時候的我們還有點害羞 有點不習慣',
    rotate: -2,
  },
  {
    id: 'memory-02',
    image: '/images/memories/OurAdventures-02.jpg',
    date: 'OUR ADVENTURES',
    message: '和你一起去的地方，都會變成我想再去一次的地方',
    rotate: 1,
  },
  {
    id: 'memory-03',
    image: '/images/memories/TheFunnyUs-03.jpg',
    date: 'THE FUNNY US',
    message: '敢在你面前做自己，敢在你面前奇奇怪怪',
    rotate: -1,
  },
  {
    id: 'memory-04',
    image: '/images/memories/ToBeContinued-04.jpg',
    date: 'TO BE CONTINUED',
    message: '接下來，我還想跟你一起收藏更多回憶',
    rotate: 2,
  },
]
