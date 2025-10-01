// Types
export type ReviewRound = 'FIRST' | 'SECOND';
export type ContentPlatform = 'INSTA_REELS' | 'TIKTOK_VIDEO' | 'INSTA_POST';
export type ReviewStatus =
  | 'FINAL_UPLOADED'
  | 'PENDING'
  | 'FEEDBACK'
  | 'NOT_SUBMITTED'
  | 'IN_PROGRESS'
  | 'UNDER_REVISION';
export interface Creator {
  creatorId: number;
  creatorFullName: string;
  creatorNickname: string;
  profileImageUrl: string;
}

export interface CampaignReview {
  campaignReviewId: number;
  reviewRound: ReviewRound;
  contentType: ContentPlatform;
  reviewStatus: ReviewStatus;
  postUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
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
