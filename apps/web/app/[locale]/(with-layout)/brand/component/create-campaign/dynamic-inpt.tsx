import React from 'react';

import { Input } from '@lococo/design-system/input';
import { SvgMinusButtons, SvgPlusButtons } from '@lococo/icons';

interface DynamicInputProps {
  fields: string[];
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
  handleChangeField: (index: number, value: string) => void;
}

export default function DynamicInput({
  fields,
  handleAddField,
  handleChangeField,
  handleRemoveField,
}: DynamicInputProps) {
  return (
    <div className="space-y-[0.8rem]">
      {fields.map((field, index) => {
        const isLastItem = index === fields.length - 1;

        return (
          <div key={index} className="flex gap-[0.8rem]">
            <Input
              className="h-[4rem] w-full"
              placeholder="text"
              value={field}
              onChange={(e) => handleChangeField(index, e.target.value)}
            />
            {isLastItem && (
              <button
                type="button"
                onClick={handleAddField}
                className="flex-shrink-0"
              >
                <SvgPlusButtons size={40} className="fill-pink-500" />
              </button>
            )}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="flex-shrink-0"
              >
                <SvgMinusButtons size={40} className="fill-pink-500" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
