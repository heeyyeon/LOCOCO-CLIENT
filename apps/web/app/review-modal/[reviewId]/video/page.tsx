'use client';

import { useRouter } from 'next/navigation';
import ReviewModalSwiper from '../../components/review-modal-swiper';
import { videoReviewMocks } from '../../mocks';

export default function Page() {
  const router = useRouter();

  return (
    <ReviewModalSwiper
      reviews={videoReviewMocks}
      onClose={() => router.back()}
    />
  );
}
