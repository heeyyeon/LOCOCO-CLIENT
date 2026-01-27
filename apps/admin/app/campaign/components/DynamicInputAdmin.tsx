'use client';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Input } from '@lococo/design-system/input';
import { SvgMinusButtons, SvgPlusButtons } from '@lococo/icons';

type DynamicFieldName =
  | 'participationRewards'
  | 'deliverableRequirements'
  | 'eligibilityRequirements';

interface DynamicInputAdminProps {
  fieldName: DynamicFieldName;
  isReadonly?: boolean;
}

/**
 * Admin 캠페인 상세에서 사용되는 동적 텍스트 배열 입력 컴포넌트
 * web의 create-campaign DynamicInput(dyanmic-inpt) 패턴을 참고한 구현입니다.
 */
export default function DynamicInputAdmin({
  fieldName,
  isReadonly = false,
}: DynamicInputAdminProps) {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const handleAdd = () => {
    append('');
  };

  const handleRemove = (index: number) => {
    if (fields.length <= 1) return;
    remove(index);
  };

  return (
    <div className="space-y-[0.8rem]">
      {fields.map((field, index) => {
        const isLast = index === fields.length - 1;

        return (
          <div key={field.id ?? index} className="flex gap-[0.8rem]">
            <Input
              className="h-[4rem] w-full"
              placeholder={isReadonly ? undefined : '내용을 입력하세요'}
              maxLength={100}
              {...register(`${fieldName}.${index}` as const)}
              disabled={isReadonly}
              readOnly={isReadonly}
            />
            {!isReadonly && isLast && (
              <button
                type="button"
                onClick={handleAdd}
                className="flex-shrink-0"
              >
                <SvgPlusButtons className="h-8 w-8 fill-pink-500" />
              </button>
            )}
            {!isReadonly && fields.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="flex-shrink-0"
              >
                <SvgMinusButtons className="h-8 w-8 fill-gray-400" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
