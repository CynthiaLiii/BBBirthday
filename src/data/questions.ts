/**
 * Identity Verification 使用的私人問題
 * 選項資料一律由此檔案提供，不得寫死在 Component 中。
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

export const identityQuestion: IdentityQuestion = {
  question: '請問誰是世界上最帥的男朋友？',
  options: [
    { id: 'a', label: 'PLACEHOLDER（男友暱稱）', correct: true },
    { id: 'b', label: '隔壁老王', correct: false },
    { id: 'c', label: '我自己', correct: false },
  ],
  successMessage: 'Welcome.',
  failureMessage: '你是不是忘記自己有多帥了？',
}
