'use client';

import { Button } from '@lococo/design-system/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ProductInfo } from './product-info';
import ProductImageUpload from './product-image-upload';
import {
  createProductRegistrationSchema,
  type ProductRegistrationFormData,
} from '../schema/product-registration-schema';
import { transformFormDataToApiData } from '../utils/api-transformers';
import { useProductRegistration } from '../hooks/useProductRegistration';

export default function RegistrationForm() {
  const t = useTranslations('brandProductRegistration');
  const form = useForm<ProductRegistrationFormData>({
    resolver: zodResolver(createProductRegistrationSchema(t)),
    defaultValues: {
      productName: '',
      brand: '',
      price: '',
      capacity: '',
      category: '',
      productManufacturingDate: {
        year: '',
        month: '',
        day: '',
      },
      productDescription: '',
      productComposition: '',
      productImageFiles: [],
    },
  });

  const productRegistrationMutation = useProductRegistration();

  const handleSubmitForm = (data: ProductRegistrationFormData) => {
    const requestData = transformFormDataToApiData(data);
    productRegistrationMutation.mutate(requestData);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex h-full w-full items-center justify-center bg-gray-100 p-[6.4rem]"
      >
        <div className="bg-gray-100">
          <div className="flex min-h-[117.5rem] w-[84rem] flex-col bg-white px-[9.6rem] py-[4.8rem]">
            <ProductInfo />
            <ProductImageUpload />
          </div>
          <div className="mt-[3.2rem] flex gap-[1.6rem]">
            <Button
              type="button"
              variant="outline"
              size="lg"
              color="secondary"
              className="w-[41.2rem]"
            >
              {t('buttons.save')}
            </Button>
            <Button
              type="submit"
              variant="filled"
              size="lg"
              color="primary"
              className="w-[41.2rem]"
            >
              {t('buttons.register')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}