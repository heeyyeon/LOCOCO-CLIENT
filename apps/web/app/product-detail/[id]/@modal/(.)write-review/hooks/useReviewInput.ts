'use client';

import {
  REVIEW_MEDIA_MAX_COUNT,
  REVIEW_TEXT,
  REVIEW_TEXT_ERROR_MESSAGE,
} from 'constants/review';
import { ProductOption } from 'types/product';
import { z } from 'zod';
import { useState } from 'react';

export interface ReviewData {
  productOptionId: ProductOption['id'] | null;
  rating: number;
  positiveComment: string;
  negativeComment: string;
  mediaFiles: File[];
  receiptFile: File | null;
}

const reviewSchema = z.object({
  productOptionId: z.number().min(0),
  rating: z.number().min(1).max(5),
  positiveComment: z
    .string()
    .min(
      REVIEW_TEXT.MIN_LENGTH,
      REVIEW_TEXT_ERROR_MESSAGE.MIN(REVIEW_TEXT.MIN_LENGTH)
    )
    .max(
      REVIEW_TEXT.MAX_LENGTH,
      REVIEW_TEXT_ERROR_MESSAGE.MAX(REVIEW_TEXT.MAX_LENGTH)
    ),
  negativeComment: z
    .string()
    .min(
      REVIEW_TEXT.MIN_LENGTH,
      REVIEW_TEXT_ERROR_MESSAGE.MIN(REVIEW_TEXT.MIN_LENGTH)
    )
    .max(
      REVIEW_TEXT.MAX_LENGTH,
      REVIEW_TEXT_ERROR_MESSAGE.MAX(REVIEW_TEXT.MAX_LENGTH)
    ),
  mediaFiles: z
    .array(z.instanceof(File))
    .refine((files) => files.length <= REVIEW_MEDIA_MAX_COUNT.PHOTO, {
      message: '미디어 파일은 최대 5개까지 업로드 가능합니다',
    }),
  receiptFile: z.instanceof(File).nullable(),
});

export const useReviewInput = () => {
  const [formData, setFormData] = useState<ReviewData>({
    productOptionId: null,
    rating: 0,
    positiveComment: '',
    negativeComment: '',
    mediaFiles: [],
    receiptFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProductOption = (optionId: number) => {
    setFormData((prev: ReviewData) => ({ ...prev, productOptionId: optionId }));
    if (errors.productOptionId) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        productOptionId: '',
      }));
    }
  };

  const updateRating = (rating: number) => {
    setFormData((prev: ReviewData) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev: Record<string, string>) => ({ ...prev, rating: '' }));
    }
  };

  const updatePositiveComment = (comment: string) => {
    setFormData((prev: ReviewData) => ({ ...prev, positiveComment: comment }));
    if (errors.positiveComment) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        positiveComment: '',
      }));
    }
  };

  const updateNegativeComment = (comment: string) => {
    setFormData((prev: ReviewData) => ({ ...prev, negativeComment: comment }));
    if (errors.negativeComment) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        negativeComment: '',
      }));
    }
  };

  const updateMediaFiles = (files: File[]) => {
    setFormData((prev: ReviewData) => ({ ...prev, mediaFiles: files }));
    if (errors.mediaFiles) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        mediaFiles: '',
      }));
    }
  };

  const updateReceiptFile = (file: File | null) => {
    setFormData((prev: ReviewData) => ({ ...prev, receiptFile: file }));
    if (errors.receiptFile) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        receiptFile: '',
      }));
    }
  };

  // 폼 검증
  const validateForm = (): boolean => {
    try {
      reviewSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        (error as z.ZodError).issues.forEach((err: z.ZodIssue) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionFormData = new FormData();
      submissionFormData.append(
        'productOptionId',
        formData.productOptionId!.toString()
      );
      submissionFormData.append('rating', formData.rating.toString());
      submissionFormData.append('positiveComment', formData.positiveComment);
      submissionFormData.append('negativeComment', formData.negativeComment);

      formData.mediaFiles.forEach((file: File, index: number) => {
        submissionFormData.append(`mediaFiles`, file);
      });

      if (formData.receiptFile) {
        submissionFormData.append('receiptFile', formData.receiptFile);
      }

      // TODO: API 호출
      console.log(submissionFormData);
      resetForm();
    } catch (error: unknown) {
      console.error('리뷰 제출 실패:', error);
      // TODO: 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productOptionId: null,
      rating: 0,
      positiveComment: '',
      negativeComment: '',
      mediaFiles: [],
      receiptFile: null,
    });
    setErrors({});
  };

  const isFormValid = () => {
    return (
      formData.productOptionId !== null &&
      formData.rating > 0 &&
      formData.positiveComment.length >= REVIEW_TEXT.MIN_LENGTH &&
      formData.negativeComment.length >= REVIEW_TEXT.MIN_LENGTH
    );
  };

  const hasErrors = Object.keys(errors).length > 0;

  return {
    formData,
    errors,
    isSubmitting,
    hasErrors,

    updateProductOption,
    updateRating,
    updatePositiveComment,
    updateNegativeComment,
    updateMediaFiles,
    updateReceiptFile,
    handleSubmit,
    resetForm,
    validateForm,

    isFormValid: isFormValid(),
  };
};
