import React from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { SnsConnection } from '../../../../../../components/forms/SnsConnection';
import { useOAuthCallback } from '../../../../../../hooks/use-connect-sns';

export default function ConnectSNS() {
  const t = useTranslations('creatorSnsLinksPage');
  const searchParams = useSearchParams();

  // OAuth 콜백 처리
  const { isProcessingCallback } = useOAuthCallback();

  // URL 파라미터에서 성공/에러 상태 확인
  const isSuccess = searchParams.get('success') === 'true';
  const error = searchParams.get('error');

  if (isProcessingCallback) {
    return (
      <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center justify-center bg-gray-100 px-[9.4rem] py-[6.4rem]">
        <div className="text-lg text-gray-600">SNS 연결을 처리하는 중...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center bg-gray-100 px-[9.4rem] py-[6.4rem]">
      {isSuccess && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
          SNS 연결이 성공적으로 완료되었습니다!
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-800">
          SNS 연결에 실패했습니다. 다시 시도해주세요.
        </div>
      )}
      <div className="flex items-center justify-center bg-white px-[6.4rem] py-[12.8rem]">
        <SnsConnection
          description={t('snsDescription')}
          className="w-[84rem]"
        />
      </div>
    </div>
  );
}
