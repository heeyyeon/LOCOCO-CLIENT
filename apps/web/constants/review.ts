export const REVIEW_TEXT_PLACEHOLDER = {
  POSITIVE: '使用してよかった点を教えてください。',
  NEGATIVE: '使用して気になった点を教えてください。',
} as const;

export const REVIEW_TEXT = {
  MAX_LENGTH: 1500,
  MIN_LENGTH: 15,
} as const;

export const REVIEW_TEXT_ERROR_MESSAGE = {
  MIN: (min:number)=>`${min}文字以上で入力してください。`,
  MAX: (max:number)=>`${max}使用して気になった点を教えてください。`,
} as const;

export const REVIEW_MEDIA_MAX_COUNT = {
  PHOTO: 5,
  VIDEO: 1,
  RECEIPT: 1,
} as const;
