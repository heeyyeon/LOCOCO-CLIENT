'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { SelectFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

interface CampaignEndInfoProps {
  isReadonly?: boolean;
}

export default function CampaignEndInfo({
  isReadonly = false,
}: CampaignEndInfoProps) {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CampaignFormData>();

  const t = useTranslations('brandMyPageCreateCampaign');

  const monthValue = watch('endDate.month');
  const dayValue = watch('endDate.day');
  const yearValue = watch('endDate.year');
  const periodValue = watch('endTime.period');
  const hourValue = watch('endTime.hour');
  const minuteValue = watch('endTime.minute');

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label={t('schedule.endDate')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="endDate.month"
            control={control}
            render={({ field }) => (
              <Select
                key={`end-month-${monthValue}`}
                size="small"
                options={months}
                value={monthValue || undefined}
                onValueChange={isReadonly ? undefined : field.onChange}
                placeholder={isReadonly ? undefined : 'Month'}
                disabled={isReadonly}
              />
            )}
          />
          <Controller
            name="endDate.day"
            control={control}
            render={({ field }) => (
              <Select
                key={`end-day-${dayValue}`}
                size="small"
                options={days}
                value={dayValue || undefined}
                onValueChange={isReadonly ? undefined : field.onChange}
                placeholder={isReadonly ? undefined : 'Day'}
                disabled={isReadonly}
              />
            )}
          />
          <Controller
            name="endDate.year"
            control={control}
            render={({ field }) => (
              <Select
                key={`end-year-${yearValue}`}
                size="small"
                options={years}
                value={yearValue || undefined}
                onValueChange={isReadonly ? undefined : field.onChange}
                placeholder={isReadonly ? undefined : 'Year'}
                disabled={isReadonly}
              />
            )}
          />
        </div>
        {!isReadonly &&
          (errors.endDate?.month ||
            errors.endDate?.day ||
            errors.endDate?.year) && (
            <p className="text-red caption3 font-[400]">
              {t(
                `errorMessage.${errors.endDate.month?.message || errors.endDate.day?.message || errors.endDate.year?.message}`
              )}
            </p>
          )}
      </SelectFormField>

      <SelectFormField label={t('schedule.endTime')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="endTime.period"
            control={control}
            render={({ field }) => (
              <Select
                key={`end-period-${periodValue}`}
                size="small"
                options={AM_PM}
                value={periodValue || undefined}
                onValueChange={isReadonly ? undefined : field.onChange}
                placeholder={isReadonly ? undefined : 'AM/PM'}
                disabled={isReadonly}
              />
            )}
          />
          <Controller
            name="endTime.hour"
            control={control}
            render={({ field }) => (
              <Select
                key={`end-hour-${hourValue}`}
                size="small"
                options={HOURS}
                value={hourValue || undefined}
                onValueChange={isReadonly ? undefined : field.onChange}
                placeholder={isReadonly ? undefined : 'Hour'}
                disabled={isReadonly}
              />
            )}
          />
          <Controller
            name="endTime.minute"
            control={control}
            render={({ field }) => (
              <Select
                key={`end-minute-${minuteValue}`}
                size="small"
                options={MINUTES}
                value={minuteValue || undefined}
                onValueChange={isReadonly ? undefined : field.onChange}
                placeholder={isReadonly ? undefined : 'Minute'}
                disabled={isReadonly}
              />
            )}
          />
        </div>
        {!isReadonly && (errors.endTime?.hour || errors.endTime?.minute) && (
          <p className="text-red caption3 font-[400]">
            {t(
              `errorMessage.${errors.endTime.hour?.message || errors.endTime.minute?.message}`
            )}
          </p>
        )}
      </SelectFormField>
    </section>
  );
}
