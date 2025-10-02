export const BRAND_PROFILE_KEYS = {
  ALL: ['brandProfile'],
  PROFILE: () => [...BRAND_PROFILE_KEYS.ALL, 'profile'],
};

export const BRAND_FEEDBACK_KEYS = {
  ALL: ['brandFeedback'],
  REVIEW: (campaignReviewId: number) => [
    ...BRAND_FEEDBACK_KEYS.ALL,
    'review',
    campaignReviewId,
  ],
  BRAND_NOTE: () => [...BRAND_FEEDBACK_KEYS.ALL, 'brandNote'],
};
