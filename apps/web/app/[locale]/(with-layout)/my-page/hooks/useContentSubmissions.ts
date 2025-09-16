'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { multipleMediaValidator } from '../../../../../hooks/useFileUploader';
import { CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE } from '../constant/contentSubmission';

const contentSubmissionsSchema = z.object({
  campaign: z.string().min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CAMPAIGN),
  contentType: z
    .string()
    .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CONTENT_TYPE),
  campaignProductMedia: multipleMediaValidator,
  captionAndHashtags: z
    .string()
    .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CAPTION_AND_HASHTAGS),
});

export type ContentSubmissionsFormData = z.infer<
  typeof contentSubmissionsSchema
>;

export const useContentSubmissions = (
  campaignId?: number,
  onSuccess?: () => void
) => {
  // TODO: API에서 캠페인 목록을 가져와서 campaign 설정
  const campaignCount = 3;

  const forms = Array.from({ length: campaignCount }, (_, index) => {
    const {
      setValue,
      reset,
      formState: { errors, isValid },
      watch,
      trigger,
    } = useForm<ContentSubmissionsFormData>({
      resolver: zodResolver(contentSubmissionsSchema),
      defaultValues: {
        campaign: '',
        contentType: '',
        campaignProductMedia: [],
        captionAndHashtags: '',
      },
      mode: 'onChange',
    });

    const formData = watch();

    const updateCampaign = (campaign: string) => {
      setValue('campaign', campaign, { shouldValidate: true });
    };

    const updateContentType = (contentType: string) => {
      setValue('contentType', contentType, { shouldValidate: true });
    };

    const updateCampaignProductMedia = (campaignProductMedia: File[]) => {
      setValue('campaignProductMedia', campaignProductMedia, {
        shouldValidate: true,
      });
    };

    const updateCaptionAndHashtags = (captionAndHashtags: string) => {
      setValue('captionAndHashtags', captionAndHashtags, {
        shouldValidate: true,
      });
    };

    const compatibleFormData = {
      campaign: formData.campaign,
      contentType: formData.contentType,
      campaignProductMedia: formData.campaignProductMedia,
      captionAndHashtags: formData.captionAndHashtags,
    };

    const compatibleErrors = {
      campaign: errors.campaign?.message,
      contentType: errors.contentType?.message,
      campaignProductMedia: errors.campaignProductMedia?.message,
      captionAndHashtags: errors.captionAndHashtags?.message,
    };

    return {
      formData: compatibleFormData,
      errors: compatibleErrors,
      reset,
      updateCampaign,
      updateContentType,
      updateCampaignProductMedia,
      updateCaptionAndHashtags,
      isFormValid: isValid,
      trigger,
    };
  });

  const onSubmit = async (allFormData: ContentSubmissionsFormData[]) => {
    try {
      //TODO: 1. 모든 캠페인 제품 미디어 presigned URL 요청 및 업로드
      //TODO: 2. 모든 콘텐츠 제출 요청
      //TODO: 3. 콘텐츠 제출 API 호출
      if (campaignId) {
        //TODO: 콘텐츠 제출 API 호출
        console.log('모든 폼 데이터:', allFormData);

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('콘텐츠 제출 실패:', error);
    }
  };

  const handleSubmitAll = async () => {
    const allFormData = forms.map((form) => form.formData);
    await onSubmit(allFormData);
  };
  const resetAllForms = () => {
    forms.forEach((form) => form.reset());
  };

  const validateAllForms = async () => {
    const validationResults = await Promise.all(
      forms.map((form) => form.trigger())
    );
    return validationResults.every((result) => result);
  };

  const isAllFormsValid = forms.every((form) => form.isFormValid);

  return {
    forms,
    resetAllForms,
    handleSubmitAll,
    validateAllForms,
    isAllFormsValid,
  };
};
