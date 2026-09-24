/**
 * Identity Verification 使用的私人問題
 * 選項資料一律由此檔案提供，不寫死在 Component 中
 */

export interface IdentityQuestionOption {
  id: string
  label: string
  correct: boolean
}

export interface IdentityQuestion {
  question: string
  options: IdentityQuestionOption[]
  successMessage: string
  failureMessage: string
}

export const identityQuestions: IdentityQuestion[] = [
  {
    question: '請問誰是世界上最帥的男朋友？',
    options: [
      { id: 'a', label: '阿昕的大寶', correct: true },
      { id: 'b', label: '湯姆·克魯斯', correct: false },
      { id: 'c', label: '許光漢', correct: false },
    ],
    successMessage: '你就是我最帥的大寶',
    failureMessage: '你是不是忘記自己有多帥了？',
  },
  {
    question: '請問誰是最愛你的人？',
    options: [
      { id: 'a', label: '你的漂亮小寶', correct: false },
      { id: 'b', label: '想跟你那個那個的小寶', correct: false },
      { id: 'c', label: '每天都想親親抱抱你的小寶', correct: false },
      { id: 'd', label: '以上皆是', correct: true },
    ],
    successMessage: '恭喜你！你是全世界最幸福的男人',
    failureMessage: '答案不完整，想一下再重新回答',
  },
]
