'use client';

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import CampaignListEmpty from 'components/empty/campgin-list-empty';
import LoadingSvg from 'components/loading/loading-svg';

import { Button } from '@lococo/design-system/button';

import { SaveSubmitModal } from '../@modal/(.)save-submit-modal/SaveSubmitModal';
import BrandNote from '../components/content-submissions/brand-note';
import CampaignProductMediaInput from '../components/content-submissions/campaign-product-media-input';
import CampaignSelect from '../components/content-submissions/campaign-select';
import ContentTypeSelect from '../components/content-submissions/content-type-select';
import HashtagsInput from '../components/content-submissions/hashtags-input';
import SubmitContentUrl from '../components/content-submissions/submit-content-url';
import Empty from '../components/empty/Empty';
import {
  ContentSubmissionsFormData,
  useContentSubmissions,
} from '../hooks/use-content-submissions';

interface ContentSubmissionsFormProps {
  formData: ContentSubmissionsFormData;
  errors: {
    campaign?: string;
    campaignProductMedia?: string;
    captionAndHashtags?: string;
    postUrl?: string;
  };
  updateCampaignProductMedia: (
    fieldId: string,
    campaignProductMedia: File[]
  ) => void;
  updateCaptionAndHashtags: (
    fieldId: string,
    captionAndHashtags: string
  ) => void;
  updatePostUrl: (fieldId: string, postUrl: string) => void;
  updateCampaign: (fieldId: string, campaign: string) => void;
  index: number;
  fieldId: string;
}

export default function ContentSubmissions() {
  const t = useTranslations('myPage.contentSubmissions');
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');
  const round = searchParams.get('round');
  const [isSaveSubmitModalOpen, setIsSaveSubmitModalOpen] = useState(false);
  const {
    fields,
    getFormData,
    getErrors,
    handleSubmit,
    updateCampaign,
    updateCampaignProductMedia,
    updateCaptionAndHashtags,
    updatePostUrl,
    isPending,
    isError,
    trigger,
    watchData,
  } = useContentSubmissions(Number(campaignId), round as string);
  const router = useRouter();
  const handleSubmitForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(watchData, () => setIsSaveSubmitModalOpen(true));
    }
  };
  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center justify-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
        <LoadingSvg />
      </div>
    );
  }

  if (isError) {
    return <CampaignListEmpty emptyMessage={t('error')} />;
  }

  return (
    <>
      {
        <SaveSubmitModal
          open={isSaveSubmitModalOpen}
          onOpenChange={setIsSaveSubmitModalOpen}
          final={false}
        />
      }
      <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center gap-[8.4rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
        {fields.length > 0 ? (
          fields.map((field) => {
            const fieldIndex = fields.findIndex((f) => f.id === field.id);
            const submissionData = watchData.submissions[fieldIndex];
            if (!submissionData) return null;

            const formDataForComponent = getFormData(field.id);
            const errors = getErrors(field.id);
            if (!formDataForComponent) return null;
            return (
              <div key={field.id} className="flex w-full flex-col gap-[1.6rem]">
                <ContentSubmissionsForm
                  formData={formDataForComponent}
                  errors={errors}
                  updateCampaign={updateCampaign}
                  updateCampaignProductMedia={updateCampaignProductMedia}
                  updateCaptionAndHashtags={updateCaptionAndHashtags}
                  updatePostUrl={updatePostUrl}
                  index={fieldIndex}
                  fieldId={field.id}
                />

                {submissionData.brandNote && (
                  <BrandNote
                    round={round as string}
                    text={submissionData.brandNote}
                  />
                )}
              </div>
            );
          })
        ) : (
          <Empty translationKey="myPage.contentSubmissions.empty" />
        )}
        {fields.length > 0 && (
          <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
            <Button
              variant="outline"
              color="primary"
              size="lg"
              className="w-[41.2rem]"
              onClick={() => router.back()}
            >
              Back
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
    </>
  );
}

function ContentSubmissionsForm({
  formData,
  errors,
  updateCampaignProductMedia,
  updateCaptionAndHashtags,
  updatePostUrl,
  updateCampaign,
  index,
  fieldId,
}: ContentSubmissionsFormProps) {
  return (
    <>
      <div className="flex w-[84rem] items-center justify-between gap-[4.8rem] border border-gray-400 bg-white p-[4.8rem]">
        <div className="flex w-full flex-col items-start gap-[4.8rem]">
          <CampaignSelect
            formData={formData}
            errors={errors.campaign}
            updateCampaign={updateCampaign}
            index={index}
            fieldId={fieldId}
          />
          <ContentTypeSelect formData={formData} errors={undefined} />
          <CampaignProductMediaInput
            formData={formData}
            updateCampaignProductMedia={updateCampaignProductMedia}
            fieldId={fieldId}
            errors={errors.campaignProductMedia}
          />
          <HashtagsInput
            formData={formData}
            errors={errors.captionAndHashtags}
            updateCaptionAndHashtags={updateCaptionAndHashtags}
            fieldId={fieldId}
          />

          {formData.nowReviewRound === 'SECOND' && (
            <SubmitContentUrl
              formData={formData}
              errors={errors.postUrl}
              updatePostUrl={updatePostUrl}
              fieldId={fieldId}
            />
          )}
        </div>
      </div>
    </>
  );
}
