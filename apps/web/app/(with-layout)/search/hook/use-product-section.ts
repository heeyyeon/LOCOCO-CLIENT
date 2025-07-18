import { useProductSearch, useCategoryProductSearch } from 'hooks/headers-api';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';
import { useSearchParams } from 'next/navigation';

export default function useProductSectionData() {
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
  } = useProductSearch(keyword, PAGE_NUMBER, PAGE_SIZE, !!keyword);

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategoryProductSearch(
    middleCategory,
    subCategory,
    PAGE_NUMBER,
    PAGE_SIZE,
    !!middleCategory
  );

  const products = keyword
    ? searchData?.data?.products || []
    : categoryData?.data?.products || [];

  const isLoading = keyword ? isSearchLoading : isCategoryLoading;
  const hasError = keyword ? isSearchError : isCategoryError;

  return { products, isLoading, hasError };
}
