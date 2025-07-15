'use client';

import { cn } from '@/lib/utils';
import { CategoryBar, TopUtil } from './header-content';
import { useHeaderAction } from './use-header-action';

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
    handleMouseLeaveCategory,
    handleChangeSearchValue,
    handleSearchIconClick,
  } = useHeaderAction();

  return (
    <div
      className={cn(
        'z-55 sticky mx-auto flex w-full min-w-[1366px] flex-col bg-white',
        (isSearching || selectedCategory) &&
          'border-b border-dashed border-pink-500',
        !selectedCategory && !isSearching && 'border-b-[0.1rem] border-gray-500'
      )}
    >
      <TopUtil />
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
  );
}
