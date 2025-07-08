import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rounded?: boolean;
  color: 'primary' | 'secondary';
  variant: 'filled' | 'outline' | 'text';
  size: 'lg' | 'md' | 'sm';
}

const baseButtonStyle = 'px-[3.2rem] py-[1rem] gap-[0.8rem]';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold',
  {
    variants: {
      variant: {
        filled: '',
        outline: 'bg-transparent border-b',
        text: 'bg-transparent',
      },
      color: {
        primary: '',
        secondary: '',
      },
      rounded: {
        true: 'rounded-[0.8rem]',
        false: '',
      },
      size: {
        lg: `h-[6rem] ${baseButtonStyle}`,
        md: `h-[5.2rem] ${baseButtonStyle}`,
        sm: `h-[3.2rem] px-[1.6rem] py-[1rem] gap-[0.8rem]`,
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'primary',
        class: 'bg-pink-500 text-white',
      },
      {
        variant: 'filled',
        color: 'secondary',
        class: 'bg-pink-100 text-pink-500',
      },
      {
        variant: 'outline',
        color: 'primary',
        class:
          'border-pink-500 text-pink-500 hover:bg-pink-100 hover:text-pink-500 hover:border-pink-500',
      },
      {
        variant: 'text',
        color: 'primary',
        class: 'text-pink-500',
      },
      {
        variant: 'text',
        color: 'secondary',
        class: 'text-gray-800',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'primary',
      size: 'md',
      rounded: false,
    },
  }
);

export default function Button({
  variant,
  color,
  size,
  iconLeft,
  iconRight,
  children,
  className,
  rounded = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, color, size, rounded }),
        className
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
