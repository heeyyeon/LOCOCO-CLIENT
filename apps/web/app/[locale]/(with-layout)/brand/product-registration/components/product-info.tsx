import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Select } from '@lococo/design-system/select';
import { Input } from '@lococo/design-system/input';
import { useTranslations } from 'next-intl';

import { FormSection, SelectFormField, TextFormField } from 'components/forms';

import { useFormContext } from 'react-hook-form';

import { dateOptions } from 'utils';

import { ProductRegistrationFormData } from '../schema/product-registration-schema';
import { useProductBrandNames } from '../hooks/useProductBrandNames';

export function ProductInfo() {
  const t = useTranslations('brandProductRegistration');
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
      <FormSection title={t('productInfo.title')}>
        <div className="space-y-[1.6rem]">
          <TextFormField
            label={t('productInfo.productName')}
            required
            placeholder="Text"
            className="pt-[4rem]"
            register={register('productName')}
            error={errors.productName?.message}
          />
          <SelectFormField
            label={t('productInfo.brand')}
            required
            options={brandOptions}
            value={watch('brand')}
            onValueChange={(value) => {
              setValue('brand', value, {
                shouldValidate: true,
              });
            }}
            error={errors.brand?.message}
            isReadonly={isLoadingBrands}
          />
          <TextFormField
            label={t('productInfo.price')}
            required
            placeholder="Text"
            register={register('price')}
            error={errors.price?.message}
          />

          <TextFormField
            label={t('productInfo.capacity')}
            required
            placeholder="Text"
            register={register('capacity')}
            error={errors.capacity?.message}
          />
          <SelectFormField
            label={t('productInfo.category')}
            required
            options={categoryOptions}
            value={watch('category')}
            onValueChange={(value) => {
              setValue('category', value, {
                shouldValidate: true,
              });
            }}
            error={errors.category?.message}
          />
          <SelectFormField label={t('productInfo.mftDate')} required>
            <div className="flex flex-col">
              <div className="flex gap-[2.4rem]">
                <Select
                  placeholder={t('productInfo.mftDatePlaceholder.month')}
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
                  placeholder={t('productInfo.mftDatePlaceholder.day')}
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
                  placeholder={t('productInfo.mftDatePlaceholder.year')}
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
          </SelectFormField>

          <FormSection
            title={t('productInfo.description.title')}
            description={t('productInfo.description.description')}
            className="pt-[3.2rem]"
          >
            <Input
              placeholder="Text"
              className="w-full"
              {...register('productDescription')}
            />
          </FormSection>

          <FormSection
            title={t('productInfo.composition.title')}
            description={t('productInfo.composition.description')}
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
