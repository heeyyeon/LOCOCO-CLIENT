export const PROFILE_KEYS = {
  all: ['profile'] as const,
  profile: () => [...PROFILE_KEYS.all, 'profile'] as const,
  idCheck: (id: string) => [...PROFILE_KEYS.all, 'idCheck', id] as const,
  address: () => [...PROFILE_KEYS.all, 'address'] as const,
};

export const CAMPAIGN_REVIEW_KEYS = {
  all: ['campaignReview'] as const,
  campaignReview: (campaignId: number, round: string) =>
    [...CAMPAIGN_REVIEW_KEYS.all, campaignId, round] as const,
  myCampaigns: (params: { page?: number; size?: number } = {}) =>
    [...CAMPAIGN_REVIEW_KEYS.all, 'myCampaigns', params] as const,
  reviewResult: (campaignId: number) =>
    [...CAMPAIGN_REVIEW_KEYS.all, 'reviewResult', campaignId] as const,
};
