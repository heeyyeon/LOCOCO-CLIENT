'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { REVIEW_TEXT } from 'constants/review';
import { ReviewRequest } from 'swagger-codegen/data-contracts';
import type { ReviewFormData } from 'types/review';
import { z } from 'zod';

import { getMediaPresignedUrl, uploadFiles } from './presignedUrlApi';
import { usePostReview } from './reviewApi';
import { mediaFilesValidator } from './useFileUploader';

const createReviewSchema = (minMessage: string, maxMessage: string) =>
  z.object({
    rating: z.number().min(1, 'rating is required').max(5),
    positiveComment: z
      .string()
      .min(REVIEW_TEXT.MIN_LENGTH, minMessage)
      .max(REVIEW_TEXT.MAX_LENGTH, maxMessage),
    negativeComment: z
      .string()
      .min(REVIEW_TEXT.MIN_LENGTH, minMessage)
      .max(REVIEW_TEXT.MAX_LENGTH, maxMessage),
    mediaFiles: mediaFilesValidator.optional(),
  });

export const useReviewInput = (productId?: number, onSuccess?: () => void) => {
  const t = useTranslations('reviews');
  const postReviewMutation = usePostReview(onSuccess);

  const minMessage = t('pleaseEnterAtLeastNCharacters', {
    count: REVIEW_TEXT.MIN_LENGTH,
  });
  const maxMessage = t('pleaseEnterWithinNCharacters', {
    count: REVIEW_TEXT.MAX_LENGTH.toLocaleString(),
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(createReviewSchema(minMessage, maxMessage)),
    defaultValues: {
      rating: 0,
      positiveComment: '',
      negativeComment: '',
      mediaFiles: undefined,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateRating = (rating: number) => {
    setValue('rating', rating, { shouldValidate: true });
  };

  const updatePositiveComment = (comment: string) => {
    setValue('positiveComment', comment, { shouldValidate: true });
  };

  const updateNegativeComment = (comment: string) => {
    setValue('negativeComment', comment, { shouldValidate: true });
  };

  const updateMediaFiles = (files: File[]) => {
    setValue('mediaFiles', files, { shouldValidate: true });
  };

  const onSubmit = async (formData: ReviewFormData) => {
    try {
      // 1. 미디어 파일 presigned URL 요청
      let mediaUrls: string[] = [];
      if (formData.mediaFiles && formData.mediaFiles.length > 0) {
        const mediaTypes = formData.mediaFiles.map((file) => file.type);
        const mediaResponse = await getMediaPresignedUrl({
          mediaType: mediaTypes,
        });
        mediaUrls = mediaResponse.data?.mediaUrl || [];
      }

      // 3. Presigned URL로 파일 업로드
      if (mediaUrls.length > 0 && formData.mediaFiles) {
        await uploadFiles(mediaUrls, formData.mediaFiles, '미디어');
      }

      // 4. 리뷰 제출
      const reviewRequest: ReviewRequest = {
        rating: formData.rating,
        positiveComment: formData.positiveComment,
        negativeComment: formData.negativeComment,
        mediaUrl: mediaUrls,
      };

      if (productId) {
        postReviewMutation.mutate({
          productId,
          review: reviewRequest,
        });
      }
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  };

  const compatibleFormData = {
    rating: formData.rating,
    positiveComment: formData.positiveComment,
    negativeComment: formData.negativeComment,
    mediaFiles: formData.mediaFiles || [],
  };

  const compatibleErrors = {
    rating: errors.rating?.message,
    positiveComment: errors.positiveComment?.message,
    negativeComment: errors.negativeComment?.message,
    mediaFiles: errors.mediaFiles?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    reset,
    updateRating,
    updatePositiveComment,
    updateNegativeComment,
    updateMediaFiles,
    handleSubmit: () => handleSubmit(onSubmit)(),
    isFormValid: isValid,
  };
};
