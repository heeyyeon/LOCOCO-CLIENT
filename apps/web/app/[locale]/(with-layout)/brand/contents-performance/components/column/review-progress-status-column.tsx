import React from 'react';

import { useTranslations } from 'next-intl';

import { InfoChip } from '@lococo/design-system/info-chip';

import { type ReviewStatus } from '../../types';

interface ReviewStatusProps {
  reviewStatus: ReviewStatus;
}
export default function ReviewProgressStatus({
  reviewStatus,
}: ReviewStatusProps) {
  const t = useTranslations('brandContentsPerformance');
  const REVIEW_STATUS_MAP = {
    NOT_SUBMITTED: t('reviewStatus.notSubmitted'),
    IN_PROGRESS: t('reviewStatus.inProgress'),
    PENDING_REVISION: t('reviewStatus.pendingRevision'),
    REVISING: t('reviewStatus.revising'),
    FINAL_UPLOADED: t('reviewStatus.finalUploaded'),
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
