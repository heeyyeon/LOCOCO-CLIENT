import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@lococo/design-system/select';

export type ApproveStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

interface ApproveStatusSelectProps {
  selectedStatus: ApproveStatus | '';
  onStatusChange: (status: ApproveStatus | '') => void;
}

export default function ApproveStatusSelect({
  selectedStatus,
  onStatusChange,
}: ApproveStatusSelectProps) {
  const statusOptions = [
    { label: 'APPROVED', value: 'APPROVED' },
    { label: 'PENDING', value: 'PENDING' },
    { label: 'REJECTED', value: 'REJECTED' },
  ];

  return (
    <SelectRoot
      value={selectedStatus}
      onValueChange={(value) => {
        onStatusChange(value as ApproveStatus | '');
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
