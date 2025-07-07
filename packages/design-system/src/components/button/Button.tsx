import { cva, VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  color: 'primary' | 'secondary';
  variant: 'filled' | 'outline' | 'text';
  rounded?: boolean;
  size: 'lg' | 'md' | 'sm';
}

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold',
  {
    variants: {
      variant: {
        filled: '',
        outline: 'bg-transparent',
        text: 'bg-transparent',
      },
      color: {
        primary: '',
        secondary: '',
        default: '',
      },
      rounded: {
        true: 'rounded-[0.8rem]',
        false: '',
      },
      size: {
        lg: 'h-[6rem] px-[3.2rem] py-[1rem] gap-[0.8rem]',
        md: 'h-[5.2rem] px-[3.2rem] py-[1rem] gap-[0.8rem]',
        sm: 'h-[3.2rem] px-[1.6rem] py-[1rem] gap-[0.8rem]',
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
          'border-b border-pink-500 text-pink-500 hover:bg-pink-100 hover:text-pink-500 hover:border-pink-500',
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
  icon,
  iconPosition,
  children,
  className,
  rounded = false,
  ...props
}: ButtonProps) {
  const outlineColor = variant === 'outline' ? 'default' : color;

  return (
    <button
      className={cn(
        buttonVariants({ variant, color: outlineColor, size, rounded }),
        className
      )}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
}
