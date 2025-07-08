import { HEADER_MENUS } from 'app/constants/header';
import { useMemo, useState } from 'react';

export function useHeaderState() {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const handleMenuToggle = (title: string) => {
    setActiveTitle(title);
    setActiveOption(null);
    setIsSearching(false);
  };

  const handleOptionClick = (option: string) => {
    setActiveOption(option);
  };

  const handleSearchToggle = () => {
    setIsSearching((prev) => !prev);
    setActiveTitle(null);
    setActiveOption(null);
  };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const activeMenu = useMemo(
    () => HEADER_MENUS.find((menu) => menu.title === activeTitle),
    [activeTitle]
  );

  return {
    activeTitle,
    activeOption,
    isSearching,
    searchValue,
    activeMenu,
    handleMenuToggle,
    handleOptionClick,
    handleSearchToggle,
    handleSearchValue,
  };
}
