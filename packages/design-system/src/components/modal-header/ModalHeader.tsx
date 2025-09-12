import { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface ModalHeaderProps {
  text: string;
  rightContent?: ReactNode;
}

export default function ModalHeader({
  text,
  rightContent,
  ...props
}: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'relative flex w-[55rem] items-center justify-center rounded-t-[3.2rem] border-b border-pink-500 bg-white p-[1.6rem]'
      )}
      {...props}
    >
      <div className="inter-title2 font-bold text-pink-500">{text}</div>
      {rightContent && (
        <div className="absolute right-[1.6rem] top-[1.6rem] cursor-pointer">
          {rightContent}
        </div>
      )}
    </div>
  );
}
