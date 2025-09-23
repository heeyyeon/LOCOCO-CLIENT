'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  FILE_ERROR_MESSAGE_KEYS,
  createMultipleMediaValidator,
} from '../../../../../hooks/useFileUploader';
import { CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE } from '../constant/content-submission';
import { useFetchCampaignReview } from './use-campaign-review';

export type ContentSubmissionsFormData = {
  campaign: string;
  campaignId?: number;
  contentType: string;
  campaignProductMedia: File[];
  captionAndHashtags: string;
};

export type ContentSubmissionsForm = {
  submissions: ContentSubmissionsFormData[];
};

export const useContentSubmissions = (
  campaignId?: number,
  onSuccess?: () => void
) => {
  const t = useTranslations('fileUploader');
  const { data: campaignList } = useFetchCampaignReview();

  // API에서 받은 캠페인 개수 또는 기본값 3
  const campaignCount = campaignList?.data?.length || 0;

  const contentSubmissionsSchema = z.object({
    submissions: z.array(
      z.object({
        campaign: z
          .string()
          .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CAMPAIGN),
        campaignId: z.number().optional(),
        contentType: z
          .string()
          .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CONTENT_TYPE),
        campaignProductMedia: createMultipleMediaValidator(
          t(FILE_ERROR_MESSAGE_KEYS.NOT_ALLOWED_FILE_TYPE),
          t(FILE_ERROR_MESSAGE_KEYS.EMPTY_FILE)
        ),
        captionAndHashtags: z
          .string()
          .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CAPTION_AND_HASHTAGS),
      })
    ),
  });

  const {
    control,
    setValue,
    reset,
    formState: { errors, isValid },
    watch,
    trigger,
    handleSubmit,
  } = useForm<ContentSubmissionsForm>({
    resolver: zodResolver(contentSubmissionsSchema),
    defaultValues: {
      submissions: Array.from({ length: campaignCount }, () => ({
        campaign: '',
        campaignId: undefined,
        contentType: '',
        campaignProductMedia: [],
        captionAndHashtags: '',
      })),
    },
    mode: 'onChange',
  });

  const { fields } = useFieldArray({
    control,
    name: 'submissions',
  });

  const formData = watch();

  useEffect(() => {
    if (campaignList?.data && campaignList.data.length > 0) {
      const campaignData = campaignList.data;

      campaignData.forEach((campaign, index) => {
        if (index < campaignCount) {
          setValue(`submissions.${index}.campaign`, campaign.title, {
            shouldValidate: true,
          });
          setValue(`submissions.${index}.campaignId`, campaign.campaignId, {
            shouldValidate: true,
          });
        }
      });
    }
  }, [campaignList, setValue, campaignCount]);

  const updateCampaign = (index: number, campaign: string) => {
    setValue(`submissions.${index}.campaign`, campaign, {
      shouldValidate: true,
    });
  };

  const updateContentType = (index: number, contentType: string) => {
    setValue(`submissions.${index}.contentType`, contentType, {
      shouldValidate: true,
    });
  };

  const updateCampaignProductMedia = (
    index: number,
    campaignProductMedia: File[]
  ) => {
    setValue(
      `submissions.${index}.campaignProductMedia`,
      campaignProductMedia,
      {
        shouldValidate: true,
      }
    );
  };

  const updateCaptionAndHashtags = (
    index: number,
    captionAndHashtags: string
  ) => {
    setValue(`submissions.${index}.captionAndHashtags`, captionAndHashtags, {
      shouldValidate: true,
    });
  };

  const getFormData = (index: number) => ({
    campaign: formData.submissions[index]?.campaign || '',
    campaignId: formData.submissions[index]?.campaignId,
    contentType: formData.submissions[index]?.contentType || '',
    campaignProductMedia:
      formData.submissions[index]?.campaignProductMedia || [],
    captionAndHashtags: formData.submissions[index]?.captionAndHashtags || '',
  });

  const getErrors = (index: number) => ({
    campaign: errors.submissions?.[index]?.campaign?.message,
    contentType: errors.submissions?.[index]?.contentType?.message,
    campaignProductMedia:
      errors.submissions?.[index]?.campaignProductMedia?.message,
    captionAndHashtags:
      errors.submissions?.[index]?.captionAndHashtags?.message,
  });

  const onSubmit = async (data: ContentSubmissionsForm) => {
    try {
      //TODO: 1. 모든 캠페인 제품 미디어 presigned URL 요청 및 업로드
      //TODO: 2. 모든 콘텐츠 제출 요청
      //TODO: 3. 콘텐츠 제출 API 호출
      if (campaignId && data.submissions) {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('콘텐츠 제출 실패:', error);
    }
  };

  const handleSubmitAll = handleSubmit(onSubmit);

  const resetAllForms = () => {
    reset();
  };

  const validateAllForms = async () => {
    return await trigger();
  };

  const isAllFormsValid = isValid;

  return {
    fields,
    getFormData,
    getErrors,
    resetAllForms,
    handleSubmitAll,
    validateAllForms,
    isAllFormsValid,
    updateCampaign,
    updateContentType,
    updateCampaignProductMedia,
    updateCaptionAndHashtags,
  };
};
