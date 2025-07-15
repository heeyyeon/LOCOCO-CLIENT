import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

interface IconButtonProps
  extends Omit<React.ComponentProps<'button'>, 'color' | 'size'>,
    VariantProps<typeof iconButtonVariants> {
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

const iconButtonVariants = cva(
  'flex items-center justify-center hover:cursor-pointer',
  {
    variants: {
      color: {
        primary: 'text-pink-500',
        secondary: 'text-gray-800',
        tertiary: 'text-gray-500',
      },
      size: {
        sm: 'p-[0.8rem] [&>svg]:w-[1.6rem] [&>svg]:h-[1.6rem]',
        md: 'p-[1rem] [&>svg]:w-[2.4rem] [&>svg]:h-[2.4rem]',
        lg: 'p-[1.4rem] [&>svg]:w-[3.6rem] [&>svg]:h-[3.6rem]',
      },
      rounded: {
        true: 'rounded-full shadow-button hover:text-pink-500 disabled:cursor-default disabled:text-gray-500 transition-colors duration-300',
      },
    },
    defaultVariants: {
      color: 'secondary',
      size: 'md',
    },
  }
);

export default function IconButton({
  color = 'secondary',
  size = 'md',
  icon,
  className,
  rounded = false,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        iconButtonVariants({
          color,
          size,
          rounded,
        }),
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
