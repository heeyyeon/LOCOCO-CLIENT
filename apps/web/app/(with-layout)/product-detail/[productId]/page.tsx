import { getProductDetail, getYoutubeList } from './apis';
import ClientPage from './page.client';
import { ProductDetailData, YoutubeListData } from './types';

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  let productDetailData = {} as ProductDetailData;
  let youtubeListData = {} as YoutubeListData;
  try {
    const productDetailResponse = await getProductDetail(Number(productId));
    const youtubeListResponse = await getYoutubeList(Number(productId));
    productDetailData = productDetailResponse;
    youtubeListData = youtubeListResponse;
  } catch (error) {
    // TODO: 에러 핸들링 로직 추가
    console.error('API 호출 에러:', error);
  }

  if (!productDetailData) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <ClientPage
      productData={productDetailData}
      youtubeListData={youtubeListData}
    />
  );
}
