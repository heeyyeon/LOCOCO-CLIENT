import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Select } from '@lococo/design-system/select';
import { Input } from '@lococo/design-system/input';

import { useFormContext } from 'react-hook-form';

import { FormSection } from './form-section';
import { dateOptions } from '../utils/date-options';
import { ProductRegistrationFormData } from '../schema/product-registration-schema';
import { useProductBrandNames } from '../hooks/useProductBrandNames';

interface FieldRowProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function FieldRow({
  label,
  required = false,
  error,
  className,
  children,
}: FieldRowProps) {
  return (
    <div className={`flex items-center justify-between ${className ?? ''}`}>
      <label className="body1 flex items-center font-bold text-gray-700">
        {required && (
          <span className="mr-[0.8rem] h-[0.6rem] w-[0.6rem] rounded-full bg-[#EF4351]" />
        )}
        {label}
      </label>
      <div className="flex flex-col">
        {children}
        {error && <ErrorNotice message={error} />}
      </div>
    </div>
  );
}

export function ProductInfo() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProductRegistrationFormData>();
  const { months, days, years } = dateOptions();

  const { data: brandNamesData, isLoading: isLoadingBrands } = useProductBrandNames();

  const brandOptions = brandNamesData?.data?.brandNames?.map((brand) => ({
    label: brand.productBrandName,
    value: String(brand.productBrandId),
  })) || [];

  const categoryOptions = [
    { label: '에센스/토너', value: 'ESSENCE_TONER' },
    { label: '세럼/앰플', value: 'SERUM_AMPOULE' },
    { label: '크림/로션', value: 'CREAM_LOTION' },
    { label: '클렌저', value: 'CLEANSER' },
    { label: '선케어', value: 'SUNCARE' },
    { label: '기타', value: 'ETC' },
  ];

  return (
    <div className="w-full">
      <FormSection title="상품 정보">
        <div className="space-y-[1.6rem]">
          <FieldRow
            label="상품 이름"
            required
            error={errors.productName?.message}
            className="pt-[4rem]"
          >
            <Input placeholder="Text" {...register('productName')} />
          </FieldRow>

          <FieldRow label="브랜드" required error={errors.brand?.message}>
            <Select
              placeholder="브랜드를 선택해주세요"
              options={brandOptions}
              value={
                watch('brand')
                  ? brandOptions.find((option) => option.value === watch('brand'))
                      ?.label
                  : undefined
              }
              onValueChange={(selectedLabel) => {
                const selectedOption = brandOptions.find(
                  (option) => option.label === selectedLabel
                );
                setValue('brand', selectedOption?.value ?? '', {
                  shouldValidate: true,
                });
              }}
              disabled={isLoadingBrands}
            />
          </FieldRow>

          <FieldRow label="가격" required error={errors.price?.message}>
            <Input placeholder="Text" {...register('price')} />
          </FieldRow>

          <FieldRow label="용량" required error={errors.capacity?.message}>
            <Input placeholder="Text" {...register('capacity')} />
          </FieldRow>

          <FieldRow label="카테고리" required error={errors.category?.message}>
            <Select
              placeholder="카테고리를 선택해주세요"
              options={categoryOptions}
              value={
                watch('category')
                  ? categoryOptions.find(
                      (option) => option.value === watch('category')
                    )?.label
                  : undefined
              }
              onValueChange={(selectedLabel) => {
                const selectedOption = categoryOptions.find(
                  (option) => option.label === selectedLabel
                );
                setValue('category', selectedOption?.value ?? '', {
                  shouldValidate: true,
                });
              }}
       />
          </FieldRow>

          <div className="flex items-center justify-between">
            <label className="body1 flex items-center font-bold text-gray-700">
              <span className="mr-[0.8rem] h-[0.6rem] w-[0.6rem] rounded-full bg-[#EF4351]" />
              제품 제조 날짜
            </label>
            <div className="flex flex-col">
              <div className="flex gap-[2.4rem]">
                <Select
                  placeholder="Month"
                  options={months}
                  value={watch('productManufacturingDate.month')}
                  onValueChange={(selectedLabel) => {
                    const selectedMonth = months.find(
                      (option) => option.label === selectedLabel
                    );
                    setValue(
                      'productManufacturingDate.month',
                      selectedMonth?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
                <Select
                  placeholder="Day"
                  options={days}
                  value={watch('productManufacturingDate.day')}
                  onValueChange={(selectedLabel) => {
                    const selectedDay = days.find(
                      (option) => option.label === selectedLabel
                    );
                    setValue(
                      'productManufacturingDate.day',
                      selectedDay?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
                <Select
                  placeholder="Year"
                  options={years}
                  value={watch('productManufacturingDate.year')}
                  onValueChange={(selectedLabel) => {
                    const selectedYear = years.find(
                      (option) => option.label === selectedLabel
                    );
                    setValue(
                      'productManufacturingDate.year',
                      selectedYear?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
              </div>
              {(errors.productManufacturingDate?.month ||
                errors.productManufacturingDate?.day ||
                errors.productManufacturingDate?.year) && (
                <div className="mt-[0.8rem]">
                  <ErrorNotice
                    message={
                      errors.productManufacturingDate?.month?.message ||
                      errors.productManufacturingDate?.day?.message ||
                      errors.productManufacturingDate?.year?.message ||
                      ''
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <FormSection
            title="상품 상세 설명"
            description="상품 상세 설명을 입력해주세요."
            className="pt-[3.2rem]"
          >
            <Input
            placeholder="Text"
              className="w-full"
              {...register('productDescription')}
            />
          </FormSection>

          <FormSection
            title="상품 성분"
            description="상품 성분에 대해 알려주세요."
            className="pt-[4.8rem]"
          >
            <Input
            placeholder="Text"
              className="w-full"
              {...register('productComposition')}
            />
          </FormSection>
        </div>
      </FormSection>
    </div>
  );
}
