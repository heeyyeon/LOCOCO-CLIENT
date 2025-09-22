'use client';

import React, { useState } from 'react';

import { Button } from '@lococo/design-system/button';

import { SaveFormModal } from '../@modal/(.)save-form-modal/SaveFormModal';
import BasicInformation from '../components/edit-profile/basic-information';
import HomeAddress from '../components/edit-profile/home-address';
import PersonalInformation from '../components/edit-profile/personal-information';
import ProfilePhoto from '../components/edit-profile/profile-photo';
import Skin from '../components/edit-profile/skin';
import { useProfile } from '../hooks/use-profile';

export default function EditProfile() {
  const {
    formData,
    errors,
    reset,
    updateId,
    updateBirth,
    updateGender,
    updateFirstName,
    updateLastName,
    updateEmail,
    updatePhone,
    updateContentLanguage,
    updateCountry,
    updateState,
    updateCity,
    updateAddressLine1,
    updateAddressLine2,
    updateZip,
    updateProfileImage,
    handleSubmit,
    isFormValid,
    isIdChecked,
    idCheckError,
    updateSkinType,
    updateSkinTone,
    checkIdAvailability,
    trigger,
  } = useProfile();
  const [isSaveFormModalOpen, setIsSaveFormModalOpen] = useState(false);
  const handleSubmitForm = async () => {
    const isValid = await trigger();

    if (isFormValid && isValid) {
      handleSubmit();
      setIsSaveFormModalOpen(true);
    }
  };

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
              value={formData.profileImage}
              onChange={updateProfileImage}
              error={errors.profileImage}
            />
            <BasicInformation
              errors={errors.id}
              value={formData.id}
              onChange={updateId}
              isIdChecked={isIdChecked}
              idCheckError={idCheckError}
              onCheckAvailability={checkIdAvailability}
            />
            <PersonalInformation
              formData={formData}
              errors={errors}
              updateBirth={updateBirth}
              updateGender={updateGender}
              updateFirstName={updateFirstName}
              updateLastName={updateLastName}
              updatePhone={updatePhone}
              updateContentLanguage={updateContentLanguage}
              updateEmail={updateEmail}
            />

            <HomeAddress
              formData={formData}
              errors={errors}
              updateCountry={updateCountry}
              updateState={updateState}
              updateCity={updateCity}
              updateAddressLine1={updateAddressLine1}
              updateAddressLine2={updateAddressLine2}
              updateZip={updateZip}
            />
            <Skin
              formData={formData}
              errors={errors}
              updateSkinType={updateSkinType}
              updateSkinTone={updateSkinTone}
            />
          </div>
        </div>
        <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
          <Button
            variant="outline"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={() => reset()}
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
