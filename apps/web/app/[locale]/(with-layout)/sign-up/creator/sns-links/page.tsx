'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  SignupFormLayout,
  SnsConnection,
} from '../../../../../../components/forms';

export default function CreatorSnsLinksPage() {
  const router = useRouter();

  const [connectedSns, setConnectedSns] = useState<('instagram' | 'tiktok')[]>(
    []
  );
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
      <SnsConnection
        description="We will go through your SNS account, and let you know if you are verified."
        connectedSns={connectedSns}
        onConnectSns={handleConnectSns}
        hasError={isSubmitted}
      />
    </SignupFormLayout>
  );
}
