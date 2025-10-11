'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ApiResponseMediaPresignedUrlResponse,
  ApiResponseReviewReceiptResponse,
  ReviewContentStatus,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';
import { z } from 'zod';

import {
  FILE_ERROR_MESSAGE_KEYS,
  createMultipleMediaValidator,
} from '../../../../../hooks/useFileUploader';
import { CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE } from '../constant/content-submission';
import { useFetchCampaignReview } from './use-campaign-review';

export type ContentSubmissionsFormData = {
  formId: string;
  campaign: string;
  campaignId: number;
  campaignProductMedia: File[];
  captionAndHashtags: string;
  postUrl?: string;
  contentPlatform?: string;
  nowReviewRound?: string;
  revisionRequestedAt?: string;
  brandNote?: string;
};

export type ContentSubmissionsForm = {
  submissions: ContentSubmissionsFormData[];
};

interface CombinedReviewData {
  firstMediaUrls?: string[];
  firstCaptionWithHashtags?: string;
  secondMediaUrls?: string[];
  secondCaptionWithHashtags?: string;
  secondPostUrl?: string;
}

export const useContentSubmissions = (
  campaignId?: number,
  reviewRound?: string,
  onSuccess?: () => void
) => {
  const t = useTranslations('fileUploader');

  const {
    data: campaignList,
    isPending,
    isError,
  } = useFetchCampaignReview(campaignId as number, reviewRound as string);

  const contentSubmissionsSchema = z.object({
    submissions: z.array(
      z.object({
        formId: z.string(),
        campaign: z
          .string()
          .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CAMPAIGN),
        campaignId: z.number(),
        campaignProductMedia: createMultipleMediaValidator(
          t(FILE_ERROR_MESSAGE_KEYS.NOT_ALLOWED_FILE_TYPE),
          t(FILE_ERROR_MESSAGE_KEYS.EMPTY_FILE)
        ),
        captionAndHashtags: z
          .string()
          .min(1, CONTENT_SUBMISSION_TEXT_ERROR_MESSAGE.CAPTION_AND_HASHTAGS),
        contentPlatform: z.string().optional(),
        nowReviewRound: z.string().optional(),
        revisionRequestedAt: z.string().optional(),
        postUrl: z.string().optional(),
        brandNote: z.string().optional(),
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
      submissions: [],
    },
    mode: 'onChange',
  });

  const { fields } = useFieldArray({
    control,
    name: 'submissions',
  });

  const formData = watch();

  useEffect(() => {
    if (
      campaignList?.data?.reviewContents &&
      campaignList.data.reviewContents.length > 0
    ) {
      const newSubmissions: ContentSubmissionsFormData[] = [];

      campaignList.data.reviewContents.forEach(
        (reviewContent: ReviewContentStatus, index: number) => {
          if (reviewContent) {
            const submission: ContentSubmissionsFormData = {
              formId: `form-${campaignId}-${index}`,
              campaign: campaignList.data?.title || '',
              campaignId: campaignId || 0,
              campaignProductMedia: [],
              captionAndHashtags: reviewContent.captionWithHashtags || '',
              contentPlatform: reviewContent.contentType || '',
              nowReviewRound: reviewContent.nowReviewRound || '',
              revisionRequestedAt: reviewContent.revisionRequestedAt || '',
              postUrl: '',
              brandNote: reviewContent.brandNote || '',
            };

            newSubmissions.push(submission);
          }
        }
      );

      reset({
        submissions: newSubmissions,
      });
    }
  }, [campaignList, reset, campaignId]);

  const updateCampaign = (fieldId: string, campaign: string) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    if (fieldIndex !== -1) {
      setValue(`submissions.${fieldIndex}.campaign`, campaign);
    }
  };

  const updateCampaignProductMedia = (
    fieldId: string,
    campaignProductMedia: File[]
  ) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    console.log(fieldIndex, campaignProductMedia);
    if (fieldIndex !== -1) {
      setValue(
        `submissions.${fieldIndex}.campaignProductMedia`,
        campaignProductMedia
      );
    }
  };

  const updateCaptionAndHashtags = (
    fieldId: string,
    captionAndHashtags: string
  ) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    console.log(fieldIndex, captionAndHashtags);
    if (fieldIndex !== -1) {
      setValue(
        `submissions.${fieldIndex}.captionAndHashtags`,
        captionAndHashtags
      );
    }
  };

  const updatePostUrl = (fieldId: string, postUrl: string) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    if (fieldIndex !== -1) {
      setValue(`submissions.${fieldIndex}.postUrl`, postUrl);
    }
  };

  const getFormData = (fieldId: string) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    if (fieldIndex === -1) return null;
    return formData.submissions[fieldIndex];
  };

  const getErrors = (fieldId: string) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    if (fieldIndex === -1) return {};

    return {
      campaign: errors.submissions?.[fieldIndex]?.campaign?.message,
      campaignProductMedia:
        errors.submissions?.[fieldIndex]?.campaignProductMedia?.message,
      captionAndHashtags:
        errors.submissions?.[fieldIndex]?.captionAndHashtags?.message,
      postUrl: errors.submissions?.[fieldIndex]?.postUrl?.message,
    };
  };

  const onSubmit = async (data: ContentSubmissionsForm) => {
    try {
      for (const submission of data.submissions) {
        if (submission.campaignProductMedia.length > 0) {
          const mediaUrls = await getMediaPresignedUrls(
            submission.campaignProductMedia
          );
          const uploadedUrls = await Promise.all(
            submission.campaignProductMedia.map((file, index) =>
              uploadMediaToPresignedUrl(file, mediaUrls[index] || '')
            )
          );

          submission.campaignProductMedia = uploadedUrls.map(
            (url) => new File([], url)
          );
        }
      }

      for (const submission of data.submissions) {
        const reviewData = {
          firstMediaUrls: submission.campaignProductMedia.map(
            (file) => file.name
          ),
          firstCaptionWithHashtags: submission.captionAndHashtags,
          secondMediaUrls: submission.campaignProductMedia.map(
            (file) => file.name
          ),
          secondCaptionWithHashtags: submission.captionAndHashtags,
          firstPostUrl: submission.postUrl,
          secondPostUrl: submission.postUrl,
        };

        await submitReviewApi(
          submission.campaignId,
          reviewData,
          submission.nowReviewRound || 'FIRST'
        );
      }

      onSuccess?.();
    } catch (error) {
      console.error('Review submission failed:', error);
      throw error;
    }
  };

  const handleSubmitAll = handleSubmit(onSubmit);

  const validateAllForms = async () => {
    return await trigger();
  };

  const isAllFormsValid = isValid;

  return {
    fields,
    isPending,
    isError,
    getFormData,
    getErrors,
    reset,
    handleSubmitAll,
    validateAllForms,
    isAllFormsValid,
    updateCampaign,
    updateCampaignProductMedia,
    updateCaptionAndHashtags,
    updatePostUrl,
    trigger,
    watchData: formData,
  };
};

const getMediaPresignedUrls = async (file: File[]): Promise<string[]> => {
  const response = await apiRequest<ApiResponseMediaPresignedUrlResponse>({
    endPoint: '/api/reviews/media',
    method: 'POST',
    data: {
      mediaType: file.map((file) => file.type),
    },
  });

  if (!response.data?.mediaUrl) {
    throw new Error('Presigned URL 발급에 실패했습니다.');
  }

  return response.data?.mediaUrl;
};

const uploadMediaToPresignedUrl = async (
  file: File,
  presignedUrl: string
): Promise<string> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('미디어 업로드에 실패했습니다.');
  }
  return response.url;
};

const submitReviewApi = async (
  campaignId: number,
  data: CombinedReviewData,
  round: string
) => {
  const endPoint =
    round === 'FIRST'
      ? `/api/campaignReviews/${campaignId}/first`
      : `/api/campaignReviews/${campaignId}/second`;

  const response = await apiRequest<ApiResponseReviewReceiptResponse>({
    endPoint,
    data,
  });

  if (!response.success) {
    throw new Error('리뷰 제출에 실패했습니다.');
  }

  return response.data;
};
