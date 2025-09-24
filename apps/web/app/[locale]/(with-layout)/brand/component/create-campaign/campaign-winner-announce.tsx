import React from 'react';

import { SelectFormField } from 'components/forms';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

export default function CampaignWinnerAnnounce() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label="캠페인 당첨자 발표일" required>
        <div className="flex gap-[2.4rem]">
          <Select size="small" options={months} />
          <Select size="small" options={days} />
          <Select size="small" options={years} />
        </div>
      </SelectFormField>
      <SelectFormField label="캠페인 당첨자 발표 시각" required>
        <div className="flex gap-[2.4rem]">
          <Select size="small" options={AM_PM} />
          <Select size="small" options={HOURS} />
          <Select size="small" options={MINUTES} />
        </div>
      </SelectFormField>
    </section>
  );
}
