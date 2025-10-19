import React from 'react';

import { useFormatter, useTimeZone } from 'next-intl';

import dayjs from 'dayjs';

export default function AppliedDateColumn({
  appliedDate,
}: {
  appliedDate: string;
}) {
  const format = useFormatter();
  const date = dayjs(appliedDate).toDate();
  const timeZone = useTimeZone();
  return (
    <div className="text-inter-body3 text-gray-800">
      <p>
        {format.dateTime(date, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: timeZone,
        })}
      </p>
      <p>
        {format.dateTime(date, {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          timeZone: timeZone,
        })}
      </p>
    </div>
  );
}
