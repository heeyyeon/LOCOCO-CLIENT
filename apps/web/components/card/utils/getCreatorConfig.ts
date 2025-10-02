export const CREATOR_ACTION_CONFIG = {
  VIEW_DETAILS: {
    chipContent: 'Active',
    getRoutePath: (id: number) => `/campaign-detail/${id}`,
  },
  CONFIRM_ADDRESS: {
    chipContent: 'Pending',
    getRoutePath: null,
  },
  UPLOAD_FIRST_REVIEW: {
    chipContent: 'Active',
    getRoutePath: (id: number) =>
      `/my-page/content-submissions?campaignId=${id}&round=FIRST`,
  },
  REVISION_REQUESTED: {
    chipContent: 'In Review',
    getRoutePath: (id: number) =>
      `/my-page/content-submissions?campaignId=${id}&round=SECOND`,
  },
  VIEW_NOTES: {
    chipContent: 'In Review',
    getRoutePath: (id: number) =>
      `/my-page/content-submissions?campaignId=${id}&round=SECOND`,
  },
  UPLOAD_SECOND_REVIEW: {
    chipContent: 'In Review',
    getRoutePath: (id: number) =>
      `/my-page/content-submissions?campaignId=${id}&round=SECOND`,
  },
  VIEW_RESULTS: {
    chipContent: 'Completed',
    getRoutePath: (id: number) => `/my-page/final-review?campaignId=${id}`,
  },
  BRAND_APPROVAL_WAITING: {
    chipContent: 'Pending',
    getRoutePath: (id: number) => `/campaign-detail/${id}`,
  },
} as const;

export type CreatorAction = keyof typeof CREATOR_ACTION_CONFIG;

export const PARTICIPATION_STATUS_CHIP_VARIANT = {
  PENDING: 'WAITING_APPROVAL',
  APPROVED: 'WAITING_APPROVAL',
  ACTIVE: 'RECRUITING',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'RECRUITMENT_CLOSED',
  REJECTED: 'COMPLETED',
} as const;

export type ParticipationStatus =
  keyof typeof PARTICIPATION_STATUS_CHIP_VARIANT;
