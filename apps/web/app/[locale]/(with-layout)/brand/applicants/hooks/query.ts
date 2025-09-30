import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { approveApplicants, getApplicants } from '../apis';
import type { ApproveStatus } from '../types';

// Query Key 팩토리
export const applicantsKeys = {
  all: ['applicants'] as const,
  lists: () => [...applicantsKeys.all, 'list'] as const,
};

const queryClient = new QueryClient();
/**
 * 브랜드 지원자 목록 조회 훅
 * @param params 조회 파라미터
 * @param enabled 쿼리 활성화 여부 (기본값: true)
 * @returns 지원자 목록 데이터와 로딩 상태
 */
export const useApplicants = (
  campaignId: number | undefined,
  size: number,
  page: number,
  approveStatus?: ApproveStatus,
  enabled: boolean = true
) => {
  if (campaignId === undefined) {
    throw new Error('campaignId is required');
  }
  return useQuery({
    queryKey: [applicantsKeys.lists, campaignId, size, page, approveStatus],
    queryFn: () => getApplicants({ campaignId, size, page, approveStatus }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

export const useApproveApplicantsMutation = (
  creatorCampaignId: number[],
  campaignId: number | undefined
) => {
  if (campaignId === undefined) {
    throw new Error('campaignId is required');
  }
  return useMutation({
    mutationFn: () => approveApplicants(campaignId, creatorCampaignId),
    onSuccess: () => {
      alert('승인되었습니다.');
      queryClient.invalidateQueries({ queryKey: applicantsKeys.lists() });
    },
  });
};
