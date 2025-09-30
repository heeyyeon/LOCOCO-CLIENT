import { apiRequest } from 'app/api/apiRequest';

import {
  ApplicantsApiResponse,
  BrandCampaignInfosApiResponse,
  GetApplicantsParams,
} from '../types';

/**
 * 브랜드 지원자 목록 조회 API
 * @param params 조회 파라미터
 * @returns 지원자 목록과 페이지네이션 정보
 */
export const getApplicants = async (
  params: GetApplicantsParams = {}
): Promise<ApplicantsApiResponse> => {
  const { campaignId, page = 0, size = 10, approveStatus } = params;

  // 쿼리 파라미터 구성
  let queryString = `page=${page}&size=${size}`;

  // approveStatus가 있으면 쿼리 스트링에 추가
  if (approveStatus) {
    queryString += `&status=${approveStatus}`;
  }

  const response = await apiRequest<ApplicantsApiResponse>({
    endPoint: `/api/brands/my/campaigns/${campaignId}/applicants?${queryString}`,
    method: 'GET',
  });
  return response;
};

/**
 * 브랜드 캠페인 정보 목록 조회 API
 * @returns 브랜드의 모든 캠페인 정보 목록
 */

export const getBrandCampaignInfos =
  async (): Promise<BrandCampaignInfosApiResponse> => {
    const response = await apiRequest<BrandCampaignInfosApiResponse>({
      endPoint: '/api/brands/my/campaigns/infos',
      method: 'GET',
    });
    return response;
  };
