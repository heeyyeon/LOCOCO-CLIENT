import * as React from 'react';
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
      <SvgErrorFill className="mr-[0.5rem] h-[0.83rem] w-[0.83rem] fill-[color:var(--color-red)]" />
      {message}
    </p>
  );
}
