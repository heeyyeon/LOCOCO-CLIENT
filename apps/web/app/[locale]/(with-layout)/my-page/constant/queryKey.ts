export const PROFILE_KEYS = {
  ALL: ['profile'] as const,
  profile: () => [...PROFILE_KEYS.ALL, 'profile'] as const,
  idCheck: (id: string) => [...PROFILE_KEYS.ALL, 'idCheck', id] as const,
  address: () => [...PROFILE_KEYS.ALL, 'address'] as const,
};

export const CAMPAIGN_REVIEW_KEYS = {
  ALL: ['campaignReview'] as const,
  campaignReview: (campaignId: number, round: string) =>
    [...CAMPAIGN_REVIEW_KEYS.ALL, campaignId, round] as const,
  myCampaigns: (params: { page?: number; size?: number } = {}) =>
    [...CAMPAIGN_REVIEW_KEYS.ALL, 'myCampaigns', params] as const,
  reviewResult: (campaignId: number) =>
    [...CAMPAIGN_REVIEW_KEYS.ALL, 'reviewResult', campaignId] as const,
};

export const SNS_CONNECTION_KEYS = {
  ALL: ['snsConnection'],
} as const;
