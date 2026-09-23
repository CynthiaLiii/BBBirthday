// 產生 Chapter 02 QR Code（適合印刷於實體生日卡片）
// 使用方式：
//   node scripts/generate-qrcode.mjs "https://your-domain.com/getaway/<random-token>"
//   node scripts/generate-qrcode.mjs "https://your-domain.com/getaway/<random-token>" ./qrcode.png

import QRCode from 'qrcode'
import { resolve } from 'node:path'

const url = process.argv[2]
const outputPath = resolve(process.argv[3] ?? './getaway-qrcode.png')

if (!url) {
  console.error('請提供正式環境的 /getaway URL，例如：')
  console.error('  node scripts/generate-qrcode.mjs "https://your-domain.com/getaway/xxxxxx"')
  process.exit(1)
}

await QRCode.toFile(outputPath, url, {
  type: 'png',
  errorCorrectionLevel: 'H',
  margin: 4, // Quiet zone，確保印刷後仍可辨識
  width: 1200, // 高解析度，適合印刷
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
})

console.log(`QR Code 已產生：${outputPath}`)
console.log(`內容網址：${url}`)
