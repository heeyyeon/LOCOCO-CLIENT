'use client';

import React from 'react';

import { Button } from '@lococo/design-system/button';

import { useContentSubmissions } from '../../hooks/useContentSubmissions';
import CampaignProductMediaInput from './CampaignProductMediaInput';
import CampaignSelect from './CampaignSelect';
import ContentTypeSelect from './ContentTypeSelect';
import HashtagsInput from './HashtagsInput';

interface ContentSubmissionsFormProps {
  formIndex: number;
  formData: any;
  errors: any;
  updateCampaign: (campaign: string) => void;
  updateContentType: (contentType: string) => void;
  updateCampaignProductMedia: (campaignProductMedia: File[]) => void;
  updateCaptionAndHashtags: (captionAndHashtags: string) => void;
}

export default function ContentSubmissions() {
  const {
    forms,
    handleSubmitAll,
    validateAllForms,
    isAllFormsValid,
    resetAllForms,
  } = useContentSubmissions();

  const handleSubmitForm = async () => {
    const isValid = await validateAllForms();
    if (isAllFormsValid && isValid) {
      handleSubmitAll();
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
      {forms.map((form, index) => (
        <ContentSubmissionsForm
          key={index}
          formIndex={index}
          formData={form.formData}
          errors={form.errors}
          updateCampaign={form.updateCampaign}
          updateContentType={form.updateContentType}
          updateCampaignProductMedia={form.updateCampaignProductMedia}
          updateCaptionAndHashtags={form.updateCaptionAndHashtags}
        />
      ))}
      <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
        <Button
          variant="outline"
          color="primary"
          size="lg"
          className="w-[41.2rem]"
          onClick={resetAllForms}
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

const ContentSubmissionsForm = ({
  formData,
  errors,
  updateCampaign,
  updateContentType,
  updateCampaignProductMedia,
  updateCaptionAndHashtags,
}: ContentSubmissionsFormProps) => {
  return (
    <div className="flex w-[84rem] items-center justify-between gap-[4.8rem] border border-gray-400 bg-white p-[4.8rem]">
      <div className="flex w-full flex-col items-start gap-[4.8rem]">
        <CampaignSelect
          formData={formData}
          errors={errors}
          updateCampaign={updateCampaign}
        />

        <ContentTypeSelect
          formData={formData}
          errors={errors}
          updateContentType={updateContentType}
        />
        <CampaignProductMediaInput
          formData={formData}
          errors={errors}
          updateCampaignProductMedia={updateCampaignProductMedia}
        />
        <HashtagsInput
          formData={formData}
          errors={errors}
          updateCaptionAndHashtags={updateCaptionAndHashtags}
        />
      </div>
    </div>
  );
};
