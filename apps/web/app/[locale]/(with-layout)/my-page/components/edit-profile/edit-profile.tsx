'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@lococo/design-system/button';

import {
  CommunityName,
  HomeAddress,
  PersonalDetails,
  SkinInfo,
} from '../../../../(with-layout)/sign-up/creator/components';
import { type CreatorSignupForm } from '../../../../(with-layout)/sign-up/creator/utils/signup';
import { SaveFormModal } from '../../@modal/(.)save-form-modal/SaveFormModal';
import {
  useCheckIdAvailability,
  useProfile,
  useUpdateProfile,
} from '../../hooks/use-profile-api';
import ProfilePhoto from './profile-photo';

export default function EditProfile() {
  const [isSaveFormModalOpen, setIsSaveFormModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const form = useForm<CreatorSignupForm>({
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
    mode: 'onChange',
  });

  const profileQuery = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const checkIdMutation = useCheckIdAvailability();

  useEffect(() => {
    if (profileQuery.data?.data) {
      const profileData = profileQuery.data.data;
      const {
        creatorAddressInfo,
        creatorBasicInfo,
        creatorContactInfo,
        creatorFaceInfo,
      } = profileData;
      // firstName에서 first/last name 분리
      const fullName = creatorBasicInfo.creatorName || '';
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      form.reset({
        id: creatorBasicInfo.creatorName || '',
        birthMonth: '', // API에 없음
        birthDay: '', // API에 없음
        birthYear: '', // API에 없음
        gender: '', // API에 없음
        firstName: firstName,
        lastName: lastName,
        phoneCountryCode: creatorContactInfo.countryCode || '',
        phoneNumber: creatorContactInfo.phoneNumber || '',
        contentLanguage: profileData.contentLanguage || '',
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
        fetch(creatorBasicInfo.profileImageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], 'profile-image.jpg', {
              type: blob.type,
            });
            setProfileImage(file);
          })
          .catch((error) => {
            console.error('프로필 이미지 로드 실패:', error);
            setProfileImage(null);
          });
      }
    }
  }, [profileQuery.data, form]);

  const handleSubmitForm = async () => {
    const isValid = await form.trigger();

    if (form.formState.isValid && isValid) {
      const formData = form.getValues();

      // 프로필 이미지 업로드 (있는 경우)
      let profileImageUrl = null;
      if (profileImage) {
        // TODO: 프로필 이미지 presigned URL 요청 및 업로드
        // profileImageUrl = await uploadProfileImage(profileImage);
      }

      try {
        // 프로필 업데이트 API 호출
        await updateProfileMutation.mutateAsync({ formData, profileImageUrl });

        setIsSaveFormModalOpen(true);
      } catch (error) {
        console.error('프로필 수정 실패:', error);
      }
    }
  };

  const handleCheckAvailability = async () => {
    const id = form.getValues('id');
    if (!id.trim()) {
      form.setError('id', { message: 'ID is required' });
      return;
    }

    try {
      const isAvailable = await checkIdMutation.mutateAsync(id);
      if (isAvailable) {
        console.log('ID 사용 가능:', id);
        // TODO: 성공 메시지 표시
      } else {
        form.setError('id', { message: '이미 사용 중인 ID입니다.' });
      }
    } catch (error) {
      console.error('ID 중복 체크 실패:', error);
      form.setError('id', { message: 'ID 중복 체크에 실패했습니다.' });
    }
  };

  // 초기 로딩 상태
  if (profileQuery.isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
        <div className="text-lg text-gray-600">
          프로필 데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  // 에러 상태
  if (profileQuery.error) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
        <div className="text-lg text-red-600">
          {profileQuery.error.message ||
            '프로필 데이터를 불러오는데 실패했습니다.'}
        </div>
        <Button
          variant="filled"
          color="primary"
          size="lg"
          onClick={() => profileQuery.refetch()}
        >
          다시 시도
        </Button>
      </div>
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
              error={undefined}
            />

            <CommunityName
              form={form}
              handleCheckAvailability={handleCheckAvailability}
            />

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
            Cancel
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={handleSubmitForm}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
