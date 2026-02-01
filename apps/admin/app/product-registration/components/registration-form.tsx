'use client';

import { useState } from 'react';
import { Button } from '@lococo/design-system/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@lococo/design-system/dialog';
import { ModalButton } from '@lococo/design-system/modal-button';
import { ModalHeader } from '@lococo/design-system/modal-header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { ProductInfo } from './product-info';
import ProductImageUpload from './product-image-upload';
import {
  createProductRegistrationSchema,
  type ProductRegistrationFormData,
} from '../schema/product-registration-schema';
import { transformFormDataToApiData } from '../utils/api-transformers';
import { useProductRegistration } from '../hooks/useProductRegistration';

export default function RegistrationForm() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const schema = createProductRegistrationSchema();
  const form = useForm<ProductRegistrationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    mode: 'onChange',
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

  const productRegistrationMutation = useProductRegistration({
    onSuccess: () => {
      setIsSuccessModalOpen(true);
    },
  });

  const handleSubmitForm = (data: ProductRegistrationFormData) => {
    const requestData = transformFormDataToApiData(data);
    productRegistrationMutation.mutate(requestData);
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    form.reset();
  };

  return (
    <>
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

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent
          className="w-full max-w-[55rem] overflow-hidden rounded-[3.2rem] p-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only hidden">상품 등록 완료</DialogTitle>
          <ModalHeader text="상품 등록 완료" />

          <section className="bg-white px-[4rem] py-[7rem]">
            <div className="text-center">
              <div className="body3 whitespace-pre-line font-medium text-gray-800">
                상품이 성공적으로 등록되었습니다!
              </div>
            </div>
          </section>

          <div className="flex items-center border-t border-pink-500">
            <ModalButton
              text="확인"
              variant="default"
              onClick={handleCloseModal}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}