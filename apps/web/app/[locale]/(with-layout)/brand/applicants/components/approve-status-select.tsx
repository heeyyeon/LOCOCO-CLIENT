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
  const statusOptions = [
    { label: '전체', value: 'ALL' },
    { label: '승인됨', value: 'APPROVED' },
    { label: '대기중', value: 'PENDING' },
    { label: '거절됨', value: 'REJECTED' },
  ];

  return (
    <SelectRoot
      value={selectedStatus || undefined}
      onValueChange={(value) => {
        onStatusChange(value as ApproveStatusWithAll);
      }}
    >
      <SelectTrigger className="data-[placeholder]:text-body4 w-[12rem] data-[slot]:text-[1.4rem] data-[placeholder]:text-gray-600 data-[slot]:text-gray-600">
        <SelectValue placeholder="승인현황" />
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
