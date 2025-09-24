import { useEffect, useState } from 'react';

import {
  completeCreatorSignup,
  getCreatorSnsStatus,
} from '../../apis/creator-form';

export const useSnsStatus = () => {
  const [isInstaConnected, setIsInstaConnected] = useState(false);
  const [isTiktokConnected, setIsTiktokConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connectedSns, setConnectedSns] = useState<('instagram' | 'tiktok')[]>(
    []
  );

  useEffect(() => {
    const fetchSnsStatus = async () => {
      const response = await getCreatorSnsStatus();

      if (response.success && response.data) {
        setIsInstaConnected(response.data.isInstaConnected);
        setIsTiktokConnected(response.data.isTiktokConnected);
      }

      setIsLoading(false);
    };

    fetchSnsStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const connected: ('instagram' | 'tiktok')[] = [];
      if (isInstaConnected) connected.push('instagram');
      if (isTiktokConnected) connected.push('tiktok');
      setConnectedSns(connected);
    }
  }, [isInstaConnected, isTiktokConnected, isLoading]);

  const handleConnectSns = (sns: 'instagram' | 'tiktok') => {
    setConnectedSns((prev) => [...prev, sns]);
  };

  const handleCompleteSignup = async () => {
    const response = await completeCreatorSignup();
    return response;
  };

  return {
    isInstaConnected,
    isTiktokConnected,
    isLoading,
    connectedSns,
    handleConnectSns,
    handleCompleteSignup,
  };
};
