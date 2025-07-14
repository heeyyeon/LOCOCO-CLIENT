import { getProductDetail } from './apis';
import ClientPage from './page.client';

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  let productData;
  try {
    const responseData = await getProductDetail(Number(productId));
    productData = responseData;
  } catch (error) {
    // TODO: 에러 핸들링 로직 추가
    console.error('API 호출 에러:', error);
  }

  if (!productData) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return <ClientPage productData={productData} />;
}
