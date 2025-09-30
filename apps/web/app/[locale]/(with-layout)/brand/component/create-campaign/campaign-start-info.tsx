import { Controller, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { SelectFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

export default function CampaignStartInfo() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CampaignFormData>();

  const t = useTranslations('brandMyPageCreateCampaign');

  const monthValue = watch('startDate.month');
  const dayValue = watch('startDate.day');
  const yearValue = watch('startDate.year');
  const periodValue = watch('startTime.period');
  const hourValue = watch('startTime.hour');
  const minuteValue = watch('startTime.minute');

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label={t('schedule.startDate')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="startDate.month"
            control={control}
            render={({ field }) => (
              <Select
                key={`start-month-${monthValue}`}
                size="small"
                options={months}
                value={monthValue || undefined}
                onValueChange={field.onChange}
                placeholder="Month"
              />
            )}
          />
          <Controller
            name="startDate.day"
            control={control}
            render={({ field }) => (
              <Select
                key={`start-day-${dayValue}`}
                size="small"
                options={days}
                value={dayValue || undefined}
                onValueChange={field.onChange}
                placeholder="Day"
              />
            )}
          />
          <Controller
            name="startDate.year"
            control={control}
            render={({ field }) => (
              <Select
                key={`start-year-${yearValue}`}
                size="small"
                options={years}
                value={yearValue || undefined}
                onValueChange={field.onChange}
                placeholder="Year"
              />
            )}
          />
        </div>
        {(errors.startDate?.month ||
          errors.startDate?.day ||
          errors.startDate?.year) && (
          <p className="text-red caption3 font-[400]">
            {t(
              `errorMessage.${errors.startDate.month?.message || errors.startDate.day?.message || errors.startDate.year?.message}`
            )}
          </p>
        )}
      </SelectFormField>

      <SelectFormField label={t('schedule.startTime')} required>
        <div className="flex gap-[2.4rem]">
          <Controller
            name="startTime.period"
            control={control}
            render={({ field }) => (
              <Select
                key={`start-period-${periodValue}`}
                size="small"
                options={AM_PM}
                value={periodValue || undefined}
                onValueChange={field.onChange}
                placeholder="AM/PM"
              />
            )}
          />
          <Controller
            name="startTime.hour"
            control={control}
            render={({ field }) => (
              <Select
                key={`start-hour-${hourValue}`}
                size="small"
                options={HOURS}
                value={hourValue || undefined}
                onValueChange={field.onChange}
                placeholder="Hour"
              />
            )}
          />
          <Controller
            name="startTime.minute"
            control={control}
            render={({ field }) => (
              <Select
                key={`start-minute-${minuteValue}`}
                size="small"
                options={MINUTES}
                value={minuteValue || undefined}
                onValueChange={field.onChange}
                placeholder="Minute"
              />
            )}
          />
        </div>
        {(errors.startTime?.hour || errors.startTime?.minute) && (
          <p className="text-red caption3 font-[400]">
            {t(
              `errorMessage.${errors.startTime.hour?.message || errors.startTime.minute?.message}`
            )}
          </p>
        )}
      </SelectFormField>
    </section>
  );
}
