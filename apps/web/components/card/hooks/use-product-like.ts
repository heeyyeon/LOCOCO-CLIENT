import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_QUERIES } from 'app/(with-layout)/(home)/components/home-section-product';
import { apiRequest } from 'app/api/apiRequest';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseProductLikeProps {
  initialIsLiked: boolean;
}

export function useProductLike({ initialIsLiked }: UseProductLikeProps) {
  const router = useRouter();
  function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }
  const userToken = getCookie('AccessToken');
  console.log(userToken);
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
      setIsLiked(!isLiked);
      return { originalState: isLiked };
    },

    onError: (error, _variables, context) => {
      setIsLiked(context?.originalState || false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERIES.ALL });
    },
  });

  const handleLikeClick = async (
    e: React.MouseEvent,
    productId: number,
    userToken?: string | null
  ) => {
    e.stopPropagation();
    if (!userToken) {
      router.push('/login');
      return;
    }
    likeMutation.mutate(productId);
  };

  return {
    isLiked,
    handleLikeClick,
    userToken,
  };
}
