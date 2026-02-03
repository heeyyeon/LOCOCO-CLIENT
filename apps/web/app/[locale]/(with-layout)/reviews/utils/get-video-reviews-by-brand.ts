import { queryOptions } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { REVIEW_KEYS } from 'constants/query-key';
import { ApiResponseBrandVideoReviewListResponse } from 'swagger-codegen/data-contracts';

interface GetVideoReviewsByBrandProps {
  brandName?: string;
  page?: number;
  size?: number;
}

export const getVideoReviewsByBrand = ({
  brandName,
  page = 0,
  size = 8,
}: GetVideoReviewsByBrandProps = {}) => {
  return queryOptions<ApiResponseBrandVideoReviewListResponse>({
    queryKey: REVIEW_KEYS.BRAND_VIDEO_LIST({ brandName, page, size }),
    queryFn: () =>
      apiRequest<ApiResponseBrandVideoReviewListResponse>({
        endPoint: '/api/reviews/brands/videos',
        method: 'GET',
        params: {
          ...(brandName && { brandName }),
          page: page.toString(),
          size: size.toString(),
        },
      }),
  });
};
