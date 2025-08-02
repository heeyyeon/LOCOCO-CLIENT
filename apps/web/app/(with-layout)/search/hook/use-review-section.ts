import { useSearchParams } from 'next/navigation';

import { useCategoryReviewSearch, useReviewSearch } from 'hooks/headers-api';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';

export default function useReviewSectionData(reviewType: 'VIDEO' | 'IMAGE') {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';

  const middleCategory: CategoryNameEng | '' = isValidCategoryKey(rawMiddle)
    ? rawMiddle
    : '';
  const subCategory: CategoryOptionEng | '' =
    middleCategory && isValidCategoryOption(rawSub, middleCategory)
      ? rawSub
      : '';

  const PAGE_SIZE = 8;
  const PAGE_NUMBER = 0;

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useReviewSearch(keyword, reviewType, PAGE_NUMBER, PAGE_SIZE, !!keyword);

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategoryReviewSearch(
    middleCategory,
    reviewType,
    subCategory,
    PAGE_NUMBER,
    PAGE_SIZE,
    !!middleCategory
  );

  const reviewData = keyword
    ? searchData?.data?.reviews || []
    : categoryData?.data?.reviews || [];

  const isLoading = keyword ? isSearchLoading : isCategoryLoading;
  const hasError = keyword ? isSearchError : isCategoryError;

  return { reviewData, isLoading, hasError };
}
