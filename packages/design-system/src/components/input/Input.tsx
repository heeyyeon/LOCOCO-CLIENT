import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'default' | 'search';
}

const inputVariants = cva('w-[40.8rem] focus:outline-none', {
  variants: {
    type: {
      default:
        'h-[5.2rem] border-b border-b-gray-400 text-jp-body2 hover:border-b-pink-500 focus:border-b-pink-500',
      search: 'h-[6.4rem] text-right text-jp-title1 font-bold focus:bg-gray-50',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export default function Input({
  type = 'default',
  className,
  ...props
}: InputProps) {
  return (
    <input className={cn(inputVariants({ type }), className)} {...props} />
  );
}
