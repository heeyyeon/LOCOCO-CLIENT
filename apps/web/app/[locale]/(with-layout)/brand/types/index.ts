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
