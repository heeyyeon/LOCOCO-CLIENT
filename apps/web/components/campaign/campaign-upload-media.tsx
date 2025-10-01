'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const [thumbnailPreviewFiles, setThumbnailPreviewFiles] = useState<File[]>(
    []
  );
  const [detailPreviewFiles, setDetailPreviewFiles] = useState<File[]>([]);

  // 서버에서 임시 저장된 캠페인에 대해 불러온 이미지 URL
  const [existingThumbnailUrls, setExistingThumbnailUrls] = useState<string[]>(
    []
  );
  const [existingDetailUrls, setExistingDetailUrls] = useState<string[]>([]);
  const [isThumbnailInitialized, setIsThumbnailInitialized] = useState(false);
  const [isDetailInitialized, setIsDetailInitialized] = useState(false);

  const thumbnailFiles = watch('thumbnailFiles');
  const detailFiles = watch('detailFiles');

  const currentThumbnailUrls = useMemo(
    () => thumbnailFiles || [],
    [thumbnailFiles]
  );

  const currentDetailUrls = useMemo(() => detailFiles || [], [detailFiles]);

  const t = useTranslations('brandMyPageCreateCampaign');

  // 초기 로드 시 서버에서 제공받은 저장된만 existing으로 설정
  useEffect(() => {
    if (!isThumbnailInitialized && currentThumbnailUrls.length > 0) {
      setExistingThumbnailUrls(currentThumbnailUrls.map((img) => img.url));
      setIsThumbnailInitialized(true);
    }
  }, [currentThumbnailUrls, isThumbnailInitialized]);

  useEffect(() => {
    if (!isDetailInitialized && currentDetailUrls.length > 0) {
      setExistingDetailUrls(currentDetailUrls.map((img) => img.url));
      setIsDetailInitialized(true);
    }
  }, [currentDetailUrls, isDetailInitialized]);

  const handleRemoveExistingThumbnail = (index: number) => {
    const updatedExisting = existingThumbnailUrls.filter((_, i) => i !== index);
    setExistingThumbnailUrls(updatedExisting);

    const updated = currentThumbnailUrls.filter((_, i) => i !== index);
    setValue('thumbnailFiles', updated);
    trigger('thumbnailFiles');
  };

  const handleRemoveExistingDetail = (index: number) => {
    const updatedExisting = existingDetailUrls.filter((_, i) => i !== index);
    setExistingDetailUrls(updatedExisting);

    const updated = currentDetailUrls.filter((_, i) => i !== index);
    setValue('detailFiles', updated);
    trigger('detailFiles');
  };

  const handleThumbnailFilesChange = (files: File[]) => {
    setThumbnailPreviewFiles(files);

    if (files.length > thumbnailPreviewFiles.length) {
      const newFiles = files.slice(thumbnailPreviewFiles.length);

      uploadImageFiles({
        files: newFiles,
        onSuccess: (uploadedFiles: UploadedFile[]) => {
          const newImageObjects = uploadedFiles.map((file, index) => ({
            url: file.url,
            displayOrder: currentThumbnailUrls.length + index,
            imageType: 'THUMBNAIL' as const,
          }));

          const existingThumbnails = currentThumbnailUrls || [];
          const updatedThumbnails = [...existingThumbnails, ...newImageObjects];

          setValue('thumbnailFiles', updatedThumbnails);
          trigger('thumbnailFiles');
        },
        onError: () => {
          setThumbnailPreviewFiles(thumbnailPreviewFiles);
        },
      });
    } else if (files.length < thumbnailPreviewFiles.length) {
      const deletedCount = thumbnailPreviewFiles.length - files.length;
      const updatedThumbnails = currentThumbnailUrls.slice(
        existingThumbnailUrls.length,
        -deletedCount || undefined
      );

      setValue('thumbnailFiles', [
        ...currentThumbnailUrls.slice(0, existingThumbnailUrls.length),
        ...updatedThumbnails,
      ]);
      trigger('thumbnailFiles');
    }
  };

  const handleDetailFilesChange = (files: File[]) => {
    setDetailPreviewFiles(files);

    if (files.length > detailPreviewFiles.length) {
      const newFiles = files.slice(detailPreviewFiles.length);

      uploadImageFiles({
        files: newFiles,
        onSuccess: (uploadedFiles: UploadedFile[]) => {
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
      const deletedCount = detailPreviewFiles.length - files.length;
      const updatedDetails = currentDetailUrls.slice(
        existingDetailUrls.length,
        -deletedCount || undefined
      );

      setValue('detailFiles', [
        ...currentDetailUrls.slice(0, existingDetailUrls.length),
        ...updatedDetails,
      ]);
      trigger('detailFiles');
    }
  };

  return (
    <div className="flex w-full flex-col gap-[4.8rem]">
      <FormSection
        title={t('media.thumbnailTitle')}
        description={t('media.thumbnailDescription')}
        required
      >
        <DragDropArea
          imageFiles={thumbnailPreviewFiles}
          handleImageFilesChange={handleThumbnailFilesChange}
          onRemoveExistingImage={handleRemoveExistingThumbnail}
          existingImageUrls={existingThumbnailUrls}
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
        required
      >
        <DragDropArea
          imageFiles={detailPreviewFiles}
          handleImageFilesChange={handleDetailFilesChange}
          onRemoveExistingImage={handleRemoveExistingDetail}
          existingImageUrls={existingDetailUrls}
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
