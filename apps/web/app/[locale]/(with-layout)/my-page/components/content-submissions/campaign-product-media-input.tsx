import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import DragDropArea from 'components/drag-drop/DargDropArea';

import { ErrorNotice } from '@lococo/design-system/error-notice';

import { ContentSubmissionsFormData } from '../../types/content-submissions';

interface CampaignProductMediaInputProps {
  formData: ContentSubmissionsFormData;
  updateCampaignProductMedia: (
    fieldId: string,
    campaignProductMedia: File[]
  ) => void;
  fieldId: string;
  errors: string | undefined;
}

export default function CampaignProductMediaInput({
  formData,
  updateCampaignProductMedia,
  fieldId,
  errors,
}: CampaignProductMediaInputProps) {
  const t = useTranslations(
    'myPage.contentSubmissions.campaignProductMediaInput'
  );
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFiles(formData.campaignProductMedia);
  }, [formData.campaignProductMedia]);

  const handleFilesChange = (files: File[]) => {
    updateCampaignProductMedia(fieldId, files);
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(fieldId);
    fileInput?.click();
  };

  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <p className="title2 text-gray-800">{t('title')}</p>
        <div className="flex items-center gap-[0.8rem]">
          <p className="body4 text-gray-500">{t('description')}</p>
          <button
            type="button"
            className="body4 cursor-pointer border-b border-pink-500 bg-transparent text-pink-500"
            onClick={triggerFileInput}
          >
            {t('selectFile')}
          </button>
        </div>
      </div>

      <DragDropArea
        files={files}
        handleFilesChange={handleFilesChange}
        maxFiles={12}
        onTriggerFileInput={triggerFileInput}
        fieldId={fieldId}
      />
      {errors && <ErrorNotice message={errors} />}
    </section>
  );
}
