import { SvgErrorFill } from '../../icons/fill/components/ErrorFill';
import { cn } from '../../lib/utils';

interface ErrorNoticeProps {
  message: string;
  errorIconSize?: number;
  className?: string;
}

export default function ErrorNotice({
  message,
  errorIconSize = 16,
  className,
}: ErrorNoticeProps) {
  return (
    <p
      className={cn(
        'jp-caption3 mt-[0.2rem] flex h-[1.9rem] items-center gap-[0.8rem] text-[color:var(--color-red)]',
        className
      )}
    >
      <SvgErrorFill className="fill-color-red" size={errorIconSize} />
      {message}
    </p>
  );
}
