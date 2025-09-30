export interface CampaignDetailData {
  campaignId: number;
  title: string;
  campaignType: string;
  brandImageUrl: string;
  brandName: string;
  language: string;
  applyStartDate: string;
  applyDeadline: string;
  creatorAnnouncementDate: string;
  reviewSubmissionDeadline: string;
  deliverableRequirements: string[];
  participationRewards: string[];
  eligibilityRequirements: string[];
  thumbnailImages: { id: number; url: string; displayOrder: number }[];
  detailImages: { id: number; url: string; displayOrder: number }[];
  campaignStatusCode: string;
}

export interface CampaignDetailResponse {
  data: CampaignDetailData;
}
