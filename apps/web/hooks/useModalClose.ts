import { useRouter } from 'next/navigation';

export const useModalClose = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return { handleClose };
};
