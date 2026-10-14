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
    nickname: string
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
    name: 'Jonathan',
    nickname: '大寶',
  },

  girlfriend: {
    name: 'Cynthia',
    nickname: '小寶',
  },

  dinner: {
    date: '2026-11-03',
    time: '19:40',
    restaurant: '肉次方燒肉放題 台北峨眉店 ',
    address: '臺北市萬華區萬壽里峨眉街37號4樓',
    dressCode: '做你最帥氣的自己就好',
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
