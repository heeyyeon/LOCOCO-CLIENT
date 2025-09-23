import React from 'react';

import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

import InputWrapper from '../../my-page/components/input-wrapper';

export default function CampaignDueDate() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  return (
    <section className="w-[64.8rem]">
      <InputWrapper label="2차 컨텐츠 최종 제출일" required>
        <div className="flex gap-[2.4rem]">
          <Select size="small" options={months} />
          <Select size="small" options={days} />
          <Select size="small" options={years} />
        </div>
      </InputWrapper>
      <InputWrapper label="2차 컨텐츠 최종 제출 시각" required>
        <div className="flex gap-[2.4rem]">
          <Select size="small" options={AM_PM} />
          <Select size="small" options={HOURS} />
          <Select size="small" options={MINUTES} />
        </div>
      </InputWrapper>
    </section>
  );
}
