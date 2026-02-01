'use client';

import { Button } from '@lococo/design-system/button';
import { FormProvider, useForm, type Path } from 'react-hook-form';

import { ProductInfo } from './product-info';
import ProductImageUpload from './product-image-upload';
import {
  createProductRegistrationSchema,
  type ProductRegistrationFormData,
} from '../schema/product-registration-schema';
import { transformFormDataToApiData } from '../utils/api-transformers';
import { useProductRegistration } from '../hooks/useProductRegistration';

export default function RegistrationForm() {
  const form = useForm<ProductRegistrationFormData>({
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
    const schema = createProductRegistrationSchema();
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.') as Path<ProductRegistrationFormData>;
        form.setError(path, { message: issue.message });
      });
      return;
    }

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
          <div className="mt-[3.2rem] flex w-[84rem] justify-center">
            <Button
              type="submit"
              variant="filled"
              size="lg"
              color="primary"
              className="max-w-[41.2rem]"
            >
              상품 등록하기
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}