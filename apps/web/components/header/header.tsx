'use client';

import { cn } from '@/lib/utils';
import { CategoryBar, SearchBar, TopUtil } from './header-content';
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
        'z-55 sticky top-0 mx-auto flex w-full flex-col bg-white',
        'relative',
        selectedCategory || isSearching
          ? 'border-b border-dashed border-pink-500'
          : 'border-b-[0.1rem] border-gray-500'
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
      />
      {isSearching && (
        <div className="w-full bg-white">
          <SearchBar
            searchValue={searchValue}
            handleChangeSearchValue={handleChangeSearchValue}
            handleSearchIconClick={handleSearchIconClick}
          />
        </div>
      )}
    </div>
  );
}
