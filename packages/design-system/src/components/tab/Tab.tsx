import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const tabVariants = cva(
  'inline-flex w-auto items-center justify-center gap-2.5 bg-[color:var(--color-white)] px-5 py-2.5 font-bold',
  {
    variants: {
      active: {
        true: 'border-b-2 border-solid',
        false: 'border-b border-solid border-[color:var(--color-gray-300)]',
      },
      size: {
        base: 'h-11 text-base text-[color:var(--color-gray-500)] leading-normal',
        large:
          'h-14 text-lg text-[color:var(--color-gray-800)] leading-relaxed',
      },
    },
    compoundVariants: [
      {
        active: true,
        size: 'base',
        className:
          'text-[color:var(--color-pink-500)] border-[color:var(--color-pink-500)] border-solid',
      },
      {
        active: true,
        size: 'large',
        className:
          'text-[color:var(--color-gray-800)] border-[color:var(--color-gray-800)] border-solid',
      },
    ],
  }
);

export interface TabProps extends VariantProps<typeof tabVariants> {
  label: string;
  className?: string;
}

export default function Tab({
  label,
  active,
  size = 'base',
  className,
}: TabProps) {
  return (
    <div className={cn(tabVariants({ active, size }), className)}>{label}</div>
  );
}
