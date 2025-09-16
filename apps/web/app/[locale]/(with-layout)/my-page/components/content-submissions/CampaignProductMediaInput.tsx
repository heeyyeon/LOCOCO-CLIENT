import React, { useState } from 'react';

import { DragDropArea } from 'components/drag-drop/DragDropArea';

import { ErrorNotice } from '@lococo/design-system/error-notice';

import { ContentSubmissionsFormData } from '../../types/contentSubmissions';

interface CampaignProductMediaInputProps {
  formData: ContentSubmissionsFormData;
  errors: { campaignProductMedia: string | undefined };
  updateCampaignProductMedia: (campaignProductMedia: File[]) => void;
}

export default function CampaignProductMediaInput({
  formData,
  errors,
  updateCampaignProductMedia,
}: CampaignProductMediaInputProps) {
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

  const handleImageFilesChange = (files: File[]) => {
    const allFiles = [...files, ...videoFiles];
    updateCampaignProductMedia(allFiles);
  };

  const handleVideoFilesChange = (files: File[]) => {
    const allFiles = [...imageFiles, ...files];
    updateCampaignProductMedia(allFiles);
  };
  const triggerFileInput = () => {
    document.getElementById('campaign-product-media-upload-area')?.click();
  };

  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <p className="inter-title2 text-gray-800">Campaign Product Media</p>
        <div className="flex items-center gap-[0.8rem]">
          <p className="inter-body4 text-gray-500">
            Drag and drop or click to upload the file.
          </p>
          <button
            type="button"
            className="inter-body4 cursor-pointer border-b border-pink-500 bg-transparent text-pink-500"
            onClick={triggerFileInput}
          >
            Select File
          </button>
        </div>
      </div>

      <DragDropArea
        imageFiles={imageFiles}
        videoFiles={videoFiles}
        handleImageFilesChange={handleImageFilesChange}
        handleVideoFilesChange={handleVideoFilesChange}
        maxFiles={12}
        inputFileId="campaign-product-media-upload-area"
      />
      {errors.campaignProductMedia && (
        <ErrorNotice message={errors.campaignProductMedia} />
      )}
    </section>
  );
}
