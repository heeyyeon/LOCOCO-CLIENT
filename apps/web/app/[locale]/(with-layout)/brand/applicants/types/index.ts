export type ApproveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface ApplicantData {
  creatorCampaignId: number;
  creatorId: number;
  creator: {
    creatorFullName: string;
    creatorNickName: string;
    creatorProfileImageUrl: string;
  };
  followerCount: {
    instagramFollower: number;
    tiktokFollower: number;
  };
  participationCount: number;
  appliedDate: string;
  approveStatus: ApproveStatus;
}

export interface GetApplicantsParams {
  campaignId?: number;
  page?: number;
  size?: number;
  approveStatus?: ApproveStatus;
}

export interface ApplicantsApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    applicants: ApplicantData[];
    pageInfo: {
      isLast: boolean;
      numberOfElements: number;
      pageNumber: number;
      pageSize: number;
      totalPages: number;
    };
  };
}

export interface CampaignInfo {
  campaignId: number;
  campaignTitle: string;
  startDate: string;
  endDate: string;
}

export interface BrandCampaignInfosApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    campaignInfos: CampaignInfo[];
  };
}
