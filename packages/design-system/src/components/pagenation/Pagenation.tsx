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

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
        'inter-title2 flex h-[3.2rem] w-[3.2rem] items-center justify-center',
        isActive ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'
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
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= 6) return range(1, totalPages);

    const pages: (number | 'ellipsis')[] = [];
    const start = Math.max(2, safePage - 2);
    const end = Math.min(totalPages - 1, safePage + 2);

    pages.push(1);
    if (start > 2) pages.push('ellipsis');
    pages.push(...range(start, end));
    if (end < totalPages - 1) pages.push('ellipsis');
    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();
  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  return (
    <div className={cn('flex items-center gap-[0.4rem]', className)}>
      <button
        type="button"
        disabled={!canPrev}
        onClick={() => canPrev && handlePageChange(safePage - 1)}
        className={cn(
          'flex h-[3.2rem] w-[3.2rem] items-center justify-center',
          canPrev
            ? 'cursor-pointer text-gray-600'
            : 'cursor-not-allowed text-gray-300'
        )}
      >
        <SvgArrowLeft size={24} />
      </button>

      {visiblePages.map((page, index) =>
        page === 'ellipsis' ? (
          <div
            key={`ellipsis-${index}`}
            className="flex h-[3.2rem] w-[3.2rem] items-center justify-center gap-[0.3rem] text-gray-400"
          >
            <SvgEllipsis size={4} />
            <SvgEllipsis size={4} />
            <SvgEllipsis size={4} />
          </div>
        ) : (
          <PageButton
            key={page}
            page={page}
            isActive={page === safePage}
            handlePageChange={handlePageChange}
          />
        )
      )}

      <button
        type="button"
        disabled={!canNext}
        onClick={() => canNext && handlePageChange(safePage + 1)}
        className={cn(
          'flex h-[3.2rem] w-[3.2rem] items-center justify-center',
          canNext
            ? 'cursor-pointer text-gray-600'
            : 'cursor-not-allowed text-gray-300'
        )}
      >
        <SvgArrowRight size={24} />
      </button>
    </div>
  );
}
