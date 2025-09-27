'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSearchModal } from 'components/address/AddressSearchModal';
import { FormSection, SelectFormField, TextFormField } from 'components/forms';
import { useAddressSearch } from 'hooks/useAddressSearch';
import {
  BrandProfileEditSchema,
  brandProfileEditSchema,
} from 'schema/brand-profile-edit';
import { countryPhoneCodeOptions } from 'utils';

import { Button } from '@lococo/design-system/button';
import { Input } from '@lococo/design-system/input';
import { Select } from '@lococo/design-system/select';
import { SvgAvatarCircle, SvgCamera } from '@lococo/icons';

export default function Profile() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const countryCodes = countryPhoneCodeOptions();

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
          <FormSection title={t('basicInfo.basicInfoTitle')}>
            <TextFormField
              label={t('basicInfo.brandNameFieldLabel')}
              required
              register={register('brandName')}
            />
            <TextFormField
              label={t('basicInfo.managerNameFieldLabel')}
              required
              register={register('managerName')}
            />
            <SelectFormField
              label={t('basicInfo.phoneNumberFieldLabel')}
              required
            >
              <div className="flex w-full items-center justify-start gap-[2.4rem]">
                <Select
                  placeholder={'+xx'}
                  options={countryCodes}
                  size="small"
                  value={watch('countryCode')}
                  onValueChange={(value) => setValue('countryCode', value)}
                />
                <Input
                  className="h-[4rem] w-[26.4rem]"
                  {...register('phoneNumber')}
                />
              </div>
            </SelectFormField>
            <TextFormField
              label="Email"
              required
              placeholder="jessica.anderson@gmail.com"
              register={register('email')}
            />
            <div className="relative">
              <p className="caption3 absolute left-[24rem] text-gray-500">
                {t('basicInfo.emailNotice')}
              </p>
            </div>
          </FormSection>
          <FormSection
            title={t('addressInfo.addressInfoTitle')}
            description={t('addressInfo.addressInfoDescription')}
          >
            <TextFormField
              label={t('addressInfo.companyAddressLabel')}
              required
              placeholder={t('addressInfo.companyAddressPlaceholder')}
              register={register('companyAddress')}
              error={errors.companyAddress?.message}
              showSearchIcon
              handleClickSearch={openAddressSearch}
            />

            <TextFormField
              label={t('addressInfo.detailAddressLabel')}
              required
              placeholder={t('addressInfo.detailAddressPlaceholder')}
              register={register('detailAddress')}
              error={errors.detailAddress?.message}
            />
          </FormSection>
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
