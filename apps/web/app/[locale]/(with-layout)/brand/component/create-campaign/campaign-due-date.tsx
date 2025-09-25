import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

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
  const t = useTranslations('brandMyPageCreateCampaign.schedule');

  return (
    <section className="w-[64.8rem]">
      <InputWrapper label={t('dueDate')} required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="dueDate.month"
            options={months}
            size="small"
            placeholder="Month"
          />
          <RHFSelect
            name="dueDate.day"
            options={days}
            size="small"
            placeholder="Day"
          />
          <RHFSelect
            name="dueDate.year"
            options={years}
            size="small"
            placeholder="Year"
          />
        </div>
      </InputWrapper>

      <InputWrapper label={t('dueTime')} required>
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
                placeholder="Hour"
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
                placeholder="Minute"
              />
            )}
          />
        </div>
      </InputWrapper>
    </section>
  );
}
