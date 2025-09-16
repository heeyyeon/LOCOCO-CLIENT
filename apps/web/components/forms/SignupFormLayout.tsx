import React, { ReactNode } from 'react';

import { Button } from '@lococo/design-system/button';
import { ErrorNotice } from '@lococo/design-system/error-notice';

interface SignupFormLayoutProps {
  title: string;
  children: ReactNode;
  submitError?: string | null;
  onBack?: () => void;
  onSubmit?: () => void;
  isValid?: boolean;
  submitLabel: string;
  isBackDisabled?: boolean;
}

export function SignupFormLayout({
  title,
  children,
  submitError,
  onBack,
  onSubmit,
  submitLabel,
  isBackDisabled = true,
}: SignupFormLayoutProps) {
  return (
    <main className="bg-gray-100 py-[6.4rem]">
      <div className="mx-auto max-w-[74.4rem] px-4">
        <h1 className="inter-head2 mb-[2.2rem] text-center font-bold text-pink-500">
          {title}
        </h1>

        <div className="border border-gray-400 bg-white p-[4.8rem]">
          <form onSubmit={onSubmit} className="space-y-[1.6rem]">
            {submitError && (
              <div className="mb-[0.2rem]">
                <ErrorNotice message={submitError} />
              </div>
            )}
            {children}
          </form>
        </div>

        <div className="flex h-[6rem] justify-between gap-[1.6rem] pt-[3.2rem]">
          <Button
            type="button"
            variant={isBackDisabled ? 'filled' : 'outline'}
            color="primary"
            size="md"
            onClick={onBack}
            rounded="md"
            disabled={isBackDisabled}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="filled"
            color="primary"
            size="md"
            onClick={onSubmit}
            rounded="md"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </main>
  );
}
