'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { SelectFormField, TextFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';

export default function CampaignInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CampaignFormData>();

  const t = useTranslations('brandMyPageCreateCampaign');

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <TextFormField
        label={t('pageTitle')}
        required
        placeholder="text"
        register={register('title')}
        error={errors.title?.message}
      />

      <Controller
        name="language"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectFormField
            label={t('basicInfo.language')}
            required
            options={[
              { label: '영어', value: 'EN' },
              { label: '스페인어', value: 'ES' },
            ]}
            value={field.value}
            onValueChange={field.onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectFormField
            label={t('basicInfo.type')}
            required
            options={[
              { label: 'EXCLUSIVE', value: 'EXCLUSIVE' },
              { label: 'GIVEAWAY', value: 'GIVEAWAY' },
              { label: 'CONTENTS', value: 'CONTENTS' },
            ]}
            value={field.value}
            onValueChange={field.onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectFormField
            label={t('basicInfo.category')}
            required
            options={[
              { label: 'SKINCARE', value: 'SKINCARE' },
              { label: 'SUNCARE', value: 'SUNCARE' },
              { label: 'MAKEUP', value: 'MAKEUP' },
            ]}
            value={field.value}
            onValueChange={field.onChange}
            error={error?.message}
          />
        )}
      />

      <TextFormField
        label={t('basicInfo.creatorCount')}
        required
        placeholder={t('basicInfo.creatorCountPlaceholder')}
        register={register('creatorCount')}
        error={errors.creatorCount?.message}
      />
    </section>
  );
}
