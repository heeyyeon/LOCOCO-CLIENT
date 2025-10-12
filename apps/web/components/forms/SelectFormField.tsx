'use client';

import React from 'react';

import { Select } from '@lococo/design-system/select';
import { cn } from '@lococo/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFormFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  onValueChange?: (value: string) => void;
  error?: string;
  className?: string;
  size?: 'small' | 'default';
  children?: React.ReactNode;
  variant?: 'default' | 'reverse';
  value?: string;
  isReadonly?: boolean;
}

export function SelectFormField({
  label,
  required = false,
  placeholder,
  options,
  onValueChange,
  error,
  className,
  size = 'default',
  children,
  variant = 'default',
  value,
  isReadonly = false,
}: SelectFormFieldProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <label className="body1 flex items-center font-bold text-gray-700">
        { required && (
          <span className="bg-red mr-[0.8rem] h-[0.6rem] w-[0.6rem] rounded-full" />
        )}
        {label}
      </label>
      <div className="flex flex-col">
        {children ? (
          children
        ) : (
          <Select
            placeholder={isReadonly ? undefined : placeholder}
            options={options!}
            value={
              value
                ? options!.find((option) => option.value === value)?.label
                : undefined
            }
            onValueChange={
              isReadonly
                ? undefined
                : (selectedLabel) => {
                    const selectedOption = options!.find(
                      (option) => option.label === selectedLabel
                    );
                    if (selectedOption && onValueChange) {
                      onValueChange(selectedOption.value);
                    }
                  }
            }
            size={size}
            variant={variant}
            isError={isReadonly ? false : !!error}
            errorText={isReadonly ? undefined : error}
            disabled={isReadonly}
          />
        )}
      </div>
    </div>
  );
}