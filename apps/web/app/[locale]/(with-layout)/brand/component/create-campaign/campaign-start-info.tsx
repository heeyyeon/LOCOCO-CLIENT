import { useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { SelectFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { RHFSelect } from './rhf-Select';

export default function CampaignStartInfo() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  const {
    formState: { errors },
  } = useFormContext<CampaignFormData>();

  const t = useTranslations('brandMyPageCreateCampaign.schedule');
  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <SelectFormField label={t('startDate')} required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="startDate.month"
            options={months}
            placeholder="Month"
            size="small"
          />
          <RHFSelect
            name="startDate.day"
            options={days}
            placeholder="Day"
            size="small"
          />
          <RHFSelect
            name="startDate.year"
            options={years}
            placeholder="Year"
            size="small"
          />
        </div>
        {(errors.startDate?.month ||
          errors.startDate?.day ||
          errors.startDate?.year) && (
          <p className="text-red caption3 font-[400]">
            {t('errorMessage.campaignStartDay')}
          </p>
        )}
      </SelectFormField>

      <SelectFormField label={t('startTime')} required>
        <div className="flex gap-[2.4rem]">
          <RHFSelect
            name="startTime.period"
            options={AM_PM}
            placeholder="AM/PM"
            size="small"
          />
          <RHFSelect
            name="startTime.hour"
            options={HOURS}
            placeholder="Hour"
            size="small"
          />
          <RHFSelect
            name="startTime.minute"
            options={MINUTES}
            placeholder="Minute"
            size="small"
          />
        </div>
        {(errors.startTime?.period ||
          errors.startTime?.hour ||
          errors.startTime?.minute) && (
          <p className="text-red caption3 font-[400]">
            {t('errorMessage.campaignStartDay')}
          </p>
        )}
      </SelectFormField>
    </section>
  );
}
