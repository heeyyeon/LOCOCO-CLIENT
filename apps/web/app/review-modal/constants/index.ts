export const REVIEW_API = {
  VIDEO_DETAIL: (reviewId: number | string) =>
    `/api/reviews/details/${reviewId}/video`,
  IMAGE_DETAIL: (reviewId: number | string) =>
    `/api/reviews/details/${reviewId}/image`,
} as const;
