import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

interface IconButtonProps
  extends Omit<React.ComponentProps<'button'>, 'color' | 'size'>,
    VariantProps<typeof iconButtonVariants> {
  icon?: React.ElementType;
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

const iconButtonVariants = cva(
  'flex items-center justify-center disabled:cursor-not-allowed hover:cursor-pointer',
  {
    variants: {
      color: {
        primary: 'text-pink-500',
        secondary: 'text-gray-500',
        tertiary: 'text-gray-800',
      },
      size: {
        sm: 'p-[0.5rem] size-[2rem]',
        md: 'p-[0.625rem] size-[2.75rem]',
        lg: 'p-[0.875rem] size-[4rem]',
      },
      rounded: {
        true: 'rounded-full shadow-button hover:text-pink-500 clicked:text-pink-500 transition-colors duration-300',
      },
    },
    defaultVariants: {
      color: 'secondary',
      size: 'md',
    },
  }
);

const iconSize = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2.25rem',
};

export default function IconButton({
  color = 'secondary',
  size = 'md',
  icon: Icon,
  className,
  rounded = false,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(iconButtonVariants({ color, size, rounded }), className)}
      {...props}
    >
      {Icon ? <Icon size={iconSize[size]} /> : null}
    </button>
  );
}
