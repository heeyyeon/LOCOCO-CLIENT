'use client';

import Link from 'next/link';
import { SvgClose, SvgLogo, SvgSearch } from '@lococo/icons';
import { CategorySection } from './categorySection';
import { SearchBar } from './searchBar';
import { useHeaderAction } from './use-header-action';

export function MainHeader() {
  const {
    isSearching,
    handleOpenSearchBar,
    searchValue,
    handleChangeSearchValue,
    handleSearchIconClick,
  } = useHeaderAction();
  return (
    <header className="relative mx-auto w-full">
      <div className="mx-auto flex h-[6.4rem] w-[1366px] items-center gap-[2rem] px-[11.9rem]">
        <div className="flex flex-grow items-center gap-[2rem]">
          <Link href="/" aria-label="ロココホームにアクセス">
            <SvgLogo className="h-[2.7rem] w-[16rem] shrink-0" />
          </Link>
          <CategorySection />
        </div>

        <div
          className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]"
          onClick={handleOpenSearchBar}
        >
          {isSearching ? <SvgClose /> : <SvgSearch />}
        </div>
      </div>
      {isSearching && (
        <SearchBar
          searchValue={searchValue}
          handleChangeSearchValue={handleChangeSearchValue}
          handleSearchIconClick={handleSearchIconClick}
        />
      )}
    </header>
  );
}
