import React from 'react';

import { Button } from '@lococo/design-system/button';

import { useProfile } from '../../hooks/useProfile';
import BasicInformation from './BasicInformation';
import HomeAddress from './HomeAddress';
import PersonalInformation from './PersonalInformation';
import ProfilePhoto from './ProfilePhoto';
import Skin from './Skin';

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
  const handleSubmitForm = async () => {
    const isValid = await trigger();
    console.log(formData);
    if (isFormValid && isValid) {
      handleSubmit();
      console.log('submit');
    }
  };

  return (
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
  );
}
