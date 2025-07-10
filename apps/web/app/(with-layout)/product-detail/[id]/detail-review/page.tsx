export default async function DeleteReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>리뷰 삭제 페이지 - 상품 ID: {id}</h1>
      <p>실제 리뷰 삭제 페이지입니다.</p>
    </div>
  );
}
