import React from 'react';
import DaumPostcode from 'react-daum-postcode';

import { SvgClose } from '@lococo/icons';

interface AddressSearchModalProps {
  isOpen: boolean;
  onComplete: (data: { roadAddress: string; zonecode: string }) => void;
  onClose: () => void;
}

export function AddressSearchModal({
  isOpen,
  onComplete,
  onClose,
}: AddressSearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="backdrop-blur-xxs absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-10 mx-4 w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b bg-gray-50 p-4">
          <h3 className="text-lg font-semibold text-gray-900">주소 검색</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors hover:text-pink-500"
            aria-label="닫기"
          >
            <SvgClose size={18} />
          </button>
        </div>

        <div className="h-[52rem]">
          <DaumPostcode
            onComplete={(data) => {
              onComplete({
                roadAddress: data.roadAddress,
                zonecode: data.zonecode,
              });
            }}
            onClose={onClose}
            autoClose={true}
            style={{
              width: '100%',
              height: '100%',
            }}
            theme={{
              bgColor: '#FFF1F6',
              postcodeTextColor: '#FF488F',
              emphTextColor: '#FF488F',
            }}
          />
        </div>
      </div>
    </div>
  );
}
