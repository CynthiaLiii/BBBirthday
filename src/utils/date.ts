const MONTH_NAMES = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

const WEEKDAY_NAMES = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

export interface DateParts {
  month: string
  day: string
  year: string
  weekday: string
}

/** 將 ISO 日期字串（YYYY-MM-DD）拆解為 Editorial 排版用的英文欄位 */
export function formatDateParts(isoDate: string): DateParts {
  const date = new Date(`${isoDate}T00:00:00`)
  return {
    month: MONTH_NAMES[date.getMonth()] ?? '',
    day: String(date.getDate()).padStart(2, '0'),
    year: String(date.getFullYear()),
    weekday: WEEKDAY_NAMES[date.getDay()] ?? '',
  }
}

/** 將 ISO 日期字串格式化為 "NOV 03" 這類短格式 */
export function formatShortDate(isoDate: string): string {
  const { month, day } = formatDateParts(isoDate)
  return `${month.slice(0, 3)} ${day}`
}
