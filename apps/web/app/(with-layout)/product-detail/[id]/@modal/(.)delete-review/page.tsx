import Modal from 'components/modal/modal';
import React from 'react';
import { Button } from '@/components';

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
    <Modal className="w-[40rem]">
      <Modal.Header className="h-[4.8rem] font-[700]">
        <h1 className="en-body1">レビューを削除</h1>
      </Modal.Header>
      <Modal.Body className="h-[9.4rem] gap-[0.8rem] p-[1.6rem]">
        <p className="jp-title2 font-[700]">レビューを削除しますか？</p>
        <p className="jp-caption3 text-gray-00 font-[400]">
          削除すると、このレビューは元に戻せません。
        </p>
      </Modal.Body>
      <Modal.Footer className="mb-[1.6rem] justify-center gap-[1.2rem]">
        <Button
          color="secondary"
          variant="filled"
          size="lg"
          rounded={true}
          className="jp-title2 w-[17.8rem] text-pink-500"
        >
          削除
        </Button>
        <Button
          color="primary"
          variant="filled"
          size="lg"
          rounded={true}
          className="jp-title2 w-[17.8rem] text-white"
        >
          キャンセル
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
