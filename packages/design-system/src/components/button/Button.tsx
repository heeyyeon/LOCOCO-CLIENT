import { cva, VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
  fontClassName: string;
  color: 'primary' | 'secondary' | 'default';
  variant: 'filled' | 'outline' | 'text';
  shape: 'default' | 'round';
  size: 'large' | 'medium' | 'small';
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
      shape: {
        default: '',
        round: 'rounded-[0.5rem]',
      },
      size: {
        large: 'h-[3.75rem] px-[2rem] py-[0.625rem] gap-[0.5rem]',
        medium: 'h-[3.25rem] px-[2rem] py-[0.625rem] gap-[0.5rem]',
        small: 'h-[2rem] px-[1rem] py-[0.625rem] gap-[0.5rem]',
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
        color: 'default',
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
  }
);

export default function Button({
  variant,
  color,
  shape,
  size,
  icon,
  iconPosition,
  children,
  className,
  fontClassName,
  ...props
}: ButtonProps) {
  const outlineColor = variant === 'outline' ? 'default' : color;

  return (
    <button
      className={cn(
        buttonVariants({ variant, color: outlineColor, shape, size }),
        fontClassName,
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex items-center">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="flex items-center">{icon}</span>
      )}
    </button>
  );
}
