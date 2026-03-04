'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import Modal from 'components/modal/modal';

import { Button } from '@lococo/design-system/button';
import { IconButton } from '@lococo/design-system/icon-button';
import { SvgClose } from '@lococo/icons';

import { getProductDetail } from '../../apis';
import {
  MediaUpload,
  NegativeReview,
  PositiveReview,
  ProductInfo,
  ProductRating,
} from './components';
import { useReviewInput } from './hooks';

export default function WriteReviewModal() {
  const router = useRouter();
  const { productId } = useParams();

  const {
    formData,
    errors,
    reset,
    updateRating,
    updatePositiveComment,
    updateNegativeComment,
    updateMediaFiles,
    handleSubmit,
    isFormValid,
  } = useReviewInput(Number(productId), () => {
    reset();
    router.back();
  });
  const t = useTranslations('reviews');
  const [productInfo, setProductInfo] = useState({
    productName: '',
    imageUrl: '',
    brandName: '',
  });

  useEffect(() => {
    const fetchProductDetail = async () => {
      const { productName, imageUrls, brandName } = await getProductDetail(
        Number(productId)
      );
      setProductInfo({
        productName,
        imageUrl: imageUrls[0] || '',
        brandName,
      });
    };
    fetchProductDetail();
  }, [productId]);

  const handleClose = () => {
    router.back();
  };

  const onSubmit = () => {
    handleSubmit();
  };

  return (
    <Modal className="size-[70rem] rounded-[0.8rem]" onClose={handleClose}>
      <Modal.Header className="sticky top-0 flex justify-between">
        <h2 className="body1 font-bold text-gray-800">{t('writeAReview')}</h2>
        <IconButton
          icon={<SvgClose />}
          size="sm"
          color="secondary"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body className="scrollbar-hide overflow-y-scroll">
        <ProductInfo {...productInfo} />
        <div className="flex flex-col gap-[1.2rem] p-[2rem]">
          <ProductRating
            value={formData.rating}
            onChange={updateRating}
            error={errors.rating}
          />
          <PositiveReview
            value={formData.positiveComment}
            onChange={updatePositiveComment}
            error={errors.positiveComment}
          />
          <NegativeReview
            value={formData.negativeComment}
            onChange={updateNegativeComment}
            error={errors.negativeComment}
          />
          <MediaUpload
            files={formData.mediaFiles}
            onChange={updateMediaFiles}
            error={errors.mediaFiles}
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="px-[2rem] py-[1.2rem]">
        <Button
          variant="filled"
          size="lg"
          color="primary"
          className="title2 w-full px-[1.6rem] py-[1.2rem]"
          rounded="sm"
          onClick={onSubmit}
          disabled={!isFormValid}
        >
          {t('register')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
