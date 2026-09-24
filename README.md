# A Private Invitation — Birthday Website

Vue 3 + TypeScript + Vite 打造的互動式生日邀請網站，分為兩個 Chapter：

- **Chapter 01 · The Dinner**（`/dinner`）：正式邀請 11/03 生日晚餐，並留下 11/06～11/07 的伏筆。
- **Chapter 02 · The Getaway**（`/getaway`）：透過實體生日卡片 QR Code 進入，逐步解鎖 11/06～11/07 過夜行程邀請。

## 開發

```sh
npm install
npm run dev
```

## 型別檢查與正式建置

```sh
npm run build
```

## 產生 Chapter 02 QR Code（供印刷用）

```sh
npm run qrcode -- "https://your-domain.com/getaway/<random-token>" ./getaway-qrcode.png
```

會產生高解析度、黑白、含 Quiet Zone 的 PNG，適合印在實體生日卡片上。

## 需要補充的 PLACEHOLDER 資料

所有私人資料集中在 `src/data/`，尚未填入前網站仍可完整運作：

| 檔案 | 內容 |
| --- | --- |
| [src/data/config.ts](src/data/config.ts) | 男友／女友姓名、餐廳名稱與地址、目的地 |
| [src/data/questions.ts](src/data/questions.ts) | Identity Verification 的正確選項文字 |
| [src/data/memories.ts](src/data/memories.ts) | Memory Archive 的照片路徑、日期、回憶文字 |
| `public/images/memories/*` | 實際回憶照片（目前為 SVG 佔位圖） |

正式部署前，建議將 `/getaway` 改為不可猜測的網址（例如加上亂數 token），避免被意外發現。

## 專案結構

- `src/components/dinner/`、`src/components/getaway/`：各 Chapter 的 Scene 元件
- `src/components/common/`：共用元件（按鈕、票券、Scene 轉場）
- `src/composables/`：Scene 步進、Confetti、行事曆邏輯
- `src/stores/invitation.ts`：Pinia store，含 localStorage 進度保存
- `scripts/generate-qrcode.mjs`：QR Code 產生工具
