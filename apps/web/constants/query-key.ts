export const PRODUCT_KEYS = {
  ALL: ['product'],
  PRODUCT_LISTS: () => [...PRODUCT_KEYS.ALL, 'list'],
  PRODUCT_LIST: ({ page, size }: { page?: number; size?: number }) => {
    return [...PRODUCT_KEYS.PRODUCT_LISTS(), 'list', page, size];
  },
  PRODUCT_DETAILS: (id: number | string) => [...PRODUCT_KEYS.ALL, 'detail', id],
} as const;

export const REVIEW_KEYS = {
  ALL: ['review'],
  VIDEO: () => [...REVIEW_KEYS.ALL, 'video'],
  VIDEO_LISTS: () => [...REVIEW_KEYS.VIDEO(), 'list'],
  VIDEO_DETAILS: () => [...REVIEW_KEYS.VIDEO(), 'detail'],
  VIDEO_LIST: ({ page, size }: { page?: number; size?: number }) => [
    ...REVIEW_KEYS.VIDEO_LISTS(),
    'list',
    page,
    size,
  ],
  VIDEO_DETAIL: ({ id }: { id: number }) => [
    ...REVIEW_KEYS.VIDEO_DETAILS(),
    'detail',
    id,
  ],
  IMAGE: () => [...REVIEW_KEYS.ALL, 'image'],
  IMAGE_LISTS: () => [...REVIEW_KEYS.IMAGE(), 'list'],
  IMAGE_DETAILS: () => [...REVIEW_KEYS.IMAGE(), 'detail'],
  IMAGE_LIST: ({ page, size }: { page?: number; size?: number }) => [
    ...REVIEW_KEYS.IMAGE_LISTS(),
    'list',
    page,
    size,
  ],
  IMAGE_DETAIL: ({ id }: { id: number }) => [
    ...REVIEW_KEYS.IMAGE_DETAILS(),
    'detail',
    id,
  ],
} as const;
