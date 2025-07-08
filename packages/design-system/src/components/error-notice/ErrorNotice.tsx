import { SvgErrorFill } from '../../icons/fill/components/ErrorFill';
import { cn } from '../../lib/utils';

interface ErrorNoticeProps {
  message: string;
  className?: string;
}

export default function ErrorNotice({ message, className }: ErrorNoticeProps) {
  return (
    <p
      className={cn(
        'text-jp-caption3 mt-[0.8rem] flex items-center text-[color:var(--color-red)]',
        className
      )}
    >
      <SvgErrorFill className="fill-color-red mr-[0.5rem]" size={16} />
      {message}
    </p>
  );
}
