import React from 'react';

import { InfoChip } from '@lococo/design-system/info-chip';

import { type ReviewStatus } from '../../types';

interface ReviewStatusProps {
  reviewStatus: ReviewStatus;
}
export default function ReviewProgressStatus({
  reviewStatus,
}: ReviewStatusProps) {
  const REVIEW_STATUS_MAP = {
    NOT_SUBMITTED: '미제출',
    IN_PROGRESS: '진행중',
    PENDING_REVISION: '검토 요청',
    REVISING: '수정중',
    FINAL_UPLOADED: '최종 업로드',
  };
  const REVIEW_STATUS_COLOR_MAP = {
    NOT_SUBMITTED: 'red',
    IN_PROGRESS: 'default',
    PENDING_REVISION: 'blue',
    REVISING: 'default',
    FINAL_UPLOADED: 'green',
  } as const;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <InfoChip
        text={REVIEW_STATUS_MAP[reviewStatus]}
        color={REVIEW_STATUS_COLOR_MAP[reviewStatus]}
      />
    </div>
  );
}
