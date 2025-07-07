'use client';

import CardProduct from 'components/card/card-products';
import CardReview from 'components/card/card-review';
import { inRange } from 'es-toolkit';
import { MOCK_CARD_PRODUCT, MOCK_CARD_REVIEW } from 'mock/card-props-mock';

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
          />
        )
      )}
    </div>
  );
}
