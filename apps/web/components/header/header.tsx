'use client';

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
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { HEADER_MENUS } from '../../app/constants/header';
import { useHeaderState } from './useHeaderState';

type Menu = {
  title: string;
  options: string[];
};

interface HeaderProps {
  menus: Menu[];
}

interface GnbProps extends HeaderProps {
  activeTitle: string | null;
  onToggle: (title: string) => void;
  onSearchToggle: () => void;
  isSearching: boolean;
}

interface MegaMenuProps {
  options: string[];
  activeOption: string | null;
  onClick: (option: string) => void;
}

interface SearchProps {
  searchValue: string;
  handleSearchValue: (text: string) => void;
}

interface TopUtilItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function Header() {
  const {
    activeTitle,
    activeOption,
    isSearching,
    searchValue,
    activeMenu,
    handleMenuToggle,
    handleOptionClick,
    handleSearchToggle,
    handleSearchValue,
  } = useHeaderState();

  return (
    <div className="sticky top-0 z-50 flex w-full flex-col bg-white">
      <TopUtil />
      <Gnb
        menus={HEADER_MENUS}
        activeTitle={activeTitle}
        onToggle={handleMenuToggle}
        onSearchToggle={handleSearchToggle}
        isSearching={isSearching}
      />
      {!isSearching && activeMenu && (
        <MegaMenu
          options={activeMenu.options}
          activeOption={activeOption}
          onClick={handleOptionClick}
        />
      )}
      {isSearching && (
        <Search
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
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
  menus,
  activeTitle,
  onToggle,
  onSearchToggle,
  isSearching,
}: GnbProps) {
  const borderClass =
    activeTitle || isSearching
      ? 'border-b border-dashed border-pink-500'
      : 'border-b-[0.1rem] border-gray-500';

  return (
    <div
      className={`flex h-[6.4rem] items-center gap-[2rem] px-[11.9rem] ${borderClass}`}
    >
      <SvgLogo className="h-[2.7rem] w-[16rem] shrink-0" />
      <div className="flex h-[6rem] flex-grow items-center">
        {menus.map((menu) => {
          const isActive = menu.title === activeTitle;
          return (
            <div
              key={menu.title}
              className="h-[6rem] w-[13.6rem] shrink-0 cursor-pointer"
              onMouseEnter={() => onToggle(menu.title)}
              onClick={() => onToggle(menu.title)}
            >
              <p
                className={`text-jp-title2 flex h-full cursor-pointer items-center gap-[1rem] whitespace-nowrap px-[3.2rem] pb-[1rem] pt-[1rem] font-bold ${
                  isActive ? 'text-pink-500' : 'text-gray-800'
                }`}
              >
                {menu.title}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]"
        onClick={onSearchToggle}
      >
        {isSearching ? <SvgClose /> : <SvgSearch />}
      </div>
    </div>
  );
}

function MegaMenu({ options, activeOption, onClick }: MegaMenuProps) {
  return (
    <div className="flex h-[5.2rem] w-full items-center border-b-[0.1rem] border-pink-500 bg-white px-[9.5rem]">
      {options.map((option) => {
        const isActive = option === activeOption;
        return (
          <div
            key={option}
            className="flex h-[3.2rem] items-center justify-center gap-[1rem]"
          >
            <button
              className={`text-jp-body2 cursor-pointer whitespace-nowrap px-[2.4rem] py-[1rem] ${
                isActive ? 'font-bold text-pink-500' : 'text-gray-600'
              }`}
              onClick={() => onClick(option)}
            >
              {option}
            </button>
            <SvgDivider />
          </div>
        );
      })}
    </div>
  );
}

function Search({ searchValue, handleSearchValue }: SearchProps) {
  return (
    <div className="flex w-full items-center gap-[0.8rem] border-b border-pink-500 bg-white px-[11.9rem]">
      <Input
        type="search"
        value={searchValue}
        onChange={(e) => handleSearchValue(e.target.value)}
        placeholder="ラネージュ"
        className="text-jp-body2 w-full text-right font-bold leading-[3rem] text-gray-800"
      />
      <div className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]">
        <SvgSearch className="cursor-pointer" />
      </div>
    </div>
  );
}
