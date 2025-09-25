import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import InputWrapper from 'app/[locale]/(with-layout)/my-page/components/input-wrapper';
import { CampaignFormData } from 'schema/create-campaign-schema';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

import { RHFSelect } from './rhf-Select';

export default function CampaignDueDate() {
  const { control } = useFormContext<CampaignFormData>();
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();

  return (
    <section className="w-[64.8rem]">
      <InputWrapper label="2차 컨텐츠 최종 제출일" required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="dueDate.month"
            options={months}
            size="small"
            placeholder="월"
          />
          <RHFSelect
            name="dueDate.day"
            options={days}
            size="small"
            placeholder="일"
          />
          <RHFSelect
            name="dueDate.year"
            options={years}
            size="small"
            placeholder="년"
          />
        </div>
      </InputWrapper>

      <InputWrapper label="2차 컨텐츠 최종 제출 시각" required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="dueTime.period"
            control={control}
            render={({ field }) => (
              <Select
                size="small"
                options={AM_PM}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="AM/PM"
              />
            )}
          />
          <Controller
            name="dueTime.hour"
            control={control}
            render={({ field }) => (
              <Select
                size="small"
                options={HOURS}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="시"
              />
            )}
          />
          <Controller
            name="dueTime.minute"
            control={control}
            render={({ field }) => (
              <Select
                size="small"
                options={MINUTES}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="분"
              />
            )}
          />
        </div>
      </InputWrapper>
    </section>
  );
}
