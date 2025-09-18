import { ComponentProps } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { SvgCheck } from './../../icons/fill/components/Check';
import { cn } from './../../lib/utils';

export default function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      style={{
        backgroundColor:
          props.checked && !props.disabled ? '#ff488f' : 'transparent',
      }}
      className={cn(
        'flex h-[2.4rem] w-[2.4rem] items-center justify-center border border-gray-400 data-[state=checked]:border-none',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-[0.6rem] transition-none data-[disabled]:bg-gray-200"
      >
        <SvgCheck
          className={cn('fill-white', props.disabled && 'fill-gray-500')}
          size={16}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
