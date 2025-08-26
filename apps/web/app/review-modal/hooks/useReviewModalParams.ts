// 라우팅 및 파라미터 관련
// URL 파라미터 추출, 검색 파라미터 처리, 카테고리 파라미터 유효성 검사
import { useParams, useSearchParams } from 'next/navigation';

import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';

interface UseReviewModalParamsProps {
  productId?: number;
}

export function useReviewModalParams({ productId }: UseReviewModalParamsProps) {
  const { reviewId: reviewIdParam } = useParams() as { reviewId: string };
  const searchParams = useSearchParams();

  const currentReviewId = Number(reviewIdParam);
  const currentProductId =
    productId || Number(searchParams.get('productId')) || 0;
  const keyword = searchParams.get('keyword');
  const middleCategory = searchParams.get('middleCategory');
  const subCategory = searchParams.get('subCategory');

  const validMiddleCategory: CategoryNameEng | '' = isValidCategoryKey(
    middleCategory || ''
  )
    ? (middleCategory as CategoryNameEng)
    : '';

  const validSubCategory: CategoryOptionEng | '' =
    validMiddleCategory &&
    isValidCategoryOption(subCategory || '', validMiddleCategory)
      ? (subCategory as CategoryOptionEng)
      : '';

  return {
    currentReviewId,
    currentProductId,
    keyword,
    validMiddleCategory,
    validSubCategory,
  };
}
