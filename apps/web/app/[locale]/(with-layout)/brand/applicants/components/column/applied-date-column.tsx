import React from 'react';

import { useFormatter } from 'next-intl';

import dayjs from 'dayjs';

export default function AppliedDateColumn({
  appliedDate,
}: {
  appliedDate: string;
}) {
  const format = useFormatter();

  return (
    <p className="text-inter-body3 text-gray-800">
      {format.dateTime(dayjs(appliedDate).toDate(), {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })}
    </p>
  );
}
