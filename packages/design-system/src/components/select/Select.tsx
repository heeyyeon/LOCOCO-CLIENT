import * as SelectPrimitive from '@radix-ui/react-select';
import { ComponentProps } from 'react';
import { SvgArrowUp, SvgArrowDown } from '../../icons/fill/components';
import { cn } from '../../lib/utils';

function Select({ ...props }: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  open?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        'group flex h-[5.2rem] w-[40.8rem] items-center justify-between gap-[1rem] self-stretch border-b border-gray-400 bg-white pr-[1.2rem] focus:outline-none [&[data-state=open]]:border-pink-500',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <div className="relative">
          <SvgArrowDown className="group-data-[state=open]:hidden" />
          <SvgArrowUp className="inset-0 fill-pink-500 group-data-[state=closed]:hidden" />
        </div>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 w-[var(--radix-select-trigger-width)] overflow-y-auto overflow-x-hidden border-b border-pink-500 bg-pink-100',
          position === 'popper' && 'overflow-y-scroll',
          className
        )}
        style={{
          maxHeight: '19.2rem',
        }}
        position={position}
        avoidCollisions={false}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'w-full',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] scroll-my-1'
          )}
        >
          <SelectGroup>{children}</SelectGroup>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item> & {
  hover?: boolean;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'flex h-[4.4rem] w-full flex-shrink-0 items-center self-stretch border-b border-dashed border-pink-500 bg-pink-100 px-[1.2rem] outline-none ring-0 last:border-none hover:cursor-pointer hover:bg-pink-200 focus:outline-none focus:ring-0',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
