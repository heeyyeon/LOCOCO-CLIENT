export const PRODUCT_KEYS = {
  ALL: ['product'],
  PRODUCT_LISTS: () => [...PRODUCT_KEYS.ALL, 'list'],
  PRODUCT_LIST: ({ page, size }: { page?: number; size?: number }) => {
    return [...PRODUCT_KEYS.PRODUCT_LISTS(), 'list', page, size];
  },
  PRODUCT_DETAILS: (id: number) => [...PRODUCT_KEYS.ALL, 'detail', id],
} as const;

export const REVIEW_KEYS = {
  ALL: ['review'],
  VIDEO: () => [...REVIEW_KEYS.ALL, 'video'],
  VIDEO_LISTS: () => [...REVIEW_KEYS.VIDEO(), 'list'],
  VIDEO_LIST: ({ page, size }: { page?: number; size?: number }) => [
    ...REVIEW_KEYS.VIDEO_LISTS(),
    'list',
    page,
    size,
  ],

  IMAGE_LISTS: () => [...REVIEW_KEYS.ALL, 'list'],
  IMAGE_LIST: ({ page, size }: { page?: number; size?: number }) => [
    ...REVIEW_KEYS.IMAGE_LISTS(),
    'list',
    page,
    size,
  ],
} as const;
