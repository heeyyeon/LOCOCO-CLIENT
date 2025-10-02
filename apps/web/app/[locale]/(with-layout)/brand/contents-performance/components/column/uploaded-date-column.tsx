import { useFormatter } from 'next-intl';

import dayjs from 'dayjs';

interface UploadedDateProps {
  uploadedDate?: string;
}
export default function UploadedDate({ uploadedDate }: UploadedDateProps) {
  const format = useFormatter();

  return (
    <p className="text-inter-body3 text-gray-600">
      {uploadedDate
        ? format.dateTime(dayjs(uploadedDate).toDate(), {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-'}
    </p>
  );
}
