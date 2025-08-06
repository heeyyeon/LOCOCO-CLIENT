import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { getOptionLabel } from 'utils/category';
import Link from 'next/link';
import { SvgDivider } from '@lococo/icons';
import { cn } from '@lococo/utils';

interface OptionBarProps {
  options: CategoryOptionEng[];
  selectedCategoryKey: CategoryNameEng;
  selectedOption: CategoryOptionEng | null;
  handleSelectOption: (option: CategoryOptionEng) => void;
  handleMouseLeaveCategory: () => void;
}
export function OptionBar({
  options,
  selectedOption,
  selectedCategoryKey,
  handleSelectOption,
}: OptionBarProps) {
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+1px)] z-50 mx-auto flex h-[5.2rem] w-full min-w-[1366px] items-center border-b border-solid border-pink-500 bg-white">
      <div className="mx-auto flex h-[6.4rem] w-[1366px] items-center gap-[2rem] px-[11.9rem]">
        {options.map((option, index) => {
          const isActive = option === selectedOption;
          const isLast = index === options.length - 1;
          const label = getOptionLabel(selectedCategoryKey, option);
          let url = '';
          if (option === 'ALL') {
            url = `/search?middleCategory=${selectedCategoryKey}&searchType=PRODUCT`;
          } else {
            url = `/search?middleCategory=${selectedCategoryKey}&subCategory=${option}&searchType=PRODUCT`;
          }
          return (
            <div
              key={`option-${option}`}
              className="flex h-[3.2rem] items-center justify-center gap-[1rem]"
            >
              <Link
                href={url}
                className={cn(
                  'jp-body2 cursor-pointer whitespace-nowrap px-[2.4rem] py-[1rem] hover:text-pink-500',
                  isActive ? 'font-bold text-pink-500' : 'text-gray-600'
                )}
                onClick={() => handleSelectOption(option as CategoryOptionEng)}
              >
                {label}
              </Link>
              {!isLast && <SvgDivider className="h-[1.2rem] w-[0.1rem]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
