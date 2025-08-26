import { redirect } from 'next/navigation';

import { SearchOption } from 'constants/option';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';

import SearchPageClient from './page.client';

interface SearchParams {
  middleCategory?: string;
  subCategory?: string;
  searchType?: string;
  keyword?: string;
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const middleCategoryParam = searchParams.middleCategory || '';
  const subCategoryParam = searchParams.subCategory || '';
  const searchTypeParam = searchParams.searchType || 'PRODUCT';
  const keyword = searchParams.keyword || '';

  // 서버에서 사전 검증
  if (!isValidCategoryKey(middleCategoryParam) && !keyword) {
    redirect('/404');
  }

  if (
    middleCategoryParam &&
    !isValidCategoryOption(
      subCategoryParam,
      middleCategoryParam as CategoryNameEng
    ) &&
    subCategoryParam !== ''
  ) {
    redirect('/404');
  }

  if (searchTypeParam !== 'PRODUCT' && searchTypeParam !== 'REVIEW') {
    redirect('/404');
  }

  // 검증 통과시 클라이언트 컴포넌트에 전달
  return (
    <SearchPageClient
      validatedParams={{
        middleCategory: middleCategoryParam as CategoryNameEng,
        subCategory: subCategoryParam as CategoryOptionEng,
        searchType: searchTypeParam as SearchOption,
        keyword,
      }}
    />
  );
}
