/* eslint-disable import/namespace */
import { z } from 'zod';

const createProductImageRequestSchema = () =>
  z.object({
  url: z.string().min(1, '상품 사진을 업로드해주세요'),
  displayOrder: z.number().int().min(0),
  imageType: z.enum(['DETAIL']),
});

export const createProductRegistrationSchema = () => {
  const productImageRequestSchema = createProductImageRequestSchema();

  return z.object({
    productName: z
      .string()
      .min(1, '상품 이름을 입력해주세요')
      .max(30, '상품 이름은 최대 30자까지 입력 가능합니다'),
    brand: z.string().min(1, '브랜드를 선택해주세요'),
    price: z
      .string()
    .min(1, '상품 가격을 입력해주세요')
    .max(10, '최대 10자 이내로 입력해주세요'),
    capacity: z
      .string()
    .min(1, '상품 용량을 입력해주세요')
    .max(20, '최대 20자 이내로 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  productManufacturingDate: z.object({
    year: z.string().min(1, '상품 제조 날짜를 선택해주세요'),
    month: z.string().min(1, '상품 제조 날짜를 선택해주세요'),
    day: z.string().min(1, '상품 제조 날짜를 선택해주세요'),
  }),
    productDescription: z
      .string()
      .max(5000, '최대 5000자 이내로 입력해주세요')
      .default(''),
    productComposition: z
      .string()
      .max(5000, '최대 5000자 이내로 입력해주세요')
      .default(''),
    productImageFiles: z
      .array(productImageRequestSchema)
    .min(1, '상품 사진을 1장 이상 업로드해주세요')
    .max(5, '상세 사진은 최대 5장까지 업로드 가능합니다'),
});
};

export type ProductRegistrationFormData = z.infer<
  ReturnType<typeof createProductRegistrationSchema>
>;
