import React from 'react';

import { SelectFormField } from 'components/forms';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { RHFSelect } from './rhf-Select';

export default function CampaignEndInfo() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label="캠페인 지원 종료일" required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="endDate.month"
            options={months}
            size="small"
            placeholder="Month"
          />
          <RHFSelect
            name="endDate.day"
            options={days}
            size="small"
            placeholder="Day"
          />
          <RHFSelect
            name="endDate.year"
            options={years}
            size="small"
            placeholder="Year"
          />
        </div>
      </SelectFormField>

      <SelectFormField label="캠페인 지원 종료 시각" required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="endTime.period"
            options={AM_PM}
            size="small"
            placeholder="AM/PM"
          />
          <RHFSelect
            name="endTime.hour"
            options={HOURS}
            size="small"
            placeholder="Hour"
          />
          <RHFSelect
            name="endTime.minute"
            options={MINUTES}
            size="small"
            placeholder="Minute"
          />
        </div>
      </SelectFormField>
    </section>
  );
}
