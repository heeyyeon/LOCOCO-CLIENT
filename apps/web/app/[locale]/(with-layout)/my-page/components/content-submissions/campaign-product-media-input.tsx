import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import DragDropArea from 'components/drag-drop/DargDropArea';

import { ErrorNotice } from '@lococo/design-system/error-notice';

import { ContentSubmissionsFormData } from '../../hooks/use-content-submissions';

interface CampaignProductMediaInputProps {
  formData: ContentSubmissionsFormData;
  errors: string | undefined;
  updateCampaignProductMedia: (
    fieldId: string,
    campaignProductMedia: File[]
  ) => void;
  fieldId: string;
  title?: string;
}

export default function CampaignProductMediaInput({
  formData,
  errors,
  title,
  updateCampaignProductMedia,
  fieldId,
}: CampaignProductMediaInputProps) {
  const t = useTranslations(
    'myPage.contentSubmissions.campaignProductMediaInput'
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  // 파일들을 이미지와 비디오로 분리
  const separateFiles = (files: File[]) => {
    const images: File[] = [];
    const videos: File[] = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        images.push(file);
      } else if (file.type.startsWith('video/')) {
        videos.push(file);
      }
    });

    setImageFiles(images);
    setVideoFiles(videos);
  };

  React.useEffect(() => {
    separateFiles(formData.campaignProductMedia);
  }, [formData.campaignProductMedia]);

  const handleVideoFilesChange = (files: File[]) => {
    const currentVideos = formData.campaignProductMedia.filter((file) =>
      file.type.startsWith('video/')
    );
    const allFiles = [...files, ...currentVideos];
    updateCampaignProductMedia(fieldId, allFiles);
  };

  const handleImageFilesChange = (files: File[]) => {
    const currentImages = formData.campaignProductMedia.filter((file) =>
      file.type.startsWith('image/')
    );
    const allFiles = [...currentImages, ...files];
    updateCampaignProductMedia(fieldId, allFiles);
  };
  const inputFileId = `campaign-product-media-upload-area-${fieldId}`;

  const triggerFileInput = () => {
    document.getElementById(inputFileId)?.click();
  };

  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.4rem]">
        {title && <p className="title2 text-gray-800">{title}</p>}
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
        imageFiles={imageFiles}
        videoFiles={videoFiles}
        handleImageFilesChange={handleImageFilesChange}
        handleVideoFilesChange={handleVideoFilesChange}
        maxFiles={12}
      />
      {errors && <ErrorNotice message={errors} />}
    </section>
  );
}
