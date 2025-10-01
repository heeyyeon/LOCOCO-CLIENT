// Types
export type ReviewRound = 'FIRST' | 'SECOND';
export type ContentPlatform = 'INSTA_REELS' | 'TIKTOK_VIDEO' | 'INSTA_POST';
export type ReviewStatus =
  | 'NOT_SUBMITTED' // 미제출
  | 'IN_PROGRESS' // 검토 중
  | 'PENDING_REVISION' // 검토 요청
  | 'REVISING' // 수정중
  | 'FINAL_UPLOADED'; // 최종 업로드

export interface Creator {
  creatorId: number;
  creatorFullName: string;
  creatorNickname: string;
  profileImageUrl: string;
}

export interface CampaignReview {
  campaignReviewId: number;
  reviewRound: ReviewRound;
  reviewStatus: ReviewStatus;
  postUrl: string;
  contents: {
    contentType: ContentPlatform;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
  };

  uploadedDate: string;
}

export interface CreatorWithReviews {
  creator: Creator;
  reviews: CampaignReview[];
}

export interface PageableResponse {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  isLast: boolean;
  totalPages: number;
}

export interface CampaignPerformanceData {
  campaignId: number;
  campaignTitle: string;
  firstContentPlatform: ContentPlatform;
  secondContentPlatform: ContentPlatform;
  creators: CreatorWithReviews[];
  pageableResponse: PageableResponse;
}

export interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: CampaignPerformanceData;
}
