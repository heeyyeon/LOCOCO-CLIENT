import { SvgArrowLeft, SvgArrowRight, SvgEllipsis } from '../../icons';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  className?: string;
}

interface PageButtonProps {
  page: number;
  isActive: boolean;
  handlePageChange: (page: number) => void;
}

export function PageButton({
  page,
  isActive,
  handlePageChange,
}: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => handlePageChange(page)}
      className={cn(
        'inter-title2 flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center',
        isActive ? 'text-pink-500' : 'text-gray-400'
      )}
    >
      {page}
    </button>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  className,
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const centerPagesNumber = 5;

    // 6페이지 이하
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let centerStart = Math.max(1, currentPage - 2);
    let centerEnd = Math.min(totalPages, centerStart + centerPagesNumber - 1);
    if (centerEnd >= totalPages) {
      centerEnd = totalPages;
      centerStart = Math.max(1, centerEnd - centerPagesNumber + 1);
    }

    if (centerStart > 1) {
      pages.push(1);
      if (centerStart > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = centerStart; i <= centerEnd; i++) {
      pages.push(i);
    }

    if (centerEnd < totalPages) {
      if (centerEnd < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn('flex items-center gap-[0.4rem]', className)}>
      <SvgArrowLeft
        size={24}
        className={cn(
          currentPage === 1
            ? 'cursor-not-allowed text-gray-300'
            : 'cursor-pointer text-gray-600'
        )}
        onClick={() => handlePageChange(currentPage - 1)}
      />

      {visiblePages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex h-[3.2rem] w-[3.2rem] items-center justify-center gap-[0.3rem]"
            >
              <SvgEllipsis size={4} className="text-gray-400" />
              <SvgEllipsis size={4} className="text-gray-400" />
              <SvgEllipsis size={4} className="text-gray-400" />
            </div>
          );
        }

        return (
          <PageButton
            key={page}
            page={page}
            isActive={page === currentPage}
            handlePageChange={handlePageChange}
          />
        );
      })}

      <SvgArrowRight
        size={24}
        onClick={() => handlePageChange(currentPage + 1)}
        className={cn(
          currentPage === totalPages
            ? 'cursor-not-allowed text-gray-300'
            : 'cursor-pointer text-gray-600'
        )}
      />
    </div>
  );
}
