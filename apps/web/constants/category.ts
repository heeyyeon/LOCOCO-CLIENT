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
