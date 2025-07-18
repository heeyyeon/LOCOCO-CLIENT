'use client';

import { SEARCH_OPTION } from 'constants/option';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { SearchOption } from 'types/option';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';
import { useMemo, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OptionSelector from './components/option-selector';
import SearchBreadCrumbSection from './components/search-bread-crumb-section';
import SearchProductsSection from './components/search-products-section';
import SearchReviewSection from './components/search-reviews-section';

interface SearchPageClientProps {
  authStatus: boolean;
}

export default function SearchPageClient({
  authStatus,
}: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';
  const rawSearchType = searchParams.get('searchType') || '';
  const keyword = searchParams.get('keyword') || '';

  const middleCategory: CategoryNameEng | '' = isValidCategoryKey(rawMiddle)
    ? rawMiddle
    : '';
  const subCategory: CategoryOptionEng | '' =
    middleCategory && isValidCategoryOption(rawSub, middleCategory)
      ? rawSub
      : '';

  const selectedTab: SearchOption = useMemo(() => {
    if (rawSearchType === 'REVIEW') return SEARCH_OPTION.REVIEW;
    return SEARCH_OPTION.PRODUCT;
  }, [rawSearchType]);

  const handleClickTab = (option: SearchOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option === SEARCH_OPTION.REVIEW) {
      params.set('searchType', 'REVIEW');
    } else {
      params.set('searchType', 'PRODUCT');
    }

    router.push(`/search?${params.toString()}`);
  };

  const tabRender = {
    [SEARCH_OPTION.PRODUCT]: <SearchProductsSection authStatus={authStatus} />,
    [SEARCH_OPTION.REVIEW]: <SearchReviewSection />,
  }[selectedTab];

  if (!isClient) {
    return <div className="min-h-screen w-full bg-white" />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-start">
      <div className="flex flex-col items-start self-stretch"></div>
      <SearchBreadCrumbSection
        middleCategory={middleCategory}
        subCategory={subCategory}
      />
      {keyword && (
        <div className="mx-auto w-[1366px] px-[11.9rem] py-[6rem]">
          <p className="jp-head2 text-gray-800">
            「
            <span className="inline-block max-w-[80rem] truncate align-bottom">
              {keyword}
            </span>
            」 に関する検索結果
          </p>
        </div>
      )}
      <OptionSelector
        selectedTab={selectedTab}
        handleClickTab={handleClickTab}
      />
      {tabRender}
    </div>
  );
}
