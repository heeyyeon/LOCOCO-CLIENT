'use client';

import CampaignLanguage, {
  LocaleType,
} from 'app/[locale]/(with-layout)/(home)/components/campaign-language';
import { CATEGORY_NAME_NEW } from 'constants/category';
import { Link } from 'i18n/navigation';
import { CATEGORY_KEYS, CategoryKey } from 'types/category';

import { Tab, TabContainer } from '@lococo/design-system/tab';
import { SvgAdd } from '@lococo/icons';

interface CampaignFiltersProps {
  campaignCategory: CategoryKey;
  setCampaignCategory: (value: CategoryKey) => void;
  campaignLanguage: LocaleType;
  setCampaignLanguage: (value: LocaleType) => void;
  showSeeMore?: boolean;
}

/**
 *
 * @param campaignCategory 현재 선택된 카테고리
 * @param setCampaignCategory 선택된 카테고리 바꾸는 set함수
 * @param campaignLanguage 현재 선택된 언어
 * @param setCampaignLanguage 선택된 언어 바꾸는 set 함수
 * @param showSeeMore 더보기 보여줄지 여부
 * @returns
 */
export default function CampaignFilters({
  campaignCategory,
  setCampaignCategory,
  campaignLanguage,
  setCampaignLanguage,
  showSeeMore = false,
}: CampaignFiltersProps) {
  return (
    <div className="flex h-[5.6rem] w-full items-center justify-between">
      <TabContainer variant="horizontal">
        {CATEGORY_KEYS.map((CATEGORY_KEY) => (
          <Tab
            key={CATEGORY_KEY}
            label={CATEGORY_NAME_NEW[CATEGORY_KEY]}
            value={CATEGORY_KEY}
            selected={campaignCategory === CATEGORY_KEY}
            onClick={() => setCampaignCategory(CATEGORY_KEY)}
          />
        ))}
      </TabContainer>
      <div className="flex items-center">
        <CampaignLanguage
          locale={campaignLanguage}
          setLocale={setCampaignLanguage}
        />
        {showSeeMore && (
          <Link
            href={'/all/1'}
            className="flex cursor-pointer items-center gap-[0.8rem] px-[3.2rem] py-[1.6rem]"
          >
            <p className="body1 font-[700]">See More</p>
            <SvgAdd size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}
