import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { SnsConnection } from '../../../../../../components/forms/SnsConnection';

export default function ConnectSNS() {
  const t = useTranslations('creatorSnsLinksPage');

  const [connectedSns, setConnectedSns] = useState<('instagram' | 'tiktok')[]>(
    []
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConnectSns = (sns: 'instagram' | 'tiktok') => {
    setConnectedSns((prev) => [...prev, sns]);
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center bg-gray-100 px-[9.4rem] py-[6.4rem]">
      <div className="flex items-center justify-center bg-white px-[6.4rem] py-[12.8rem]">
        <SnsConnection
          description={t('snsDescription')}
          connectedSns={connectedSns}
          onConnectSns={handleConnectSns}
          hasError={isSubmitted}
          className="w-[84rem]"
        />
      </div>
    </div>
  );
}
