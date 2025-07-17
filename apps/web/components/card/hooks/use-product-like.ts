import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_QUERIES } from 'app/(with-layout)/(home)/components/home-section-product';
import { apiRequest } from 'app/api/apiRequest';
import { getCookie } from 'utils/client-cookie';
import { useState, useEffect } from 'react';

interface UseProductLikeProps {
  initialIsLiked: boolean;
}

export function useProductLike({ initialIsLiked }: UseProductLikeProps) {
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

  return {
    likeMutation,
    isLiked,
    handleLikeClick,
    userToken,
  };
}
