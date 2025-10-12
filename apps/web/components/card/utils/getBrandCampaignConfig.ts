export type CampaignStatus =
  | 'DRAFT'
  | 'WAITING_APPROVAL'
  | 'OPEN_RESERVED'
  | 'RECRUITING'
  | 'RECRUITMENT_CLOSED'
  | 'IN_REVIEW'
  | 'COMPLETED';

export const CAMPAIGN_STATUS_CONFIG = {
  DRAFT: {
    chipContent: 'Draft',
    buttonLabel: '초안 편집하기',
    routePath: (id: number) => `/brand/create-campaign/${id}`,
  },
  COMPLETED: {
    chipContent: 'Closed',
    buttonLabel: '컨텐츠 보기',
    routePath: (id: number) => `/campaign-detail/${id}`,
  },
  IN_REVIEW: {
    chipContent: 'Active',
    buttonLabel: '컨텐츠 보기',
    routePath: (id: number) => `/campaign-detail/${id}`,
  },
  OPEN_RESERVED: {
    chipContent: 'Upcoming',
    buttonLabel: '캠페인 보러가기',
    routePath: (id: number) => `/campaign-detail/${id}`,
  },
  RECRUITING: {
    chipContent: 'Active',
    buttonLabel: '지원자 보기',
    routePath: (id: number) => `/brand/applicants/${id}`,
  },
  RECRUITMENT_CLOSED: {
    chipContent: 'Active',
    buttonLabel: '지원자 보기',
    routePath: (id: number) => `/brand/applicants/${id}`,
  },
  WAITING_APPROVAL: {
    chipContent: 'Pending',
    buttonLabel: '승인 대기 중',
    routePath: (id: number) =>
      `/brand/campaign-detail-readonly?campaignId=${id}`,
  },
} as const;
