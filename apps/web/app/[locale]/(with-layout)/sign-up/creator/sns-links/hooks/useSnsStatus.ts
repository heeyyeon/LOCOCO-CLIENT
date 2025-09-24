import { useEffect, useState } from 'react';

import { getCreatorSnsStatus } from '../../apis/creator-form';

export const useSnsStatus = () => {
  const [isInstaConnected, setIsInstaConnected] = useState(false);
  const [isTiktokConnected, setIsTiktokConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnsStatus = async () => {
      try {
        const response = await getCreatorSnsStatus();

        if (response.success && response.data) {
          setIsInstaConnected(response.data.isInstaConnected);
          setIsTiktokConnected(response.data.isTiktokConnected);
        }
      } catch (error) {
        console.error('Failed to fetch SNS status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnsStatus();
  }, []);

  return {
    isInstaConnected,
    isTiktokConnected,
    isLoading,
  };
};
