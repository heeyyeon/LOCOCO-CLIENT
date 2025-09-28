import { useQuery } from '@tanstack/react-query';

import { getApplicants } from '../apis';
import type { ApproveStatus } from '../types';

// Query Key 팩토리
export const applicantsKeys = {
  all: ['applicants'] as const,
  lists: () => [...applicantsKeys.all, 'list'] as const,
};

/**
 * 브랜드 지원자 목록 조회 훅
 * @param params 조회 파라미터
 * @param enabled 쿼리 활성화 여부 (기본값: true)
 * @returns 지원자 목록 데이터와 로딩 상태
 */
export const useApplicants = (
  campaignId: number,
  size: number,
  page: number,
  approveStatus?: ApproveStatus,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['applicants', campaignId, size, page, approveStatus],
    queryFn: () => getApplicants({ campaignId, size, page, approveStatus }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
