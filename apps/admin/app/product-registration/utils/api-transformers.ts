import {
  AdminProductCreateRequest,
  ProductImageRequest,
} from '../../../../web/swagger-codegen/data-contracts';
import { ProductRegistrationFormData } from '../schema/product-registration-schema';

export const transformFormDataToApiData = (
  formData: ProductRegistrationFormData
): AdminProductCreateRequest => {
  const manufacturedAt = new Date(
    parseInt(formData.productManufacturingDate.year),
    parseInt(formData.productManufacturingDate.month) - 1,
    parseInt(formData.productManufacturingDate.day)
  ).toISOString();

  const images = formData.productImageFiles.map((image, index) => ({
    url: image.url.split('?')[0],
    displayOrder: image.displayOrder ?? index,
  }));

  return {
    productName: formData.productName,
    productBrandId: parseInt(formData.brand),
    normalPrice: parseInt(formData.price.replace(/,/g, '')),
    unit: formData.capacity,
    category: formData.category as AdminProductCreateRequest['category'],
    manufacturedAt,
    productDetail: formData.productDescription || undefined,
    ingredients: formData.productComposition || undefined,
    images: images as ProductImageRequest[],
  };
};