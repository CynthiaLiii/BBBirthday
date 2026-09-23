interface IcsEventOptions {
  title: string
  description: string
  location?: string
  start: Date
  end: Date
  filename: string
}

function toIcsDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z')
}

function buildIcsContent(options: IcsEventOptions): string {
  const { title, description, location } = options
  const uid = `${Date.now()}@bbbirthday`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BBBirthday//Invitation//ZH-TW',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(options.start)}`,
    `DTEND:${toIcsDate(options.end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
  ]

  if (location) {
    lines.push(`LOCATION:${location}`)
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')

  return lines.join('\r\n')
}

/**
 * 建立並下載 .ics 行事曆檔案。
 * 事件內容不得提前透露秘密（見呼叫端的 description 設定）。
 * 建立失敗不影響邀請流程，僅靜默忽略。
 */
export function useCalendar() {
  function addToCalendar(options: IcsEventOptions) {
    try {
      const content = buildIcsContent(options)
      const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = options.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch {
      // Calendar 建立失敗，不影響邀請流程
    }
  }

  return { addToCalendar }
}
