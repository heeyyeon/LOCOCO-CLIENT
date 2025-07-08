'use client';

import CardProduct from 'components/card/card-products';
import CardReview from 'components/card/card-review';
import { inRange } from 'es-toolkit';
import { MOCK_CARD_PRODUCT, MOCK_CARD_REVIEW } from 'mock/card-props-mock';

// import Button from '@/components/button/Button';

export default function Home() {
  return (
    <div>
      {MOCK_CARD_PRODUCT.map(
        ({
          productId,
          brand,
          title,
          description,
          isLiked,
          likeCount,
          rating,
          rank,
          reviewCount,
        }) => (
          <CardProduct
            key={productId}
            brand={brand}
            title={title}
            description={description}
            productId={productId}
            isLiked={isLiked}
            likeCount={likeCount}
            rating={rating}
            reviewCount={reviewCount}
            {...(inRange(rank, 1, 3) && { rank: rank })}
          />
        )
      )}
      {MOCK_CARD_REVIEW.map(
        ({ type, brand, title, reviewId, likeCount, rank }) => (
          <CardReview
            key={reviewId}
            type={type}
            brand={brand}
            title={title}
            reviewId={reviewId}
            likeCount={likeCount}
            {...(inRange(rank, 1, 3) && { rank: rank })}
            handleBtnClick={() => console.log('dd')}
          />
        )
      )}
      {/* <CardReview
        {...reviewData}
        actionButton={
          <Button
            size="sm"
            variant="outline"
            color="primary"
            onClick={() => console.log('')}
          >
            보러가기
          </Button>
        }
      />
      <CardReview
        {...reviewData}
        buttonProps={{
          variant: 'outline',
          color: 'primary',
          onClick: () => console.log(''),
          children: '보러가기', // children을 prop으로?
        }}
      /> */}
    </div>
  );
}
