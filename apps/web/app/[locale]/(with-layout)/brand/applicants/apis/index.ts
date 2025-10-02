import { apiRequest } from 'app/api/apiRequest';

import { ApplicantsApiResponse, GetApplicantsParams } from '../types';

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

export const approveApplicants = async (
  campaignId: number | undefined,
  creatorCampaignId: number[]
) => {
  const response = await apiRequest<void>({
    endPoint: `/api/brands/my/campaigns/${campaignId}/applicants/approve`,
    method: 'PATCH',
    data: {
      creatorCampaignIds: creatorCampaignId,
    },
  });
  return response;
};
