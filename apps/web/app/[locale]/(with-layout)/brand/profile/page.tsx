'use client';

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

  const onSubmit = (data: BrandProfileEditSchema) => {
    console.log(data);
  };

  const t = useTranslations('brandMyPageEditProfile');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 justify-center bg-gray-200 py-[6.4rem]"
    >
      <div className="flex flex-col gap-[3.2rem]">
        <AddressSearchModal
          isOpen={isOpen}
          onComplete={handleComplete}
          onClose={closeAddressSearch}
        />
        <div className="flex min-h-[99.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
          <ImageSection />
          <BasicInfo
            brandNameRegister={register('brandName')}
            managerNameRegister={register('managerName')}
            phoneNumberRegister={register('phoneNumber')}
            emailRegister={register('email')}
            countryCodeValue={watch('countryCode')}
            brandNameError={errors.brandName?.message}
            managerNameError={errors.managerName?.message}
            phoneNumberError={errors.phoneNumber?.message}
            emailError={errors.email?.message}
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
            type="button"
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
