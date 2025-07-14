export const PRODUCT_DETAIL_QUERY_KEYS = {
  ALL: ['PRODUCT_DETAIL'] as const,
  REVIEW: (productId: number) =>
    [...PRODUCT_DETAIL_QUERY_KEYS.ALL, productId] as const,
};
