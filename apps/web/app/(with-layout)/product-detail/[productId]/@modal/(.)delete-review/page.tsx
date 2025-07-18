'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import Modal from 'components/modal/modal';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '@lococo/design-system';
import { deleteReview } from '../../apis';
import { PRODUCT_DETAIL_QUERY_KEYS } from '../../queries';

export default function DeleteReviewModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const reviewId = searchParams.get('reviewId');

  const queryClient = useQueryClient();

  const { mutate: reviewDeleteMutation } = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRODUCT_DETAIL_QUERY_KEYS.REVIEW_LIST(
          Number(params.productId)
        ),
      });
    },
  });

  const handleDelete = async () => {
    reviewDeleteMutation(Number(reviewId));
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Modal className="w-[40rem]">
      <Modal.Header className="h-[4.8rem] font-[700]">
        <h1 className="en-body1">レビューを削除</h1>
      </Modal.Header>
      <Modal.Body className="h-[9.4rem] gap-[0.8rem] p-[1.6rem]">
        <p className="jp-title2 font-bold">レビューを削除しますか？</p>
        <p className="jp-caption3 text-gray-00 font-[400]">
          削除すると、このレビューは元に戻せません。
        </p>
      </Modal.Body>
      <Modal.Footer className="mb-[1.6rem] justify-center gap-[1.2rem]">
        <div className="flex gap-[1.2rem]">
          <Button
            color="secondary"
            variant="filled"
            size="lg"
            rounded={true}
            className="jp-title2 w-[17.8rem] text-pink-500"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
          <Button
            color="primary"
            variant="filled"
            size="lg"
            rounded={true}
            className="jp-title2 w-[17.8rem] text-white"
            onClick={handleDelete}
          >
            削除
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
