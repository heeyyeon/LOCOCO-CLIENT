'use client';

import React from 'react';

import { Button } from '@lococo/design-system/button';

import { useContentSubmissions } from '../../hooks/use-content-submissions';
import CampaignProductMediaInput from './campaign-product-media-input';
import CampaignSelect from './campaign-select';
import ContentTypeSelect from './content-type-select';
import HashtagsInput from './hashtags-input';

interface ContentSubmissionsFormProps {
  formIndex: number;
  formData: {
    campaign: string;
    contentType: string;
    campaignProductMedia: File[];
    captionAndHashtags: string;
  };
  errors: {
    campaign?: string;
    contentType?: string;
    campaignProductMedia?: string;
    captionAndHashtags?: string;
  };
  updateCampaign: (index: number, campaign: string) => void;
  updateContentType: (index: number, contentType: string) => void;
  updateCampaignProductMedia: (
    index: number,
    campaignProductMedia: File[]
  ) => void;
  updateCaptionAndHashtags: (index: number, captionAndHashtags: string) => void;
}

export default function ContentSubmissions() {
  const {
    fields,
    getFormData,
    getErrors,
    handleSubmitAll,
    validateAllForms,
    isAllFormsValid,
    resetAllForms,
    updateCampaign,
    updateContentType,
    updateCampaignProductMedia,
    updateCaptionAndHashtags,
  } = useContentSubmissions();

  const handleSubmitForm = async () => {
    const isValid = await validateAllForms();
    if (isAllFormsValid && isValid) {
      handleSubmitAll();
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
      {fields.map((field, index) => (
        <ContentSubmissionsForm
          key={field.id}
          formIndex={index}
          formData={getFormData(index)}
          errors={getErrors(index)}
          updateCampaign={updateCampaign}
          updateContentType={updateContentType}
          updateCampaignProductMedia={updateCampaignProductMedia}
          updateCaptionAndHashtags={updateCaptionAndHashtags}
        />
      ))}
      {fields.length === 0 && (
        <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
          리뷰할 데이터가 없습니다.
        </div>
      )}
      {fields.length > 0 && (
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
      )}
    </div>
  );
}

function ContentSubmissionsForm({
  formIndex,
  formData,
  errors,
  updateCampaign,
  updateContentType,
  updateCampaignProductMedia,
  updateCaptionAndHashtags,
}: ContentSubmissionsFormProps) {
  return (
    <div className="flex w-[84rem] items-center justify-between gap-[4.8rem] border border-gray-400 bg-white p-[4.8rem]">
      <div className="flex w-full flex-col items-start gap-[4.8rem]">
        <CampaignSelect
          formData={formData}
          errors={errors.campaign}
          updateCampaign={(campaign) => updateCampaign(formIndex, campaign)}
        />

        <ContentTypeSelect
          formData={formData}
          errors={errors.contentType}
          updateContentType={(contentType) =>
            updateContentType(formIndex, contentType)
          }
        />
        <CampaignProductMediaInput
          formData={formData}
          errors={errors.campaignProductMedia}
          updateCampaignProductMedia={(campaignProductMedia) =>
            updateCampaignProductMedia(formIndex, campaignProductMedia)
          }
        />
        <HashtagsInput
          formData={formData}
          errors={errors.captionAndHashtags}
          updateCaptionAndHashtags={(captionAndHashtags) =>
            updateCaptionAndHashtags(formIndex, captionAndHashtags)
          }
        />
      </div>
    </div>
  );
}
