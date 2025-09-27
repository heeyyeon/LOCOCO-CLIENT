'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSearchModal } from 'components/address/AddressSearchModal';
import { useAddressSearch } from 'hooks/useAddressSearch';
import {
  BrandProfileEditSchema,
  brandProfileEditSchema,
} from 'schema/brand-profile-edit';

import { Button } from '@lococo/design-system/button';

import AddressInfo from './component/address-info';
import BasicInfo from './component/basic-info';
import ImageSection from './component/image-section';

export default function Profile() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BrandProfileEditSchema>({
    resolver: zodResolver(brandProfileEditSchema),
  });

  const { isOpen, closeAddressSearch, handleComplete, openAddressSearch } =
    useAddressSearch({
      onComplete(data) {
        setValue('companyAddress', `${data.roadAddress}${data.zonecode}`);
      },
    });

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
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = (data: BrandProfileEditSchema) => {
    console.log(data);
  };

  const t = useTranslations('brandMyPageEditProfile');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[3.2rem] bg-gray-100 px-[9.6rem] py-[6.4rem]">
        <AddressSearchModal
          isOpen={isOpen}
          onComplete={handleComplete}
          onClose={closeAddressSearch}
        />
        <div className="flex min-h-[99.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
          <ImageSection
            profileImageUrl={profileImageUrl}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
            handleImageUploadClick={handleImageUploadClick}
          />
          <BasicInfo
            brandNameRegister={register('brandName')}
            managerNameRegister={register('brandName')}
            phoneNumberRegister={register('phoneNumber')}
            emailRegister={register('email')}
            countryCodeValue={watch('countryCode')}
            onCountryCodeChange={(value) => setValue('countryCode', value)}
          />
          <AddressInfo
            companyAddressRegister={register('companyAddress')}
            companyAddressError={errors.companyAddress?.message}
            detailAddressRegister={register('detailAddress')}
            detailAddressError={errors.detailAddress?.message}
            onAddressSearch={openAddressSearch}
          />
        </div>
        <div className="flex gap-[1.6rem]">
          <Button
            color="secondary"
            variant="outline"
            size="lg"
            className="w-[41.2rem]"
          >
            {t('formButton.cancel')}
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="filled"
            size="lg"
            className="w-[41.2rem]"
          >
            {t('formButton.save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
