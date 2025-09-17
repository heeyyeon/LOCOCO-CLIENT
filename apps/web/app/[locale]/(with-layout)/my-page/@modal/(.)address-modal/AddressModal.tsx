import React from 'react';

import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@lococo/design-system/dialog';
import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input';
import { ModalButton } from '@lococo/design-system/modal-button';
import { ModalHeader } from '@lococo/design-system/modal-header';
import { Select } from '@lococo/design-system/select';

import InputWrapper from './components/InputWrapper';
import { useAddress } from './hooks/useAddress';

interface AddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressModal({ open, onOpenChange }: AddressModalProps) {
  const t = useTranslations('addressModal');
  const {
    formData,
    errors,
    updateCountry,
    updateState,
    updateCity,
    updateAddressLine1,
    updateAddressLine2,
    updateZip,
    handleSubmit,
    isFormValid,
    trigger,
  } = useAddress();
  const handleEditModal = () => {
    trigger();
    if (isFormValid) {
      handleSubmit();
    }
  };

  const handleGetDeliveryModal = () => {
    trigger();
    if (isFormValid) {
      handleSubmit();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[55rem] items-center overflow-hidden rounded-[3.2rem] p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Address</DialogTitle>

        <ModalHeader text="Missing required fields" />

        <section className="flex flex-col gap-[1.6rem] bg-white p-[4rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="title2 text-gray-800">{t('title')}</p>
            <p className="caption3 text-gray-500">{t('description')}</p>
          </div>

          <InputWrapper label={t('country')} required>
            {
              //TODO: 국가 목록 추가
            }
            <Select
              options={[{ label: 'United States' }, { label: 'Canada' }]}
              onValueChange={(value) => updateCountry(value)}
              placeholder="Country"
              value={formData.country}
              isError={!!errors.country}
              errorText={errors.country}
              className="w-full"
            />
          </InputWrapper>
          <InputWrapper
            label={t('state')}
            required
            notice={errors.state && <ErrorNotice message={errors.state} />}
          >
            <Input
              value={formData.state}
              onChange={(e) => updateState(e.target.value)}
              className="w-full"
            />
          </InputWrapper>
          <InputWrapper
            label={t('city')}
            required
            notice={errors.city && <ErrorNotice message={errors.city} />}
          >
            <Input
              value={formData.city}
              onChange={(e) => updateCity(e.target.value)}
              className="w-full"
            />
          </InputWrapper>
          <InputWrapper
            label={t('addressLine1')}
            required
            notice={
              errors.addressLine1 && (
                <ErrorNotice message={errors.addressLine1} />
              )
            }
          >
            <Input
              value={formData.addressLine1}
              onChange={(e) => updateAddressLine1(e.target.value)}
              className="w-full"
            />
          </InputWrapper>
          <InputWrapper
            label={t('addressLine2')}
            notice={
              errors.addressLine2 && (
                <ErrorNotice message={errors.addressLine2} />
              )
            }
          >
            <Input
              value={formData.addressLine2}
              onChange={(e) => updateAddressLine2(e.target.value)}
              className="w-full"
            />
          </InputWrapper>

          <InputWrapper
            label={t('zip')}
            notice={errors.zip && <ErrorNotice message={errors.zip} />}
          >
            <Input
              value={formData.zip}
              onChange={(e) => updateZip(e.target.value)}
              className="w-full"
            />
          </InputWrapper>
        </section>

        <div className="flex items-center border-t border-pink-500">
          <ModalButton
            text={t('edit')}
            variant="left"
            onClick={handleEditModal}
          />
          <div className="h-[5.6rem] w-[2px] bg-pink-500" />
          <ModalButton
            text={t('getDelivery')}
            variant="right"
            onClick={handleGetDeliveryModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
