export const CATEGORY_KEYS = ['ALL', 'SKINCARE', 'SUNCARE', 'MAKEUP'] as const;

export const CATEGORY_NAME = {
  ALL: 'ALL',
  SKINCARE: 'Skincare',
  SUNCARE: 'Suncare',
  MAKEUP: 'Makeup',
} as const;

export const MAIN_PRODUCTS_CATEGORY_KEYS = {
  ESSENCE_TONER: 'ESSENCE_TONER',
  SERUM_AMPOULE: 'SERUM_AMPOULE',
  CREAM_LOTION: 'CREAM_LOTION',
  CLEANSER: 'CLEANSER',
  SUNCARE: 'SUNCARE',
  ETC: 'ETC',
} as const;

export type MainProductsCategoryKey = keyof typeof MAIN_PRODUCTS_CATEGORY_KEYS;
