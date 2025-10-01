import { InfoChip } from '@lococo/design-system/info-chip';

export default function ApproveStatusColumn({
  approvalStatus,
}: {
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}) {
  const getApprovalStatusStyle = (
    status: string
  ): { text: string; color: 'default' | 'green' | 'red' } => {
    const statusMap: Record<
      string,
      { text: string; color: 'default' | 'green' | 'red' }
    > = {
      PENDING: { text: '대기중', color: 'default' },
      APPROVED: { text: '승인됨', color: 'green' },
      REJECTED: { text: '거절됨', color: 'red' },
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
