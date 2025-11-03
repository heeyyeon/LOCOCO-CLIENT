export type ContentSubmissionsFormData = {
  formId: string;
  campaign: string;
  campaignId: number;
  campaignProductMedia: File[];
  captionAndHashtags: string;
  postUrl: string;
  contentPlatform?: string;
  nowReviewRound?: string;
  revisionRequestedAt?: string;
  brandNote?: string;
};

export type ContentSubmissionsForm = {
  submissions: ContentSubmissionsFormData[];
};
