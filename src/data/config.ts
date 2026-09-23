/**
 * 私人資料設定檔
 * 所有尚未提供的真實資料一律使用 PLACEHOLDER，禁止自行虛構。
 */

export interface BirthdayConfig {
  boyfriend: {
    name: string
    nickname: string
  }
  girlfriend: {
    name: string
  }
  dinner: {
    date: string // ISO 格式 YYYY-MM-DD
    time: string // 24hr HH:mm
    restaurant: string
    address: string
    dressCode: string
  }
  getaway: {
    startDate: string
    endDate: string
    departureNote: string
    destination: string
  }
  site: {
    title: string
    ogTitle: string
    ogDescription: string
  }
}

export const birthdayConfig: BirthdayConfig = {
  boyfriend: {
    name: 'PLACEHOLDER',
    nickname: 'PLACEHOLDER',
  },

  girlfriend: {
    name: 'PLACEHOLDER',
  },

  dinner: {
    date: '2026-11-03',
    time: '19:00',
    restaurant: 'PLACEHOLDER',
    address: 'PLACEHOLDER',
    dressCode: 'Be your handsome self.',
  },

  getaway: {
    startDate: '2026-11-06',
    endDate: '2026-11-07',
    departureNote: 'FRIDAY · AFTER WORK',
    destination: 'CLASSIFIED',
  },

  site: {
    title: 'A Private Invitation',
    ogTitle: 'A Private Invitation',
    ogDescription: 'Something special is waiting for you.',
  },
}
