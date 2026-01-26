'use client';

import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import {
  UploadedFile,
  useFileUpload,
} from 'app/[locale]/(with-layout)/brand/hooks/useFileUpload';
import DragDropArea from 'components/drag-drop/DargDropArea';
import { FormSection } from 'components/forms';
import { CampaignFormData } from 'schema/create-campaign-schema';

interface CampaignUploadMediaProps {
  isReadonly?: boolean;
}

export default function CampaignUploadMedia({
  isReadonly = false,
}: CampaignUploadMediaProps) {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('role') === 'admin';

  
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<CampaignFormData>();

  const { uploadImageFiles, isUploading } = useFileUpload(isAdmin);

  const [thumbnailPreviewFiles, setThumbnailPreviewFiles] = useState<File[]>(
    []
  );
  const [detailPreviewFiles, setDetailPreviewFiles] = useState<File[]>([]);

  // 서버에서 임시 저장된 캠페인에 대해 불러온 이미지 URL
  const [existingThumbnailUrls, setExistingThumbnailUrls] = useState<string[]>(
    []
  );
  const [existingDetailUrls, setExistingDetailUrls] = useState<string[]>([]);

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
    if (currentThumbnailUrls.length > 0 && thumbnailPreviewFiles.length === 0) {
      setExistingThumbnailUrls(currentThumbnailUrls.map((img) => img.url));
    }
  }, [currentThumbnailUrls, thumbnailPreviewFiles.length]);

  useEffect(() => {
    if (currentDetailUrls.length > 0 && detailPreviewFiles.length === 0) {
      setExistingDetailUrls(currentDetailUrls.map((img) => img.url));
    }
  }, [currentDetailUrls, detailPreviewFiles.length]);

  const handleThumbnailFilesChange = (files: File[]) => {
    if (isReadonly) return;

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
    if (isReadonly) return;

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
          files={thumbnailPreviewFiles}
          handleFilesChange={handleThumbnailFilesChange}
          existingImageUrls={existingThumbnailUrls}
          fieldId="thumbnailFiles"
          maxFiles={5}
          className={
            isUploading || isReadonly ? 'pointer-events-none opacity-50' : ''
          }
        />
        {!isReadonly && errors.thumbnailFiles && (
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
          files={detailPreviewFiles}
          handleFilesChange={handleDetailFilesChange}
          existingImageUrls={existingDetailUrls}
          fieldId="detailFiles"
          maxFiles={15}
          className={
            isUploading || isReadonly ? 'pointer-events-none opacity-50' : ''
          }
        />
        {!isReadonly && errors.detailFiles && (
          <p className="text-red caption3 font-[400]">
            {t(`errorMessage.${errors.detailFiles.message}`)}
          </p>
        )}
      </FormSection>
    </div>
  );
}
