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
        'text-jp-caption3 mt-[0.5rem] flex items-center text-[color:var(--color-red)]',
        className
      )}
    >
      <SvgErrorFill
        width="1.3rem"
        height="1.3rem"
        className="mr-[0.5rem] fill-color-red"
      />
      {message}
    </p>
  );
}
