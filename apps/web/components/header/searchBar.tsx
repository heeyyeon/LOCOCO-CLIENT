'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@lococo/design-system/input';
import { SvgSearch } from '@lococo/icons';

interface SearchBarProps {
  searchValue: string;
  handleChangeSearchValue: (text: string) => void;
  handleSearchIconClick: () => void;
}

export function SearchBar({
  searchValue,
  handleChangeSearchValue,
  handleSearchIconClick,
}: SearchBarProps) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(
        `/search?keyword=${encodeURIComponent(searchValue)}&searchType=PRODUCT`
      );
      handleSearchIconClick();
    }
  };
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+1px)] z-50 mx-auto flex h-[5.2rem] w-full min-w-[1366px] items-center border-b border-solid border-pink-500 bg-white">
      <div className="mx-auto flex h-[6.4rem] w-[1366px] items-center">
        <div className="flex h-[6.4rem] w-[1366px] items-center gap-[2rem] px-[11.9rem]">
          <Input
            type="search"
            value={searchValue}
            onChange={(e) => handleChangeSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ラネージュ"
            className="jp-title2 w-full text-right font-bold leading-[3rem] text-gray-800"
          />
          {searchValue.trim() ? (
            <Link
              href={`/search?keyword=${encodeURIComponent(searchValue)}&searchType=PRODUCT`}
              className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]"
              onClick={handleSearchIconClick}
            >
              <SvgSearch className="cursor-pointer" />
            </Link>
          ) : (
            <div className="flex h-[6.4rem] w-[6.4rem] shrink-0 cursor-pointer items-center justify-center p-[1.4rem]">
              <SvgSearch className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
