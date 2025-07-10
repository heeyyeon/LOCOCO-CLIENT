'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@lococo/design-system';

interface PageProps {
  params: Promise<{ id: string }>;
}
export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const handleModalClick = () => {
    router.push(`/product-detail/${id}/write-review`);
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">상품 상세 페이지</h1>
      <p className="mb-4">상품 ID: {id}</p>

      <Button
        onClick={handleModalClick}
        variant="filled"
        size="lg"
        color="primary"
      >
        리뷰 쓰기
      </Button>
    </div>
  );
}
