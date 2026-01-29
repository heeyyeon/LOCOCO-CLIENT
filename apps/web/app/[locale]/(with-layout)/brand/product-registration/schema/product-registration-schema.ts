import { z } from 'zod';

type TranslationFunction = (key: string) => string;

const createProductImageRequestSchema = (t: TranslationFunction) => z.object({
  url: z.string().min(1, t('errorMessage.imageUploadRequired')),
  displayOrder: z.number().int().min(0),
  imageType: z.enum(['DETAIL']),
});

export const createProductRegistrationSchema = (t: TranslationFunction) => {
  const productImageRequestSchema = createProductImageRequestSchema(t);

  return z.object({
    productName: z.string()
      .min(1, t('errorMessage.productNameRequired'))
      .max(15, t('errorMessage.productNameMaxLength')),
    brand: z.string()
      .min(1, t('errorMessage.brandRequired'))
      .max(15, t('errorMessage.brandMaxLength')),
    price: z.string()
      .min(1, t('errorMessage.priceRequired'))
      .max(10, t('errorMessage.priceMaxLength')),
    capacity: z.string()
      .min(1, t('errorMessage.capacityRequired'))
      .max(20, t('errorMessage.capacityMaxLength')),
    category: z.string().min(1, t('errorMessage.categoryRequired')),
    productManufacturingDate: z.object({
      year: z.string().min(1, t('errorMessage.mftDateRequired')),
      month: z.string().min(1, t('errorMessage.mftDateRequired')),
      day: z.string().min(1, t('errorMessage.mftDateRequired')),
    }),
    productDescription: z.string()
      .min(1, t('errorMessage.descriptionRequired'))
      .max(5000, t('errorMessage.descriptionMaxLength')),
    productComposition: z.string()
      .min(1, t('errorMessage.compositionRequired'))
      .max(5000, t('errorMessage.compositionMaxLength')),
    productImageFiles: z.array(productImageRequestSchema)
      .min(1, t('errorMessage.imageRequired'))
      .max(5, t('errorMessage.imageMaxFiles')),
  });
};

export type ProductRegistrationFormData = z.infer<
  ReturnType<typeof createProductRegistrationSchema>
>;
