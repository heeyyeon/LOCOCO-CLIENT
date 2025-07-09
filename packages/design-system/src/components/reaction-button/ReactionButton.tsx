import { Toggle } from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

interface ReactionButtonProps
  extends ComponentProps<typeof Toggle>,
    VariantProps<typeof reactionButtonVariants> {
  variant: 'vertical' | 'horizontal';
}

const reactionButtonVariants = cva(
  'transition-colors duration-300 hover:cursor-pointer',
  {
    variants: {
      variant: {
        vertical:
          'bg-transparent flex size-[6.4rem] gap-[0.4rem] px-[1rem] flex-col justify-center items-center shrink-0 hover:text-gray-400',
        horizontal:
          'inline-flex h-[3.6rem] px-[1.6rem] justify-center items-center gap-[0.4rem] shrink-0 rounded-full border hover:border-gray-300 hover:text-gray-500 hover:bg-white',
      },
      active: {
        true: '!text-pink-500',
      },
    },
    compoundVariants: [
      {
        variant: 'horizontal',
        active: true,
        class: 'border-pink-500 bg-pink-100',
      },
    ],
    defaultVariants: {
      variant: 'vertical',
      active: false,
    },
  }
);

export default function ReactionButton({
  variant = 'vertical',
  className,
  children,
  pressed,
  ...props
}: ReactionButtonProps) {
  return (
    <Toggle
      className={cn(
        reactionButtonVariants({ active: pressed, variant }),
        className
      )}
      {...props}
    >
      {children}
    </Toggle>
  );
}

export { reactionButtonVariants };
