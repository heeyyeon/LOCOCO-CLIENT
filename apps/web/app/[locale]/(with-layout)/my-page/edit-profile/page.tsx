'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import CampaignListEmpty from 'components/empty/campgin-list-empty';
import LoadingSvg from 'components/loading/loading-svg';

import { Button } from '@lococo/design-system/button';

import {
  CommunityName,
  HomeAddress,
  PersonalDetails,
  SkinInfo,
} from '../../sign-up/creator/components';
import {
  type CreatorSignupForm,
  creatorSignupSchema,
} from '../../sign-up/creator/utils/signup';
import { SaveFormModal } from '../@modal/(.)save-form-modal/SaveFormModal';
import ProfilePhoto from '../components/edit-profile/profile-photo';
import {
  usePresignedUrl,
  useProfile,
  useUpdateProfile,
} from '../hooks/use-profile-api';

export default function EditProfile() {
  const [isSaveFormModalOpen, setIsSaveFormModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageError, setProfileImageError] = useState<string>('');
  const t = useTranslations('creatorSignup.validation');

  const form = useForm<CreatorSignupForm>({
    resolver: zodResolver(creatorSignupSchema(t)),
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

  const profileQuery = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const presignedUrlMutation = usePresignedUrl({
    file: profileImage || new File([], 'profile-image.jpg'),
  });

  const initialized = React.useRef(false);

  useEffect(() => {
    const profile = profileQuery.data?.data;
    if (!profile || initialized.current) return;

    const {
      creatorAddressInfo,
      creatorBasicInfo,
      creatorContactInfo,
      creatorFaceInfo,
    } = profile;

    const fullName = creatorBasicInfo.creatorName || '';
    const nameParts = fullName.trim().split(' ');
    const firstName = creatorBasicInfo.firstName || nameParts[0] || '';
    const lastName =
      creatorBasicInfo.lastName || nameParts.slice(1).join(' ') || '';

    const fullBirthDate = creatorBasicInfo.birthDate || '';
    const [birthYear = '', birthMonth = '', birthDay = ''] =
      fullBirthDate.split('-');

    form.reset({
      id: creatorBasicInfo.creatorName || '',
      birthMonth,
      birthDay,
      birthYear,
      gender: creatorBasicInfo.gender || '',
      firstName,
      lastName,
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
    if (creatorBasicInfo.profileImageUrl) {
      (async () => {
        try {
          const res = await fetch(creatorBasicInfo.profileImageUrl);
          const blob = await res.blob();
          const file = new File([blob], 'profile-image.jpg', {
            type: blob.type,
          });
          setProfileImage(file);
        } catch (e) {
          console.error('프로필 이미지 로드 실패:', e);
          setProfileImage(null);
        }
      })();
    }

    initialized.current = true;
  }, [profileQuery.data?.data, form]);

  const handleIdCheckResult = (checked: boolean, available: boolean) => {
    if (checked) {
      if (available) {
        // ID 사용 가능 - 에러 제거
        form.clearErrors('id');
      } else {
        // ID 사용 불가 - 에러 설정
        form.setError('id', { message: '이미 사용 중인 ID입니다.' });
      }
    }
  };

  const handleSubmitForm = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const formData = form.getValues();
      const profileImageUrl = profileImage
        ? await presignedUrlMutation.mutateAsync()
        : null;
      await updateProfileMutation.mutateAsync({ formData, profileImageUrl });
      setIsSaveFormModalOpen(true);
    }
  };

  if (profileQuery.isPending) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }

  if (profileQuery.error) {
    return <CampaignListEmpty emptyMessage={t('error')} />;
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

            <CommunityName form={form} onIdCheckResult={handleIdCheckResult} />

            <PersonalDetails form={form} />

            <HomeAddress form={form} locale="ko" />

            <SkinInfo form={form} />
          </div>
        </div>
        <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
          <Button
            variant="outline"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={() => form.reset()}
          >
            {t('formButton.cancel')}
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={handleSubmitForm}
          >
            {t('formButton.save')}
          </Button>
        </div>
      </div>
    </>
  );
}
