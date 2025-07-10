import Modal from 'components/modal/modal';
import React from 'react';

export default async function DeleteReviewModal({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reviewId?: string }>;
}) {
  const { id } = await params;
  const { reviewId } = await searchParams;
  console.log(id, reviewId);
  return (
    <div>
      <Modal>
        <Modal.Header>
          <h1 className="h-10 w-10 bg-pink-500">제목 어쩌구저쩌구</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="h-10 w-10 bg-pink-300">어쩌구저쩌구 응가응가</div>
        </Modal.Body>
        <Modal.Footer>
          <div className="h-10 w-10 bg-pink-600">어쩌구저쩌구</div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
