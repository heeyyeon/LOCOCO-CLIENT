import { ChangeEvent, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@lococo/design-system/button';
import { SvgAvatar } from '@lococo/icons';
import { SvgCamera } from '@lococo/icons';

import { ALLOWED_IMAGE_TYPES } from '../../../../../../hooks/useFileUploader';

interface ProfilePhotoProps {
  value?: File;
  onChange: (profileImage: File | undefined) => void;
  error?: string;
}

export default function ProfilePhoto({
  value,
  onChange,
  error,
}: ProfilePhotoProps) {
  const t = useTranslations('myPage.editProfile.profilePhoto');
  const [profileImage, setProfileImage] = useState<string>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    console.log(ALLOWED_IMAGE_TYPES.includes(selectedFile?.type || ''));
    if (selectedFile && ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
      onChange(selectedFile);
    }
    e.target.value = '';
  };

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setProfileImage(url);

      return () => {
        URL.revokeObjectURL(url || '');
      };
    } else {
      setProfileImage(undefined);
    }
  }, [value]);

  return (
    <section className="flex w-full flex-col gap-[2.5rem]">
      <p className="inter-title2 text-gray-800">{t('title')}</p>
      <div className="flex w-full flex-col items-center gap-[3.2rem]">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="profile photo"
            width={72}
            height={72}
            className="rounded-full"
          />
        ) : (
          <SvgAvatar size={72} className="rounded-full" />
        )}
        <div className="flex flex-col items-center gap-[0.8rem]">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-photo-input"
          />
          <Button
            variant="outline"
            color="secondary"
            size="sm"
            iconLeft={<SvgCamera size={24} />}
            className="h-auto whitespace-nowrap rounded-[0.8rem] px-[1.6rem] py-[0.8rem]"
            onClick={() =>
              document.getElementById('profile-photo-input')?.click()
            }
          >
            {t('changePhoto')}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </section>
  );
}
