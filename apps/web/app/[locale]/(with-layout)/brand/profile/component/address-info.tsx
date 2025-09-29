import { UseFormRegisterReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { FormSection, TextFormField } from 'components/forms';

interface AddressInfoProps {
  companyAddressRegister: UseFormRegisterReturn;
  detailAddressRegister: UseFormRegisterReturn;
  companyAddressError?: string;
  detailAddressError?: string;
  onAddressSearch: () => void;
}

export default function AddressInfo({
  companyAddressRegister,
  detailAddressRegister,
  companyAddressError,
  detailAddressError,
  onAddressSearch,
}: AddressInfoProps) {
  const t = useTranslations('brandMyPageEditProfile');

  return (
    <FormSection
      title={t('addressInfo.addressInfoTitle')}
      description={t('addressInfo.addressInfoDescription')}
    >
      <TextFormField
        label={t('addressInfo.companyAddressLabel')}
        required
        placeholder={t('addressInfo.companyAddressPlaceholder')}
        register={companyAddressRegister}
        error={companyAddressError}
        showSearchIcon
        handleClickSearch={onAddressSearch}
      />

      <TextFormField
        label={t('addressInfo.detailAddressLabel')}
        required
        placeholder={t('addressInfo.detailAddressPlaceholder')}
        register={detailAddressRegister}
        error={detailAddressError}
      />
    </FormSection>
  );
}
