import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentProps } from 'react';
import { SvgCheck } from './../../icons/fill/components/Check';
import { cn } from './../../lib/utils';

export default function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'flex size-6 items-center justify-center rounded-[0.25rem] border border-gray-400 data-[state=checked]:border-none',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex size-6 items-center justify-center transition-none"
      >
        <SvgCheck className="size-6 fill-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
