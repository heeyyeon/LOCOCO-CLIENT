import { cva } from 'class-variance-authority';
import * as React from 'react';
import { SvgErrorFill } from '../../icons/fill/components/ErrorFill';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  error?: string;
}

const inputVariants = cva('w-[25.5rem] focus:outline-none', {
  variants: {
    variant: {
      default:
        'h-[3.25rem] border-b border-b-gray-400 text-jp-body2 hover:border-b-pink-500 focus:border-b-pink-500',
      search: 'h-[4rem] text-right text-jp-title1 font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function Input({
  variant = 'default',
  error,
  className,
  ...props
}: InputProps) {
  const classes = cn(inputVariants({ variant }), className);

  return (
    <div>
      <input className={classes} {...props} />
      {error && (
        <p className="text-jp-caption3 mt-[0.5rem] flex items-center text-[color:var(--color-red)]">
          <SvgErrorFill className="mr-[0.5rem] h-[0.83rem] w-[0.83rem] fill-[color:var(--color-red)]" />
          {error}
        </p>
      )}
    </div>
  );
}
