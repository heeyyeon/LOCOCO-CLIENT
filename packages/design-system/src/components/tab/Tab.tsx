import { ComponentProps, ReactNode } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';

interface TabProps
  extends ComponentProps<'button'>,
    VariantProps<typeof tabVariants> {
  label: string;
  value: string;
  className?: string;
}

interface TabContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'vertical' | 'horizontal';
}

const tabVariants = cva(
  'inter-title2 h-[4.6rem] cursor-pointer bg-white p-[0.8rem] font-[700]',
  {
    variants: {
      variant: {
        horizontal: '',
        vertical: '',
      },
      selected: {
        true: 'text-pink-500',
        false: '',
      },
    },
    compoundVariants: [
      {
        selected: false,
        variant: 'horizontal',
        className: 'text-gray-500',
      },
      {
        selected: false,
        variant: 'vertical',
        className: 'text-gray-700',
      },
    ],
    defaultVariants: {
      variant: 'horizontal',
      selected: false,
    },
  }
);

function Tab({ label, selected, variant, className, ...props }: TabProps) {
  return (
    <button
      type="button"
      className={cn(tabVariants({ selected, variant }), className)}
      {...props}
    >
      {label}
    </button>
  );
}

function TabContainer({
  children,
  className,
  variant = 'horizontal',
}: TabContainerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[1rem]',
        variant === 'vertical' && 'flex-col',
        className
      )}
    >
      {children}
    </div>
  );
}

export { Tab, TabContainer };
