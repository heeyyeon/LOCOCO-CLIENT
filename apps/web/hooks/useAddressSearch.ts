import { useState } from 'react';

interface AddressData {
  roadAddress: string;
  zonecode: string;
}

interface UseAddressSearchProps {
  onComplete?: (data: AddressData) => void;
}

export const useAddressSearch = ({
  onComplete,
}: UseAddressSearchProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAddressSearch = () => {
    setIsOpen(true);
  };

  const closeAddressSearch = () => {
    setIsOpen(false);
  };

  const handleComplete = (data: AddressData) => {
    if (onComplete) {
      onComplete(data);
    }
    closeAddressSearch();
  };

  return {
    isOpen,
    openAddressSearch,
    closeAddressSearch,
    handleComplete,
  };
};
