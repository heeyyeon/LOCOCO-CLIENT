export interface ProductDetailResponse {
  data: ProductDetailData;
  message: string;
  status: number;
  success: boolean;
}

export interface ProductDetailData {
  /** @format int64 */
  productId: number;
  imageUrls: string[];
  productOptions: ProductOptionResponse[];
  productName: string;
  brandName: string;
  unit: string;
  /** @format int64 */
  reviewCount: number;
  /** @format double */
  rating: number;
  starPercent: ScorePercent[];
  isLiked: boolean;
  /** @format int64 */
  normalPrice: number;
  productDetail: string;
  ingredients: string;
  oliveYoungUrl: string;
  q10Url: string;
  middleCategory: 'FACIAL_CARE' | 'FACE_MAKEUP' | 'EYE_MAKEUP' | 'LIP_MAKEUP';
  subCategory:
    | 'TONER'
    | 'MOISTURIZER'
    | 'ESSENCE_SERUM'
    | 'CREAM'
    | 'FOUNDATION'
    | 'POWDER_COMPACT'
    | 'CONCEALER'
    | 'BLUSHER'
    | 'EYEBROW'
    | 'EYESHADOW'
    | 'EYELINER'
    | 'LIPSTICK'
    | 'LIP_TINT';
}

export interface ProductOptionResponse {
  /** @format int64 */
  id: number;
  optionName: string;
}

export interface ScorePercent {
  /** @format int32 */
  score: number;
  /** @format double */
  percent: number;
}
