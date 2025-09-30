'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { SelectFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

export default function CampaignWinnerAnnounce() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CampaignFormData>();

  const t = useTranslations('brandMyPageCreateCampaign');

  const monthValue = watch('announceDate.month');
  const dayValue = watch('announceDate.day');
  const yearValue = watch('announceDate.year');
  const periodValue = watch('announceTime.period');
  const hourValue = watch('announceTime.hour');
  const minuteValue = watch('announceTime.minute');

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label={t('schedule.announceDate')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="announceDate.month"
            control={control}
            render={({ field }) => (
              <Select
                key={`announce-month-${monthValue}`}
                size="small"
                options={months}
                value={monthValue || undefined}
                onValueChange={field.onChange}
                placeholder="Month"
              />
            )}
          />
          <Controller
            name="announceDate.day"
            control={control}
            render={({ field }) => (
              <Select
                key={`announce-day-${dayValue}`}
                size="small"
                options={days}
                value={dayValue || undefined}
                onValueChange={field.onChange}
                placeholder="Day"
              />
            )}
          />
          <Controller
            name="announceDate.year"
            control={control}
            render={({ field }) => (
              <Select
                key={`announce-year-${yearValue}`}
                size="small"
                options={years}
                value={yearValue || undefined}
                onValueChange={field.onChange}
                placeholder="Year"
              />
            )}
          />
        </div>
        {(errors.announceDate?.month ||
          errors.announceDate?.day ||
          errors.announceDate?.year) && (
          <p className="text-red caption3 font-[400]">
            {t(
              `errorMessage.${errors.announceDate.month?.message || errors.announceDate.day?.message || errors.announceDate.year?.message}`
            )}
          </p>
        )}
      </SelectFormField>

      <SelectFormField label={t('schedule.announceTime')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="announceTime.period"
            control={control}
            render={({ field }) => (
              <Select
                key={`announce-period-${periodValue}`}
                size="small"
                options={AM_PM}
                value={periodValue || undefined}
                onValueChange={field.onChange}
                placeholder="AM/PM"
              />
            )}
          />
          <Controller
            name="announceTime.hour"
            control={control}
            render={({ field }) => (
              <Select
                key={`announce-hour-${hourValue}`}
                size="small"
                options={HOURS}
                value={hourValue || undefined}
                onValueChange={field.onChange}
                placeholder="Hour"
              />
            )}
          />
          <Controller
            name="announceTime.minute"
            control={control}
            render={({ field }) => (
              <Select
                key={`announce-minute-${minuteValue}`}
                size="small"
                options={MINUTES}
                value={minuteValue || undefined}
                onValueChange={field.onChange}
                placeholder="Minute"
              />
            )}
          />
        </div>
        {(errors.announceTime?.hour || errors.announceTime?.minute) && (
          <p className="text-red caption3 font-[400]">
            {t(
              `errorMessage.${errors.announceTime.hour?.message || errors.announceTime.minute?.message}`
            )}
          </p>
        )}
      </SelectFormField>
    </section>
  );
}
