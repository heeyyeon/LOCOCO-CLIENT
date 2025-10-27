import { useState } from 'react';

import { useTranslations } from 'next-intl';

// import LoadingSvg from 'components/loading/loading-svg';
// import {
//   useConnectInstagram,
//   useConnectSns,
//   useConnectTiktok,
// } from 'hooks/use-connect-sns';

// import { Button } from '@lococo/design-system/button';
import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input';

// import { SvgCheckBg, SvgCheckNonBg } from '@lococo/icons';

import { FormSection } from './FormSection';

export type SnsPlatform = 'instagram' | 'tiktok';

interface SnsConnectionSectionProps {
  title?: string;
  description?: string;
  hasError?: boolean;
  errorMessage?: string;
  customErrorMessage?: string;
  platforms?: SnsPlatform[];
  className?: string;
  onInstagramChange?: (value: string) => void;
  onTiktokChange?: (value: string) => void;
  instagramUrl?: string;
  tiktokUrl?: string;
}

const DEFAULT_PLATFORMS: SnsPlatform[] = ['instagram', 'tiktok'];

export function SnsConnection({
  description,
  hasError = false,
  customErrorMessage,
  platforms = DEFAULT_PLATFORMS,
  className,
  onInstagramChange,
  onTiktokChange,
  instagramUrl: externalInstagramUrl,
  tiktokUrl: externalTiktokUrl,
}: SnsConnectionSectionProps) {
  const t = useTranslations('snsConnection');

  // TODO: 기존 인증 로직 주석 제거
  // const { data: connectSnsData, isPending } = useConnectSns();
  // const { mutateAsync: connectTiktok } = useConnectTiktok();
  // const { mutateAsync: connectInstagram } = useConnectInstagram();

  // const connectedSns: SnsPlatform[] = [];
  // if (connectSnsData?.data?.isInstaConnected) {
  //   connectedSns.push('instagram');
  // }
  // if (connectSnsData?.data?.isTiktokConnected) {
  //   connectedSns.push('tiktok');
  // }

  // const hasConnectedAccount = connectedSns.length > 0;

  // const handleConnectSns = async (sns: SnsPlatform) => {
  //   try {
  //     if (sns === 'tiktok') {
  //       await connectTiktok();
  //     } else if (sns === 'instagram') {
  //       await connectInstagram();
  //     }
  //   } catch (error) {
  //     console.error('SNS 연결 실패:', error);
  //   }
  // };

  const [localInstagram, setLocalInstagram] = useState('');
  const [localTiktok, setLocalTiktok] = useState('');

  const instagramUrl = externalInstagramUrl ?? localInstagram;
  const tiktokUrl = externalTiktokUrl ?? localTiktok;

  const handleInstagramChange = (value: string) => {
    setLocalInstagram(value);
    onInstagramChange?.(value);
  };

  const handleTiktokChange = (value: string) => {
    setLocalTiktok(value);
    onTiktokChange?.(value);
  };

  return (
    <div className={className}>
      <FormSection
        title={t('title')}
        description={description || t('description')}
      >
        <div className="mb-[1.6rem] mt-[-1.4rem]">
          <ErrorNotice
            message={customErrorMessage || t('errorMessage')}
            className={!hasError ? 'text-gray-500' : undefined}
          />
        </div>

        {/* 기존 인증 버튼 로직 (주석 처리) */}
        {/* {isPending ? (
          <div className="flex h-screen w-full items-center justify-center bg-white">
            <LoadingSvg />
          </div>
        ) : (
          <>
            {platforms.map((platform, index) => (
              <div
                key={platform}
                className={index < platforms.length - 1 ? 'mb-[2rem]' : ''}
              >
                <div className="flex items-center justify-between">
                  <label className="body1 flex items-center font-bold text-gray-700">
                    {t(`platforms.${platform}`)}
                  </label>
                  <div className="flex flex-col">
                    {connectedSns.includes(platform) ? (
                      <div className="flex items-center">
                        <div className="mr-[0.8rem]">
                          <SvgCheckBg
                            size={20}
                            className="fill-[color:var(--color-green)]"
                          />
                        </div>
                        <span className="body2 font-bold text-[color:var(--color-green)]">
                          {t('connectedStatus')}
                        </span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleConnectSns(platform)}
                        variant="outline"
                        color="primary"
                        size="sm"
                        iconLeft={<SvgCheckNonBg size={20} />}
                        rounded="sm"
                        fontType="InterBody2"
                        className="h-[4rem]"
                        type="button"
                      >
                        {t(`connectButtons.${platform}`)}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )} */}

        <div className="space-y-[2rem]">
          {platforms.map((platform) => {
            const isInstagram = platform === 'instagram';
            const currentValue = isInstagram ? instagramUrl : tiktokUrl;
            const handleChange = isInstagram
              ? handleInstagramChange
              : handleTiktokChange;

            return (
              <div key={platform} className="space-y-[0.8rem]">
                <div className="flex items-center justify-between">
                  <label className="body1 flex items-center font-bold text-gray-700">
                    {t(`platforms.${platform}`)}
                  </label>
                  <Input
                    placeholder={
                      isInstagram
                        ? 'ex: https://www.instagram.com/lococo.official/'
                        : 'ex: https://www.tiktok.com/@lococo.official'
                    }
                    value={currentValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </FormSection>
    </div>
  );
}
