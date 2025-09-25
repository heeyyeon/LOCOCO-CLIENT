import { Controller, useFormContext } from 'react-hook-form';

import { SelectFormField, TextFormField } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';

export default function CampaignInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CampaignFormData>();

  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <TextFormField
        label="캠페인 제목"
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
            label="캠페인 진행 언어"
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
            label="캠페인 종류"
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
            label="카테고리"
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
        label="모집 예정 크리에이터 수"
        required
        placeholder="숫자를 입력하세요"
        register={register('creatorCount')}
        error={errors.creatorCount?.message}
      />
    </section>
  );
}
