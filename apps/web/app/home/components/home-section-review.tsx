'use client';

import CardReview from 'components/card/card-review';
import { imageReviewMock } from 'mocks/reviewMock';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { SvgArrowOutward } from '@/icons';

interface HomeSectionReviewProps {
  type: 'video' | 'image';
  className?: string;
}

export default function HomeSectionReview({
  type,
  className,
}: HomeSectionReviewProps) {
  const router = useRouter();
  return (
    <div className={`mt-8 flex flex-col gap-8 ${className}`}>
      <p className="jp-head3 font-[700]">
        {type === 'video' && '動画レビュー'}
        {type === 'image' && '写真付きレビュー'}
      </p>
      <div className="flex gap-6">
        {imageReviewMock.map((review) => (
          <CardReview
            key={review.reviewId}
            type={type}
            brandName={review.brandName}
            productName={review.productName}
            reviewId={review.reviewId}
            likeCount={review.likeCount}
            imageUrl="https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=1024x1024&w=is&k=20&c=mopsJIVkM2O1h3_jVXT6HErRa4coSU4g31IDbwDv2H4="
            handleCardClick={() => router.push(`/review/${review.reviewId}`)}
          >
            <Button
              color="primary"
              variant="outline"
              size="lg"
              onClick={() => router.push(`/product-detail/productId받아서줄것`)}
            >
              <div className="jp-title3 flex items-center gap-[0.8rem] font-[700]">
                <SvgArrowOutward />
                見に行く
              </div>
            </Button>
          </CardReview>
        ))}
      </div>
    </div>
  );
}
