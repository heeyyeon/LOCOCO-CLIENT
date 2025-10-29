'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewContentStatus } from '@typescript-swagger/data-contracts';

import { useFetchCampaignReview } from '../apis/campaign-review-api';
import {
  getMediaPresignedUrls,
  submitReviewApi,
  uploadMediaToPresignedUrl,
} from '../apis/content-submissions-api';
import { createContentSubmissionsSchema } from '../schemas/content-submissions-schema';
import {
  ContentSubmissionsForm,
  ContentSubmissionsFormData,
} from '../types/content-submissions';

export const useContentSubmissions = (
  campaignId?: number,
  reviewRound?: string
) => {
  const t = useTranslations('fileUploader');

  const {
    data: campaignList,
    isPending,
    isError,
  } = useFetchCampaignReview(campaignId as number, reviewRound as string);

  const emptyFormT = useTranslations('myPage.contentSubmissions.emptyForm');
  const contentSubmissionsSchema = createContentSubmissionsSchema(
    t,
    emptyFormT
  );

  const {
    control,
    setValue,
    reset,
    formState: { errors },
    watch,
    trigger,
    setError,
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
    if (fieldIndex !== -1) {
      setValue(
        `submissions.${fieldIndex}.campaignProductMedia`,
        campaignProductMedia
      );
      setError(`submissions.${fieldIndex}.campaignProductMedia`, {
        message: '',
      });
    }
  };

  const updateCaptionAndHashtags = (
    fieldId: string,
    captionAndHashtags: string
  ) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    if (fieldIndex !== -1) {
      setValue(
        `submissions.${fieldIndex}.captionAndHashtags`,
        captionAndHashtags
      );
      setError(`submissions.${fieldIndex}.captionAndHashtags`, {
        message: '',
      });
    }
  };

  const updatePostUrl = (fieldId: string, postUrl: string) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);
    if (fieldIndex !== -1) {
      setValue(`submissions.${fieldIndex}.postUrl`, postUrl);
      setError(`submissions.${fieldIndex}.postUrl`, {
        message: '',
      });
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

  const onSubmit = async (
    data: ContentSubmissionsForm,
    onSuccess: () => void
  ) => {
    console.log('data', data);
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
      if (data.submissions[0] && data.submissions[1]) {
        const reviewData = {
          firstMediaUrls: data.submissions[0].campaignProductMedia.map(
            (file) => file.name
          ),
          firstCaptionWithHashtags: data.submissions[0].captionAndHashtags,
          secondMediaUrls: data.submissions[1].campaignProductMedia.map(
            (file) => file.name
          ),
          secondCaptionWithHashtags: data.submissions[1].captionAndHashtags,
          firstPostUrl: data.submissions[0].postUrl,
          secondPostUrl: data.submissions[1].postUrl,
        };

        await submitReviewApi(
          data.submissions[0].campaignId || 0,
          reviewData,
          data.submissions[0].nowReviewRound || 'FIRST'
        );

        onSuccess();
      } else {
        throw new Error('리뷰 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('Review submission failed:', error);
      throw error;
    }
  };

  return {
    fields,
    isPending,
    isError,
    getFormData,
    getErrors,
    reset,
    handleSubmit: onSubmit,
    updateCampaign,
    updateCampaignProductMedia,
    updateCaptionAndHashtags,
    updatePostUrl,
    trigger,
    watchData: formData,
  };
};
