export type ApproveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface ApplicantData {
  creatorCampaignId: number;
  creatorId: number;
  creator: {
    creatorFullName: string;
    creatorNickname: string;
    profileImageUrl: string;
    instaLink: string;
    tiktokLink: string;
    creatorId: number;
  };
  followerCount: {
    instagramFollower: number;
    tiktokFollower: number;
  };
  participationCount: number;
  appliedDate: string;
  approveStatus: ApproveStatus;
}

export interface ApplicantTableData {
  creatorCampaignId: number;
  creatorId: number;
  creator: {
    creatorFullName: string;
    creatorNickname: string;
    profileImageUrl: string;
    creatorId: number;
  };
  followerCount: {
    instagramFollower: number;
    tiktokFollower: number;
    instaLink: string;
    tiktokLink: string;
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
