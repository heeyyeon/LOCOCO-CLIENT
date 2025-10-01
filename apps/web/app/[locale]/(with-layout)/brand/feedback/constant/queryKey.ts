export const BRAND_FEEDBACK_KEYS = {
  all: ['brandFeedback'] as const,
  review: (campaignReviewId: number) =>
    [...BRAND_FEEDBACK_KEYS.all, 'review', campaignReviewId] as const,
};
