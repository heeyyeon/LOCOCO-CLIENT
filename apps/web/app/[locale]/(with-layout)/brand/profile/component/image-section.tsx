import React, { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { FormSection } from 'components/forms';

import { Button } from '@lococo/design-system/button';
import { SvgAvatarCircle, SvgCamera } from '@lococo/icons';

export default function ImageSection() {
  const t = useTranslations('brandMyPageEditProfile');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택 가능합니다.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 업로드 중 표시용 임시 미리보기
    const tempImageUrl = URL.createObjectURL(file);
    setProfileImageUrl(tempImageUrl);
  };
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
