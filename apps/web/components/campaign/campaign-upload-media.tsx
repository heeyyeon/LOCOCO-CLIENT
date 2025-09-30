'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import {
  UploadedFile,
  useFileUpload,
} from 'app/[locale]/(with-layout)/brand/hooks/useFileUpload';
import DragDropArea from 'components/drag-drop/DargDropArea';
import { FormSection } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';

export default function CampaignUploadMedia() {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<CampaignFormData>();

  const { uploadImageFiles, isUploading } = useFileUpload();

  // 미리보기용 File 객체들 (DragDropArea에서 사용할 보여주기 용)
  const [thumbnailPreviewFiles, setThumbnailPreviewFiles] = useState<File[]>(
    []
  );
  const [detailPreviewFiles, setDetailPreviewFiles] = useState<File[]>([]);

  // 현재 폼에 저장된 URL들(서버로 보낼 실제 값들)
  const currentThumbnailUrls = watch('thumbnailFiles') || [];
  const currentDetailUrls = watch('detailFiles') || [];

  const t = useTranslations('brandMyPageCreateCampaign');

  const handleRemoveExistingThumbnail = (index: number) => {
    const updated = currentThumbnailUrls.filter((_, i) => i !== index);
    setValue('thumbnailFiles', updated);
    trigger('thumbnailFiles');
  };

  const handleRemoveExistingDetail = (index: number) => {
    const updated = currentDetailUrls.filter((_, i) => i !== index);
    setValue('detailFiles', updated);
    trigger('detailFiles');
  };

  const handleThumbnailFilesChange = (files: File[]) => {
    setThumbnailPreviewFiles(files);

    // 파일 추가
    if (files.length > thumbnailPreviewFiles.length) {
      const newFiles = files.slice(thumbnailPreviewFiles.length);

      uploadImageFiles({
        files: newFiles,
        onSuccess: (uploadedFiles: UploadedFile[]) => {
          // CampaignImageRequest 형태로 객체 생성
          const newImageObjects = uploadedFiles.map((file, index) => ({
            url: file.url,
            displayOrder: currentThumbnailUrls.length + index,
            imageType: 'THUMBNAIL' as const,
          }));

          // 기존 썸네일 객체들과 새로운 객체들 합치기
          const existingThumbnails = currentThumbnailUrls || [];
          const updatedThumbnails = [...existingThumbnails, ...newImageObjects];

          // 폼에 CampaignImageRequest 배열 저장
          setValue('thumbnailFiles', updatedThumbnails);

          trigger('thumbnailFiles');
        },
        onError: () => {
          setThumbnailPreviewFiles(thumbnailPreviewFiles);
        },
      });
    } else if (files.length < thumbnailPreviewFiles.length) {
      // 파일 삭제
      const deletedCount = thumbnailPreviewFiles.length - files.length;
      const updatedThumbnails = currentThumbnailUrls.slice(0, -deletedCount);

      setValue('thumbnailFiles', updatedThumbnails);
      trigger('thumbnailFiles');
    }
  };

  const handleDetailFilesChange = (files: File[]) => {
    setDetailPreviewFiles(files);

    // 파일 추가
    if (files.length > detailPreviewFiles.length) {
      const newFiles = files.slice(detailPreviewFiles.length);

      uploadImageFiles({
        files: newFiles,
        onSuccess: (uploadedFiles: UploadedFile[]) => {
          // CampaignImageRequest 형태로 객체 생성
          const base = currentDetailUrls.length;
          const newImageObjects = uploadedFiles.map((file, index) => ({
            url: file.url,
            displayOrder: base + index,
            imageType: 'DETAIL' as const,
          }));

          const existingDetails = currentDetailUrls || [];
          const updatedDetails = [...existingDetails, ...newImageObjects];

          setValue('detailFiles', updatedDetails);
          trigger('detailFiles');
        },
        onError: () => {
          setDetailPreviewFiles(detailPreviewFiles);
        },
      });
    } else if (files.length < detailPreviewFiles.length) {
      // 파일 삭제
      const deletedCount = detailPreviewFiles.length - files.length;
      const updatedDetails = currentDetailUrls.slice(0, -deletedCount);

      setValue('detailFiles', updatedDetails);
      trigger('detailFiles');
    }
  };

  return (
    <div className="flex w-full flex-col gap-[4.8rem]">
      <FormSection
        title={t('media.thumbnailTitle')}
        description={t('media.thumbnailDescription')}
      >
        <DragDropArea
          imageFiles={thumbnailPreviewFiles}
          handleImageFilesChange={handleThumbnailFilesChange}
          onRemoveExistingImage={handleRemoveExistingThumbnail}
          existingImageUrls={currentThumbnailUrls.map((img) => img.url)}
          handleVideoFilesChange={() => {}}
          maxFiles={5}
          className={isUploading ? 'pointer-events-none opacity-50' : ''}
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
          imageFiles={detailPreviewFiles}
          handleImageFilesChange={handleDetailFilesChange}
          onRemoveExistingImage={handleRemoveExistingDetail}
          existingImageUrls={currentDetailUrls.map((img) => img.url)}
          handleVideoFilesChange={() => {}}
          maxFiles={15}
          className={isUploading ? 'pointer-events-none opacity-50' : ''}
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
