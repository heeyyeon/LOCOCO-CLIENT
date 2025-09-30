'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSearchModal } from 'components/address/AddressSearchModal';
import LoadingSvg from 'components/loading/loading-svg';
import { useAddressSearch } from 'hooks/useAddressSearch';
import {
  BrandProfileEditSchema,
  brandProfileEditSchema,
} from 'schema/brand-profile-edit';

import { Button } from '@lococo/design-system/button';

import AddressInfo from './component/address-info';
import BasicInfo from './component/basic-info';
import ImageSection from './component/image-section';
import { useBrandProfile } from './hooks/useBrandProfile';
import { useEditBrandProfile } from './hooks/useEditBrandProfile';

export default function Profile() {
  const methods = useForm<BrandProfileEditSchema>({
    resolver: zodResolver(brandProfileEditSchema),
    defaultValues: {
      profileImageUrl: '',
      brandName: '',
      managerName: '',
      phoneNumber: '',
      email: '',
      roadAddress: '',
      addressDetail: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = methods;

  const { data, isLoading, isError } = useBrandProfile();

  const patchProfileMutation = useEditBrandProfile();

  useEffect(() => {
    if (data) {
      reset({
        profileImageUrl: data.profileImageUrl || '',
        brandName: data.brandName || '',
        managerName: data.managerName || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        roadAddress: data.roadAddress || '',
        addressDetail: data.addressDetail || '',
      });
    }
  }, [data, reset]);

  const { isOpen, closeAddressSearch, handleComplete, openAddressSearch } =
    useAddressSearch({
      onComplete(data) {
        setValue('roadAddress', `${data.roadAddress} (${data.zonecode})`);
      },
    });

  const onSubmit = (data: BrandProfileEditSchema) => {
    console.log(data);
    patchProfileMutation.mutate(data);
  };

  const t = useTranslations('brandMyPageEditProfile');
  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center">
        <LoadingSvg />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-1 justify-center">
        <h1 className="title1 font-[700] text-pink-500">에러입니다</h1>
      </div>
    );
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 justify-center bg-gray-200 py-[6.4rem]"
      >
        <main className="flex flex-col gap-[3.2rem]">
          <AddressSearchModal
            isOpen={isOpen}
            onComplete={handleComplete}
            onClose={closeAddressSearch}
          />
          <div className="flex min-h-[99.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
            <ImageSection profileImageUrl={data?.profileImageUrl} />
            <BasicInfo
              brandNameRegister={register('brandName')}
              managerNameRegister={register('managerName')}
              phoneNumberRegister={register('phoneNumber')}
              email={data?.email}
              brandNameError={errors.brandName?.message}
              managerNameError={errors.managerName?.message}
              phoneNumberError={errors.phoneNumber?.message}
              emailError={errors.email?.message}
            />
            <AddressInfo
              companyAddressRegister={register('roadAddress')}
              companyAddressError={errors.roadAddress?.message}
              detailAddressRegister={register('addressDetail')}
              detailAddressError={errors.addressDetail?.message}
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
        </main>
      </form>
    </FormProvider>
  );
}
