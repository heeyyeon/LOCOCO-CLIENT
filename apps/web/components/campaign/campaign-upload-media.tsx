'use client';

import { useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { FormSection } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';

import { DragDropArea } from './drag-drop';

export default function CampaignUploadMedia() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CampaignFormData>();

  const thumbnailFiles = watch('thumbnailFiles') || [];
  const detailFiles = watch('detailFiles') || [];

  const t = useTranslations('brandMyPageCreateCampaign');

  return (
    <div className="flex w-full flex-col gap-[4.8rem]">
      <FormSection
        title={t('media.thumbnailTitle')}
        description={t('media.thumbnailDescription')}
      >
        <DragDropArea
          files={thumbnailFiles}
          onFilesChange={(files) => setValue('thumbnailFiles', files)}
          maxFiles={5}
        />
        {errors.thumbnailFiles && (
          <p className="text-red caption3 font-[400]">
            {t(`errorMessage.${errors.thumbnailFiles.message}`)}
          </p>
        )}
      </FormSection>

      <FormSection
        title={t('media.detailTitle')}
        description={t('media.detailDescription')}
      >
        <DragDropArea
          files={detailFiles}
          onFilesChange={(files) => setValue('detailFiles', files)}
          maxFiles={15}
        />
        {errors.detailFiles && (
          <p className="text-red caption3 font-[400]">
            {t(`errorMessage.${errors.detailFiles.message}`)}
          </p>
        )}
      </FormSection>
    </div>
  );
}
