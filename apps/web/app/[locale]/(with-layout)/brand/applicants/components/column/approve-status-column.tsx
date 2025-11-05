import { useTranslations } from 'next-intl';

import { InfoChip } from '@lococo/design-system/info-chip';

export default function ApproveStatusColumn({
  approvalStatus,
}: {
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}) {
  const t = useTranslations('brandApplicants.approveStatusSelect');
  const getApprovalStatusStyle = (
    status: string
  ): { text: string; color: 'default' | 'green' | 'red' } => {
    const statusMap: Record<
      string,
      { text: string; color: 'default' | 'green' | 'red' }
    > = {
      PENDING: { text: t('pending'), color: 'default' },
      APPROVED: { text: t('approved'), color: 'green' },
      REJECTED: { text: t('rejected'), color: 'red' },
    };

    return statusMap[status] || { text: status, color: 'default' };
  };
  return (
    <InfoChip
      className="font-bold"
      text={getApprovalStatusStyle(approvalStatus).text}
      color={getApprovalStatusStyle(approvalStatus).color}
    />
  );
}
