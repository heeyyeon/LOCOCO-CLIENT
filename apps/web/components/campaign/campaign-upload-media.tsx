'use client';

import { useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { FormSection } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';

import { DragDropArea } from './drag-drop';

export default function CampaignUploadMedia() {
  const { watch, setValue } = useFormContext<CampaignFormData>();

  const thumbnailFiles = watch('thumbnailFiles') || [];
  const detailFiles = watch('detailFiles') || [];

  const t = useTranslations('brandMyPageCreateCampaign.media');

  return (
    <div className="flex w-full flex-col gap-[4.8rem]">
      <FormSection
        title={t('thumbnailTitle')}
        description={t('thumbnailDescription')}
      >
        <DragDropArea
          files={thumbnailFiles}
          onFilesChange={(files) => setValue('thumbnailFiles', files)}
          maxFiles={5}
        />
      </FormSection>

      <FormSection
        title={t('detailTitle')}
        description={t('detailDescription')}
      >
        <DragDropArea
          files={detailFiles}
          onFilesChange={(files) => setValue('detailFiles', files)}
          maxFiles={15}
        />
      </FormSection>
    </div>
  );
}
