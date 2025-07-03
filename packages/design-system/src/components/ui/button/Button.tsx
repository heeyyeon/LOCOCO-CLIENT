import { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'large';
}

export default function Button({
  size = 'small',
  disabled = false,
  children,
  ...rest
}: ButtonProps) {
  const baseStyle =
    'rounded-md font-medium bg-pink-200 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white';

  const sizeStyle =
    size === 'large' ? 'text-lg px-6 py-3' : 'text-sm px-4 py-2';

  return (
    <button className={cn(baseStyle, sizeStyle)} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
