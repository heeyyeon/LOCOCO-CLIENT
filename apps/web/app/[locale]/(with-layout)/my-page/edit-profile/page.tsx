'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import CampaignListEmpty from 'components/empty/campgin-list-empty';
import LoadingSvg from 'components/loading/loading-svg';

import { Button } from '@lococo/design-system/button';

import {
  CommunityName as CreatorCommunityName,
  HomeAddress,
  PersonalDetails as CreatorPersonalDetails,
  SkinInfo as CreatorSkinInfo,
} from '../../sign-up/creator/components';
import {
  type CreatorSignupForm,
  creatorSignupSchema,
} from '../../sign-up/creator/utils/signup';
import {
  CommunityName as CustomerCommunityName,
  PersonalDetails as CustomerPersonalDetails,
  SkinInfo as CustomerSkinInfo,
} from '../../sign-up/customer/components';
import {
  type CustomerSignupForm,
  customerSignupSchema,
} from '../../sign-up/customer/utils/signup';
import { SaveFormModal } from '../@modal/(.)save-form-modal/SaveFormModal';
import { getMyPageUserRoleOrThrow } from '../apis/user-role';
import {
  EDIT_PROFILE_MESSAGE_KEYS,
  ID_ERROR_MESSAGE_KEYS,
} from '../constant/edit-profile';
import { MY_PAGE_ROLE_KEY } from '../constant/queryKey';
import {
  usePresignedUrl,
  useProfile,
  useUpdateProfile,
} from '../apis/profile-api';
import ProfilePhoto from '../components/edit-profile/profile-photo';

const toBirthFields = (birthDate?: string) => {
  const [birthYear = '', birthMonth = '', birthDay = ''] =
    birthDate?.split('-') || [];
  return { birthYear, birthMonth, birthDay };
};

export default function EditProfile() {
  const [isSaveFormModalOpen, setIsSaveFormModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageError, setProfileImageError] = useState('');
  const tValidation = useTranslations('creatorSignup.validation');
  const tButton = useTranslations('creatorSignup.button');
  const tEditProfile = useTranslations('myPage.editProfile');
  const tCommunity = useTranslations('creatorSignup.communityName');
  const locale = useLocale();

  const creatorForm = useForm<CreatorSignupForm>({
    resolver: zodResolver(creatorSignupSchema(tValidation)),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      gender: '',
      firstName: '',
      lastName: '',
      phoneCountryCode: '',
      phoneNumber: '',
      contentLanguage: '',
      country: '',
      stateRegion: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      zipCode: '',
      skinType: '',
      skinTone: '',
    },
  });

  const customerForm = useForm<CustomerSignupForm>({
    resolver: zodResolver(customerSignupSchema(tValidation)),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      gender: '',
      firstName: '',
      lastName: '',
      phoneCountryCode: '',
      phoneNumber: '',
      country: '',
      skinType: '',
      skinTone: '',
    },
  });

  const profileQuery = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const roleQuery = useQuery({
    queryKey: MY_PAGE_ROLE_KEY,
    queryFn: getMyPageUserRoleOrThrow,
  });
  const presignedUrlMutation = usePresignedUrl({
    file: profileImage || new File([], 'profile-image.jpg'),
  });
  const isCustomer = roleQuery.data === 'CUSTOMER';
  const initialized = useRef(false);

  useEffect(() => {
    const profile = profileQuery.data?.data;
    if (!profile || !roleQuery.data || initialized.current) return;

    const {
      creatorAddressInfo,
      creatorBasicInfo,
      creatorContactInfo,
      creatorFaceInfo,
    } = profile;
    const { birthYear, birthMonth, birthDay } = toBirthFields(
      creatorBasicInfo.birthDate
    );

    if (isCustomer) {
      customerForm.reset({
        id: creatorBasicInfo.creatorName || '',
        birthMonth,
        birthDay,
        birthYear,
        gender: creatorBasicInfo.gender || '',
        firstName: creatorBasicInfo.firstName || '',
        lastName: creatorBasicInfo.lastName || '',
        phoneCountryCode: creatorContactInfo.countryCode || '',
        phoneNumber: creatorContactInfo.phoneNumber || '',
        country: creatorAddressInfo.country || '',
        skinType: creatorFaceInfo.skinType || '',
        skinTone: creatorFaceInfo.skinTone || '',
      });
    } else {
      creatorForm.reset({
        id: creatorBasicInfo.creatorName || '',
        birthMonth,
        birthDay,
        birthYear,
        gender: creatorBasicInfo.gender || '',
        firstName: creatorBasicInfo.firstName || '',
        lastName: creatorBasicInfo.lastName || '',
        phoneCountryCode: creatorContactInfo.countryCode || '',
        phoneNumber: creatorContactInfo.phoneNumber || '',
        contentLanguage: profile.contentLanguage || '',
        country: creatorAddressInfo.country || '',
        stateRegion: creatorAddressInfo.stateOrProvince || '',
        city: creatorAddressInfo.cityOrTown || '',
        addressLine1: creatorAddressInfo.addressLine1 || '',
        addressLine2: creatorAddressInfo.addressLine2 || '',
        zipCode: creatorAddressInfo.postalCode || '',
        skinType: creatorFaceInfo.skinType || '',
        skinTone: creatorFaceInfo.skinTone || '',
      });
    }

    if (creatorBasicInfo.profileImageUrl) {
      fetch(creatorBasicInfo.profileImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          setProfileImage(
            new File([blob], 'profile-image.jpg', { type: blob.type })
          );
        })
        .catch((e) => {
          console.error('프로필 이미지 로드 실패:', e);
          setProfileImage(null);
        });
    }

    initialized.current = true;
  }, [
    customerForm,
    creatorForm,
    isCustomer,
    profileQuery.data?.data,
    roleQuery.data,
  ]);

  const handleIdCheckResult = useCallback(
    (checked: boolean, available: boolean) => {
      const form = isCustomer ? customerForm : creatorForm;
      if (!checked) return;
      if (available) {
        form.clearErrors('id');
        return;
      }
      form.setError('id', {
        message: tCommunity(ID_ERROR_MESSAGE_KEYS.NEGATIVE),
      });
    },
    [creatorForm, customerForm, isCustomer, tCommunity]
  );

  const handleSubmitForm = async () => {
    const form = isCustomer ? customerForm : creatorForm;
    const isValid = await form.trigger();
    if (!isValid) return;

    const formData = form.getValues();
    const profileImageUrl = profileImage
      ? await presignedUrlMutation.mutateAsync()
      : null;

    await updateProfileMutation.mutateAsync({ formData, profileImageUrl });
    setIsSaveFormModalOpen(true);
  };

  if (profileQuery.isPending || roleQuery.isPending) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }

  if (profileQuery.error || roleQuery.error) {
    return (
      <CampaignListEmpty
        emptyMessage={tEditProfile(EDIT_PROFILE_MESSAGE_KEYS.LOAD_ERROR)}
      />
    );
  }

  return (
    <>
      <SaveFormModal
        open={isSaveFormModalOpen}
        onOpenChange={setIsSaveFormModalOpen}
      />
      <div className="flex w-full flex-col items-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
        <div className="flex w-[84rem] items-center justify-between gap-[4.8rem] border border-gray-400 bg-white p-[4.8rem]">
          <div className="flex w-full flex-col items-start gap-[4.8rem]">
            <ProfilePhoto
              value={profileImage}
              onChange={setProfileImage}
              error={profileImageError}
              setProfileImageError={setProfileImageError}
            />

            {isCustomer ? (
              <>
                <CustomerCommunityName
                  form={customerForm}
                  onIdCheckResult={handleIdCheckResult}
                />
                <CustomerPersonalDetails form={customerForm} locale={locale} />
                <CustomerSkinInfo form={customerForm} />
              </>
            ) : (
              <>
                <CreatorCommunityName
                  form={creatorForm}
                  onIdCheckResult={handleIdCheckResult}
                />
                <CreatorPersonalDetails form={creatorForm} />
                <HomeAddress form={creatorForm} locale={locale} />
                <CreatorSkinInfo form={creatorForm} />
              </>
            )}
          </div>
        </div>

        <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
          <Button
            variant="outline"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={() => {
              if (isCustomer) customerForm.reset();
              else creatorForm.reset();
            }}
          >
            {tButton('back')}
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={handleSubmitForm}
          >
            {tButton('save')}
          </Button>
        </div>
      </div>
    </>
  );
}
