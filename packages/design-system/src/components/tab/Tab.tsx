import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TabProps
  extends ComponentProps<'button'>,
    VariantProps<typeof tabVariants> {
  label: string;
  className?: string;
}

interface TabContainerProps {
  children: ReactNode;
  className?: string;
}

const tabVariants = cva(
  'inline-flex w-auto items-center justify-center gap-2.5 bg-white px-[2rem] py-[1rem] font-bold cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'h-11 jp-title3  text-gray-500 leading-normal',
        secondary: 'h-14 jp-title2  text-gray-800 leading-relaxed',
      },
      active: {
        true: 'border-b-2 border-solid',
        false: 'border-b border-solid border-gray-300',
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: 'primary',
        className: 'text-pink-500 border-pink-500',
      },
      {
        active: true,
        variant: 'secondary',
        className: 'text-gray-800 border-gray-800',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      active: false,
    },
  }
);
function Tab({ label, active, variant, className, ...props }: TabProps) {
  return (
    <button
      type="button"
      className={cn(tabVariants({ active, variant }), className)}
      {...props}
    >
      {label}
    </button>
  );
}

function TabContainer({ children, className }: TabContainerProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-start overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

export { Tab, TabContainer };
