'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { SelectFormField } from 'components/forms';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { RHFSelect } from './rhf-Select';

export default function CampaignWinnerAnnounce() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();

  const t = useTranslations('brandMyPageCreateCampaign.schedule');

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label={t('announceDate')} required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="announceDate.month"
            options={months}
            placeholder="Month"
            size="small"
          />
          <RHFSelect
            name="announceDate.day"
            options={days}
            placeholder="Day"
            size="small"
          />
          <RHFSelect
            name="announceDate.year"
            options={years}
            placeholder="Year"
            size="small"
          />
        </div>
      </SelectFormField>

      <SelectFormField label={t('announceTime')} required>
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
            placeholder="Hour"
            size="small"
          />
          <RHFSelect
            name="announceTime.minute"
            options={MINUTES}
            placeholder="Minute"
            size="small"
          />
        </div>
      </SelectFormField>
    </section>
  );
}
