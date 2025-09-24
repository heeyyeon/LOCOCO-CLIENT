/**
 * 카테고리 정의
 *
 * - 스킨케어: 토너, 모이스처라이저, 에센스/세럼, 크림 등 기초 케어 제품
 * - 페이스: 파운데이션, 페이스 파우더, 프레스트 파우더, 컨실러, 치크 등 베이스 메이크업 제품
 * - 아이: 아이브로우, 아이섀도우, 아이라이너 등 아이 메이크업 제품
 * - 립: 립스틱, 립 틴트 등 립 메이크업 제품
 */
export const FACIAL_CARE = {
  name: 'スキンケア',
  options: {
    ALL: 'すべて',
    TONER: 'トナー',
    MOISTURIZER: 'モイスチャライザー',
    ESSENCE_SERUM: 'エッセンス / セラム',
    CREAM: 'クリーム',
  },
} as const;

export const FACE_MAKEUP = {
  name: 'フェイス',
  options: {
    ALL: 'すべて',
    FOUNDATION: 'ファンデーション',
    POWDER_COMPACT: 'パウダー / プレストパウダー',
    CONCEALER: 'コンシーラー',
    BLUSHER: 'チーク',
  },
} as const;

export const EYE_MAKEUP = {
  name: 'アイ',
  options: {
    ALL: 'すべて',
    EYEBROW: 'アイブロウ',
    EYESHADOW: 'アイシャドウ',
    EYELINER: 'アイライナー',
  },
} as const;

export const LIP_MAKEUP = {
  name: 'リップ',
  options: {
    ALL: 'すべて',
    LIPSTICK: 'リップスティック',
    LIP_TINT: 'リップティント',
  },
} as const;

export const CATEGORY_OPTIONS = {
  FACIAL_CARE: FACIAL_CARE.options,
  FACE_MAKEUP: FACE_MAKEUP.options,
  EYE_MAKEUP: EYE_MAKEUP.options,
  LIP_MAKEUP: LIP_MAKEUP.options,
} as const;

export const CATEGORY_NAME = {
  FACIAL_CARE: FACIAL_CARE.name,
  FACE_MAKEUP: FACE_MAKEUP.name,
  EYE_MAKEUP: EYE_MAKEUP.name,
  LIP_MAKEUP: LIP_MAKEUP.name,
} as const;

export const CATEGORY_NAME_NEW = {
  ALL: 'ALL',
  SKINCARE: 'Skincare',
  SUNCARE: 'Suncare',
  MAKEUP: 'Makeup',
} as const;
