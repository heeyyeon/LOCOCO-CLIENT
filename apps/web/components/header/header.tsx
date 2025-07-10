'use client';

import { Gnb, MegaMenu, SearchBar, TopUtil } from './header-content';
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
