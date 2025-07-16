'use client';

import { useState, useEffect } from 'react';
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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // 아래로 스크롤 - TopUtil 숨기기
        setVisible(false);
      } else {
        // 위로 스크롤 - TopUtil 보이기
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'z-55 sticky top-0 mx-auto flex w-full min-w-[1366px] flex-col bg-white',
        (isSearching || selectedCategory) &&
          'border-b border-dashed border-pink-500',
        !selectedCategory && !isSearching && 'border-b-[0.1rem] border-gray-500'
      )}
    >
      <TopUtil visible={visible} />
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
