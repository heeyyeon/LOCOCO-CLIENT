import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { FormSection } from 'components/forms';

import { Button } from '@lococo/design-system/button';
import { SvgAvatarCircle, SvgCamera } from '@lococo/icons';

import { useFileUpload } from '../../hooks/useFileUpload';

interface ImageSectionProps {
  profileImageUrl?: string;
}

export default function ImageSection({
  profileImageUrl: initialImageUrl,
}: ImageSectionProps) {
  const t = useTranslations('brandMyPageEditProfile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();
  const { uploadImageFiles, isUploading } = useFileUpload();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);

    uploadImageFiles({
      files: [file],
      onSuccess: (uploadedFiles) => {
        if (uploadedFiles[0]) {
          const uploadedUrl = uploadedFiles[0].url;
          setValue('profileImageUrl', uploadedUrl);
          setPreviewUrl(uploadedUrl);
          URL.revokeObjectURL(tempImageUrl);
        }
      },
      onError: (error) => {
        alert(`이미지 업로드 실패: ${error}`);
        URL.revokeObjectURL(tempImageUrl);
        setPreviewUrl(initialImageUrl || null);
      },
    });
  };

  const displayUrl = previewUrl || initialImageUrl;

  return (
    <FormSection title={t('profileImage.profileImageFormTitle')}>
      <div className="mb-[2.6rem] flex flex-col items-center gap-[3.2rem] pb-[5.5rem]">
        {displayUrl ? (
          <div className="relative h-[7.2rem] w-[7.2rem]">
            <Image
              src={displayUrl}
              alt={t('profileImage.profileImage')}
              fill
              className="rounded-[5rem] object-cover"
            />
          </div>
        ) : (
          <SvgAvatarCircle size={72} />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
          disabled={isUploading}
        />
        <Button
          type="button"
          color="secondary"
          variant="outline"
          size="sm"
          rounded="sm"
          className="flex gap-[0.8rem] px-[1.6rem] py-[0.8rem]"
          onClick={handleImageUploadClick}
          disabled={isUploading}
        >
          <SvgCamera size={24} />
          <span className="body2 font-[700]">
            {isUploading
              ? '업로드 중...'
              : t('profileImage.profileImageEditBtn')}
          </span>
        </Button>
      </div>
    </FormSection>
  );
}
