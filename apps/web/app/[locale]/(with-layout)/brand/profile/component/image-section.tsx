import React, { Ref } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { FormSection } from 'components/forms';

import { Button } from '@lococo/design-system/button';
import { SvgAvatarCircle, SvgCamera } from '@lococo/icons';

interface ImageSectionProps {
  profileImageUrl: string | null;
  fileInputRef: Ref<HTMLInputElement>;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUploadClick: () => void;
}

export default function ImageSection({
  profileImageUrl,
  fileInputRef,
  handleImageChange,
  handleImageUploadClick,
}: ImageSectionProps) {
  const t = useTranslations('brandMyPageEditProfile');

  return (
    <FormSection title={t('profileImage.profileImageFormTitle')}>
      <div className="bt-[2.6rem] flex flex-col items-center gap-[3.2rem] pb-[5.5rem]">
        {profileImageUrl ? (
          <div className="relative h-[7.2rem] w-[7.2rem]">
            <Image
              src={profileImageUrl}
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
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          rounded="sm"
          className="flex gap-[0.8rem] px-[1.6rem] py-[0.8rem]"
          onClick={handleImageUploadClick}
        >
          <SvgCamera size={24} />
          <span className="body2 font-[700]">
            {t('profileImage.profileImageEditBtn')}
          </span>
        </Button>
      </div>
    </FormSection>
  );
}
