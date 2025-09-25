import React from 'react';

import { SelectFormField } from 'components/forms';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { RHFSelect } from './rhf-Select';

export default function CampaignWinnerAnnounce() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label="캠페인 당첨자 발표일" required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="announceDate.month"
            options={months}
            placeholder="월"
            size="small"
          />
          <RHFSelect
            name="announceDate.day"
            options={days}
            placeholder="일"
            size="small"
          />
          <RHFSelect
            name="announceDate.year"
            options={years}
            placeholder="년"
            size="small"
          />
        </div>
      </SelectFormField>

      <SelectFormField label="캠페인 당첨자 발표 시각" required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="announceTime.period"
            options={AM_PM}
            placeholder="AM/PM"
            size="small"
          />
          <RHFSelect
            name="announceTime.hour"
            options={HOURS}
            placeholder="시"
            size="small"
          />
          <RHFSelect
            name="announceTime.minute"
            options={MINUTES}
            placeholder="분"
            size="small"
          />
        </div>
      </SelectFormField>
    </section>
  );
}
