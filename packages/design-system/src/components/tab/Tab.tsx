import { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface TabProps {
  label: string;
  isClick: boolean;
  handleClick: () => void;
}

interface TabContainerProps {
  children: ReactNode;
  className?: string;
}

function Tab({ label, isClick, handleClick, ...props }: TabProps) {
  return (
    <button
      type="button"
      className={cn(
        'inter-title2 h-[4.6rem] cursor-pointer bg-white p-[0.8rem] text-gray-500',
        isClick && 'text-pink-500'
      )}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
}

function TabContainer({ children, className }: TabContainerProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-[1rem]', className)}
    >
      {children}
    </div>
  );
}

export { Tab, TabContainer };
