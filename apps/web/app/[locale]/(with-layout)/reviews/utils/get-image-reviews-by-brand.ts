import { queryOptions } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { REVIEW_KEYS } from 'constants/query-key';
import { ApiResponseBrandImageReviewListResponse } from 'swagger-codegen/data-contracts';

interface GetImageReviewsByBrandProps {
  brandName?: string;
  page?: number;
  size?: number;
}

export const getImageReviewsByBrand = ({
  brandName,
  page = 0,
  size = 8,
}: GetImageReviewsByBrandProps = {}) => {
  return queryOptions<ApiResponseBrandImageReviewListResponse>({
    queryKey: REVIEW_KEYS.BRAND_IMAGE_LIST({ brandName, page, size }),
    queryFn: () =>
      apiRequest<ApiResponseBrandImageReviewListResponse>({
        endPoint: '/api/reviews/brands/images',
        method: 'GET',
        params: {
          ...(brandName && { brandName }),
          page: page.toString(),
          size: size.toString(),
        },
      }),
  });
};
