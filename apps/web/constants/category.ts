/**
 * 카테고리 정의
 *
 * - 스킨케어: 토너, 모이스처라이저, 에센스/세럼, 크림 등 기초 케어 제품
 * - 페이스: 파운데이션, 페이스 파우더, 프레스트 파우더, 컨실러, 치크 등 베이스 메이크업 제품
 * - 아이: 아이브로우, 아이섀도우, 아이라이너 등 아이 메이크업 제품
 * - 립: 립스틱, 립 틴트 등 립 메이크업 제품
 */
export const CATEGORYS = [
  {
    category: 'スキンケア',
    options: [
      'すべて',
      'トナー',
      'モイスチャライザー',
      'エッセンス / セラム',
      'クリーム',
    ],
  },
  {
    category: 'フェイス',
    options: [
      'すべて',
      'ファンデーション',
      'フェイスパウダー / プレストパウダー',
      'コンシーラー',
      'チーク',
    ],
  },
  {
    category: 'アイ',
    options: ['すべて', 'アイブロウ', 'アイシャドウ', 'アイライナー'],
  },
  {
    category: 'リップ',
    options: ['すべて', 'リップスティック', 'リップティント'],
  },
] as const;

export type Category = (typeof CATEGORYS)[number];
export type CategoryName = Category['category'];
export type CategoryOption = Category['options'][number];
