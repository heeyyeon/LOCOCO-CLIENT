'use client';

import type { CategoryName, CategoryOptionEng } from 'types/category';
import { getOptionLabel } from 'utils/get-option-label';
import {
  SvgClose,
  SvgDivider,
  SvgHistory,
  SvgLikeFill,
  SvgLogin,
  SvgLogo,
  SvgMy,
  SvgSearch,
} from '@lococo/design-system';
import Input from '@lococo/design-system/components/input/Input';
import { cn } from '@/lib/utils';
import { CategoryKey } from '../../types/category';
import { useHeaderAction } from './useHeaderAction';

type Menu = {
  key: CategoryKey;
  name: CategoryName;
  options: CategoryOptionEng[];
};

interface TopUtilItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface MegaMenuProps {
  options: CategoryOptionEng[];
  selectedCategoryKey: CategoryKey;
  selectedOption: CategoryOptionEng | null;
  handleSelectOption: (option: CategoryOptionEng) => void;
}

interface GnbProps {
  categories: Menu[];
  selectedCategory: CategoryName | null;
  handleSelectCategory: (key: CategoryKey) => void;
  handleOpenSearchBar: () => void;
  isSearching: boolean;
}

interface SearchProps {
  searchValue: string;
  handleChangeSearch: (text: string) => void;
}

export default function Header() {
  const {
    categories,
    selectedCategory,
    selectedOption,
    isSearching,
    searchValue,
    activeMenu,
    handleSelectCategory,
    handleSelectOption,
    handleOpenSearchBar,
    handleChangeSearch,
  } = useHeaderAction();

  return (
    <div className="z-55 sticky top-0 flex w-full flex-col bg-white">
      <TopUtil />
      <Gnb
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
        handleOpenSearchBar={handleOpenSearchBar}
        isSearching={isSearching}
      />
      {!isSearching && activeMenu && (
        <MegaMenu
          options={activeMenu.options}
          selectedCategoryKey={activeMenu.key}
          selectedOption={selectedOption}
          handleSelectOption={handleSelectOption}
        />
      )}
      {isSearching && (
        <SearchBar
          searchValue={searchValue}
          handleChangeSearch={handleChangeSearch}
        />
      )}
    </div>
  );
}

function TopUtilItem({ icon, label, onClick }: TopUtilItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-[3.2rem] cursor-pointer items-center justify-center gap-[0.8rem] whitespace-nowrap px-[1.6rem] py-[1rem]"
    >
      {icon}
      <p>{label}</p>
    </button>
  );
}

function TopUtil() {
  return (
    <div className="flex items-center justify-end self-stretch px-[11.9rem] py-[2rem]">
      <TopUtilItem
        icon={<SvgMy className="text-gray-600" />}
        label="マイページ"
        onClick={() => console.log('마이페이지 클릭')}
      />
      <TopUtilItem
        icon={<SvgLikeFill className="text-gray-600" />}
        label="좋아요"
        onClick={() => console.log('좋아요 클릭')}
      />
      <TopUtilItem
        icon={<SvgHistory className="text-gray-600" />}
        label="내역"
        onClick={() => console.log('내역 클릭')}
      />
      <TopUtilItem
        icon={<SvgLogin className="text-gray-600" />}
        label="로그인"
        onClick={() => console.log('로그인 클릭')}
      />
    </div>
  );
}

function Gnb({
  categories,
  selectedCategory,
  handleSelectCategory,
  handleOpenSearchBar,
  isSearching,
}: GnbProps) {
  return (
    <div
      className={cn(
        'flex h-[6.4rem] items-center gap-[2rem] px-[11.9rem]',
        selectedCategory || isSearching
          ? 'border-b border-dashed border-pink-500'
          : 'border-b-[0.1rem] border-gray-500'
      )}
    >
      <SvgLogo className="h-[2.7rem] w-[16rem] shrink-0" />
      <div className="flex h-[6rem] flex-grow items-center">
        {categories.map(({ key, name }) => {
          const isActive = name === selectedCategory;
          return (
            <div
              key={key}
              className="h-[6rem] w-[13.6rem] shrink-0 cursor-pointer"
              onMouseEnter={() => handleSelectCategory(key)}
              onClick={() => handleSelectCategory(key)}
            >
              <p
                className={cn(
                  'jp-title2 flex h-full items-center gap-[1rem] whitespace-nowrap px-[3.2rem] pb-[1rem] pt-[1rem] font-bold',
                  isActive ? 'text-pink-500' : 'text-gray-800'
                )}
              >
                {name}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]"
        onClick={handleOpenSearchBar}
      >
        {isSearching ? <SvgClose /> : <SvgSearch />}
      </div>
    </div>
  );
}

function MegaMenu({
  options,
  selectedOption,
  selectedCategoryKey,
  handleSelectOption,
}: MegaMenuProps) {
  return (
    <div className="flex h-[5.2rem] w-full items-center border-b-[0.1rem] border-pink-500 bg-white px-[9.5rem]">
      {options.map((option, index) => {
        const isActive = option === selectedOption;
        const isLast = index === options.length - 1;
        const label = getOptionLabel(selectedCategoryKey, option);
        return (
          <div
            key={`option-${option}`}
            className="flex h-[3.2rem] items-center justify-center gap-[1rem]"
          >
            <button
              className={cn(
                'jp-body2 cursor-pointer whitespace-nowrap px-[2.4rem] py-[1rem]',
                isActive ? 'font-bold text-pink-500' : 'text-gray-600'
              )}
              onClick={() => handleSelectOption(option)}
            >
              {label}
            </button>
            {!isLast && <SvgDivider />}
          </div>
        );
      })}
    </div>
  );
}

function SearchBar({ searchValue, handleChangeSearch }: SearchProps) {
  return (
    <div className="flex w-full items-center gap-[0.8rem] border-b border-pink-500 bg-white px-[11.9rem]">
      <Input
        type="search"
        value={searchValue}
        onChange={(e) => handleChangeSearch(e.target.value)}
        placeholder="ラネージュ"
        className="jp-body2 w-full text-right font-bold leading-[3rem] text-gray-800"
      />
      <div className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]">
        <SvgSearch className="cursor-pointer" />
      </div>
    </div>
  );
}
