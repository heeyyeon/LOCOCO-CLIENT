'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { SelectFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

interface CampaignDueDateProps {
  isReadonly?: boolean;
}

export default function CampaignDueDate({
  isReadonly = false,
}: CampaignDueDateProps) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CampaignFormData>();
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  const t = useTranslations('brandMyPageCreateCampaign');

  const monthValue = watch('dueDate.month');
  const dayValue = watch('dueDate.day');
  const yearValue = watch('dueDate.year');
  const periodValue = watch('dueTime.period');
  const hourValue = watch('dueTime.hour');
  const minuteValue = watch('dueTime.minute');

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label={t('schedule.dueDate')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="dueDate.month"
            control={control}
            render={({ field }) => (
              <Select
                key={`month-${monthValue}`}
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
            name="dueDate.day"
            control={control}
            render={({ field }) => (
              <Select
                key={`day-${dayValue}`}
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
            name="dueDate.year"
            control={control}
            render={({ field }) => (
              <Select
                key={`year-${yearValue}`}
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
          (errors.dueDate?.month ||
            errors.dueDate?.day ||
            errors.dueDate?.year) && (
            <p className="text-red caption3 font-[400]">
              {t(
                `errorMessage.${errors.dueDate.month?.message || errors.dueDate.day?.message || errors.dueDate.year?.message}`
              )}
            </p>
          )}
      </SelectFormField>

      <SelectFormField label={t('schedule.dueTime')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="dueTime.period"
            control={control}
            render={({ field }) => (
              <Select
                key={`period-${periodValue}`}
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
            name="dueTime.hour"
            control={control}
            render={({ field }) => (
              <Select
                key={`hour-${hourValue}`}
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
            name="dueTime.minute"
            control={control}
            render={({ field }) => (
              <Select
                key={`minute-${minuteValue}`}
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
        {!isReadonly && (errors.dueTime?.hour || errors.dueTime?.minute) && (
          <p className="text-red caption3 font-[400]">
            {t(
              `errorMessage.${errors.dueTime.hour?.message || errors.dueTime.minute?.message}`
            )}
          </p>
        )}
      </SelectFormField>
    </section>
  );
}
