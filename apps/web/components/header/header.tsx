'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CategoryBar, TopUtil } from './header-content';
import { useHeaderAction } from './use-header-action';
import { useIntersect } from './use-intersect';

const header = React.memo(function Header() {
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
    handleMouseLeaveCategory,
    handleChangeSearchValue,
    handleSearchIconClick,
  } = useHeaderAction();
  const [observerRef, isVisible] = useIntersect(false);

  return (
    <>
      <div
        ref={observerRef}
        className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-transparent"
      />
      <div
        className={cn(
          'z-55 sticky top-0 mx-auto flex w-full min-w-[1366px] flex-col bg-white',
          (isSearching || selectedCategory) &&
            'border-b border-dashed border-pink-500',
          !selectedCategory &&
            !isSearching &&
            'border-b-[0.1rem] border-gray-500'
        )}
      >
        <TopUtil visible={isVisible} />
        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
          handleOpenSearchBar={handleOpenSearchBar}
          isSearching={isSearching}
          handleMouseLeaveCategory={handleMouseLeaveCategory}
          activeMenu={activeMenu}
          selectedOption={selectedOption}
          handleSelectOption={handleSelectOption}
          searchValue={searchValue}
          handleChangeSearchValue={handleChangeSearchValue}
          handleSearchIconClick={handleSearchIconClick}
        />
      </div>
    </>
  );
});

export default header;
