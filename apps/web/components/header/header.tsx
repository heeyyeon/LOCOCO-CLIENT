'use client';

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
    <div className="z-55 sticky top-0 flex w-full flex-col bg-white">
      <div className="w-full bg-white">
        <TopUtil />
      </div>
      <div className="w-full bg-white">
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
      </div>
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
