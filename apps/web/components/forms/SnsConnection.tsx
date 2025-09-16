import { useTranslations } from 'next-intl';

import { Button } from '@lococo/design-system/button';
import { ErrorNotice } from '@lococo/design-system/error-notice';
import { SvgCheckBg, SvgCheckNonBg } from '@lococo/icons';

import { FormSection } from './FormSection';

export type SnsPlatform = 'instagram' | 'tiktok';

interface SnsConnectionSectionProps {
  title?: string;
  description?: string;
  connectedSns: SnsPlatform[];
  onConnectSns: (sns: SnsPlatform) => void;
  hasError?: boolean;
  errorMessage?: string;
  platforms?: SnsPlatform[];
  className?: string;
}

const DEFAULT_PLATFORMS: SnsPlatform[] = ['instagram', 'tiktok'];

export function SnsConnection({
  description,
  connectedSns,
  onConnectSns,
  hasError = false,
  platforms = DEFAULT_PLATFORMS,
  className,
}: SnsConnectionSectionProps) {
  const t = useTranslations('snsConnection');
  const hasConnectedAccount = connectedSns.length > 0;

  return (
    <div className={className}>
      <FormSection
        title={t('title')}
        description={description || t('description')}
      >
        <div className="mb-[1.6rem] mt-[-1.4rem]">
          <ErrorNotice
            message={t('errorMessage')}
            className={
              hasConnectedAccount || !hasError ? 'text-gray-500' : undefined
            }
          />
        </div>

        {platforms.map((platform, index) => (
          <div
            key={platform}
            className={index < platforms.length - 1 ? 'mb-[2rem]' : ''}
          >
            <div className="flex items-center justify-between">
              <label className="kr-body1 flex items-center font-bold text-gray-700">
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
                    <span className="kr-body2 font-bold text-[color:var(--color-green)]">
                      {t('connectedStatus')}
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={() => onConnectSns(platform)}
                    variant="outline"
                    color="primary"
                    size="sm"
                    iconLeft={<SvgCheckNonBg size={20} />}
                    rounded="sm"
                    fontType="InterBody2"
                    className="h-[4rem]"
                  >
                    {t(`connectButtons.${platform}`)}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </FormSection>
    </div>
  );
}
