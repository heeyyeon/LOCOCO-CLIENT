'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@lococo/design-system/button';
import { ErrorNotice } from '@lococo/design-system/error-notice';
import { SvgCheckNonBg } from '@lococo/icons';

import {
  FormSection,
  SignupFormLayout,
} from '../../../../../../components/forms';

export default function CreatorSnsLinksPage() {
  const router = useRouter();

  const [connectedSns, setConnectedSns] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConnectSns = (sns: 'instagram' | 'tiktok') => {
    setConnectedSns((prev) => [...prev, sns]);
  };

  const hasConnectedAccount = connectedSns.length > 0;

  const handleSubmit = () => {
    if (!hasConnectedAccount) {
      setIsSubmitted(true);
      return;
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SignupFormLayout
      title="Join Lococo Creator Community!"
      onBack={handleBack}
      onSubmit={handleSubmit}
      isValid={hasConnectedAccount}
      submitLabel="Join"
      isBackDisabled={false}
    >
      <FormSection
        title="SNS Link"
        description="We will go through your SNS account, and let you know if you are verified."
      >
        <div className="mb-[1.6rem] mt-[-1.4rem]">
          <ErrorNotice
            message="Please add your account link at least one."
            className={
              hasConnectedAccount
                ? 'text-gray-500'
                : isSubmitted
                  ? undefined
                  : 'text-gray-500'
            }
          />
        </div>
        {/* 인스타 */}
        <div className="mb-[2rem] flex items-center justify-between">
          <label className="kr-body1 flex items-center font-bold text-gray-700">
            Instagram
          </label>
          <div className="flex flex-col">
            {connectedSns.includes('instagram') ? (
              // TODO: 디자인시스템 컴포넌트로 변경 필요
              <div>
                <SvgCheckNonBg size={20} className="mr-[0.8rem]" />
                <span className="text-sm font-medium">Connected!</span>
              </div>
            ) : (
              <Button
                onClick={() => handleConnectSns('instagram')}
                variant="outline"
                color="primary"
                size="sm"
                iconLeft={<SvgCheckNonBg size={20} />}
                rounded="sm"
                fontType="InterBody2"
                className="h-[4rem]"
              >
                Connect with Instagram
              </Button>
            )}
          </div>
        </div>

        {/* 틱톡 */}
        <div className="flex items-center justify-between">
          <label className="kr-body1 flex items-center font-bold text-gray-700">
            Tiktok
          </label>
          <div className="flex flex-col">
            {connectedSns.includes('tiktok') ? (
              // TODO: 디자인시스템 컴포넌트로 변경 필요
              <div>
                <SvgCheckNonBg size={20} className="mr-[0.8rem]" />
                <span className="text-sm font-medium">Connected!</span>
              </div>
            ) : (
              <Button
                onClick={() => handleConnectSns('tiktok')}
                variant="outline"
                color="primary"
                size="sm"
                iconLeft={<SvgCheckNonBg size={20} />}
                rounded="sm"
                fontType="InterBody2"
                className="h-[4rem]"
              >
                Connect with Tiktok
              </Button>
            )}
          </div>
        </div>
      </FormSection>
    </SignupFormLayout>
  );
}
