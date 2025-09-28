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
          props.checked && !props.disabled
            ? '#ff488f'
            : props.disabled
              ? '#f5f5f5'
              : 'transparent',
      }}
      className={cn(
        'flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-[0.6rem] border border-gray-400 data-[state=checked]:border-none',
        props.disabled && 'border-gray-300',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          'flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-[0.6rem] transition-none data-[state=checked]:bg-pink-500',
          props.disabled && 'bg-gray-200'
        )}
      >
        <SvgCheck
          className={cn('fill-white', props.disabled && 'fill-gray-500')}
          size={16}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
