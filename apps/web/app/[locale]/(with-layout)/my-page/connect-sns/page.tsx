'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import CampaignListEmpty from 'components/empty/campgin-list-empty';
import LoadingSvg from 'components/loading/loading-svg';

import { SnsConnection } from '../../../../../components/forms/SnsConnection';
import { useOAuthCallback } from '../../../../../hooks/use-connect-sns';
import { useSnsConnection } from '../apis/use-sns-connection';

export default function ConnectSNS() {
  const t = useTranslations('creatorSnsLinksPage');
  const searchParams = useSearchParams();
  const { data: snsConnectionData } = useSnsConnection();
  console.log(snsConnectionData);

  // OAuth 콜백 처리
  const { isProcessingCallback } = useOAuthCallback();

  const error = searchParams.get('error');

  if (isProcessingCallback) {
    return <LoadingSvg />;
  }

  if (error) {
    return <CampaignListEmpty emptyMessage={t('error')} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center bg-gray-100 px-[9.4rem] py-[6.4rem]">
      <div className="flex items-center justify-center bg-white px-[6.4rem] py-[12.8rem]">
        <SnsConnection
          description={t('snsDescription')}
          className="w-[84rem]"
          instagramUrl={snsConnectionData?.data?.instaLink}
          tiktokUrl={snsConnectionData?.data?.tiktokLink}
        />
      </div>
    </div>
  );
}
