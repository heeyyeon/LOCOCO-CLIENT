'use client';

import { CategoryBar, OptionBar, SearchBar, TopUtil } from './header-content';
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
    handleChangeSearchValue,
  } = useHeaderAction();

  return (
    <div className="z-55 sticky top-0 flex w-full flex-col bg-white">
      <TopUtil />
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
        handleOpenSearchBar={handleOpenSearchBar}
        isSearching={isSearching}
      />
      {!isSearching && activeMenu && (
        <OptionBar
          options={activeMenu.options}
          selectedCategoryKey={activeMenu.key}
          selectedOption={selectedOption}
          handleSelectOption={handleSelectOption}
        />
      )}
      {isSearching && (
        <SearchBar
          searchValue={searchValue}
          handleChangeSearchValue={handleChangeSearchValue}
        />
      )}
    </div>
  );
}
