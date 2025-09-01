import * as React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'Inter' | 'NotoSansKR';
  rightIcon?: React.ReactNode;
  handleRightIconClick?: () => void;
}

const inputVariants = cva('w-full focus:outline-none', {
  variants: {
    type: {
      Inter: 'inter-body3',
      NotoSansKR: 'kr-body3',
    },
  },
  defaultVariants: {
    type: 'Inter',
  },
});

export default function Input({
  type = 'Inter',
  className,
  rightIcon,
  handleRightIconClick,
  ...props
}: InputProps) {
  return (
    <div className="inline-flex w-[40.8rem] items-center justify-start gap-[1rem] border-b border-gray-400 py-[0.8rem] transition-colors duration-200 focus-within:border-pink-500">
      <input className={cn(inputVariants({ type }), className)} {...props} />
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
