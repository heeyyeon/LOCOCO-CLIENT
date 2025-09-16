import * as React from 'react';

import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
  handleRightIconClick?: () => void;
}

export default function Input({
  className,
  rightIcon,
  handleRightIconClick,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        'inline-flex w-[40.8rem] items-center justify-start gap-[1rem] border-b border-gray-400 py-[0.8rem] transition-colors duration-200 focus-within:border-pink-500',
        className
      )}
    >
      <input className={className} {...props} />
      {rightIcon && (
        <div
          onClick={handleRightIconClick}
          className="flex cursor-pointer items-center justify-center"
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
}
