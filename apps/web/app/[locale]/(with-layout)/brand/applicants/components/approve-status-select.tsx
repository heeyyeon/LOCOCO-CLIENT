import { useTranslations } from 'next-intl';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@lococo/design-system/select';

export type ApproveStatus = 'APPROVED' | 'PENDING' | 'REJECTED';
export type ApproveStatusWithAll = ApproveStatus | 'ALL' | '';

interface ApproveStatusSelectProps {
  selectedStatus: ApproveStatusWithAll;
  onStatusChange: (status: ApproveStatusWithAll) => void;
}

export default function ApproveStatusSelect({
  selectedStatus,
  onStatusChange,
}: ApproveStatusSelectProps) {
  const t = useTranslations('brandApplicants.approveStatusSelect');
  const statusOptions = [
    { label: t('all'), value: 'ALL' },
    { label: t('approved'), value: 'APPROVED' },
    { label: t('pending'), value: 'PENDING' },
    { label: t('rejected'), value: 'REJECTED' },
  ];

  return (
    <SelectRoot
      value={selectedStatus || undefined}
      onValueChange={(value) => {
        onStatusChange(value as ApproveStatusWithAll);
      }}
    >
      <SelectTrigger className="data-[placeholder]:text-body4 w-[12rem] data-[slot]:text-[1.4rem] data-[placeholder]:text-gray-600 data-[slot]:text-gray-600">
        <SelectValue placeholder={t('approveStatus')} />
      </SelectTrigger>
      <SelectContent className="text-[1.4rem]">
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
