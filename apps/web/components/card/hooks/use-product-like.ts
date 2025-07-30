import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_QUERIES } from 'app/(with-layout)/(home)/components/home-section-product';
import { apiRequest } from 'app/api/apiRequest';
import { getCookie } from 'utils/client-cookie';

interface UseProductLikeProps {
  initialIsLiked: boolean;
}

export function useProductLike({ initialIsLiked }: UseProductLikeProps) {
  const router = useRouter();
  const userToken = getCookie('AccessToken');
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const likeMutation = useMutation({
    mutationFn: (productId: number) => {
      return apiRequest({
        endPoint: `/api/likes/products/${productId}`,
        method: 'POST',
      });
    },

    onMutate: async () => {
      const previousState = isLiked;
      setIsLiked((prev) => !prev);
      return { previousState };
    },

    onError: (error, _variables, context) => {
      setIsLiked(context?.previousState || false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERIES.ALL });
    },
  });

  const handleLikeClick = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    likeMutation.mutate(productId);
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return {
    likeMutation,
    isLiked,
    handleLikeClick,
    userToken,
    goToLogin,
  };
}
