'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { AddressSearchModal } from '../../../../../components/address/AddressSearchModal';
import {
  FormSection,
  PhoneFormField,
  SignupFormLayout,
  TextFormField,
} from '../../../../../components/forms';
import { useAddressSearch } from '../../../../../hooks/useAddressSearch';
import { type BrandSignupForm, brandSignupSchema } from './hooks/signup';

export default function BrandSignupPage() {
  const router = useRouter();

  const form = useForm<BrandSignupForm>({
    resolver: zodResolver(brandSignupSchema),
    mode: 'onChange',
  });

  const { isOpen, openAddressSearch, closeAddressSearch, handleComplete } =
    useAddressSearch({
      onComplete: (data) => {
        const address = `${data.roadAddress} (${data.zonecode})`;
        form.setValue('street', address);
      },
    });

  const handleSubmit = () => {
    // TODO: 가입 확인 모달 연결하기
  };

  return (
    <>
      <AddressSearchModal
        isOpen={isOpen}
        onComplete={handleComplete}
        onClose={closeAddressSearch}
      />
      <SignupFormLayout
        title="Join Lococo Creator Community!"
        onBack={() => router.back()}
        onSubmit={form.handleSubmit(handleSubmit)}
        isValid={form.formState.isValid}
        submitLabel="Join"
        isBackDisabled={true}
      >
        <FormSection
          title="브랜드 정보"
          description="회원가입을 환영합니다! 브랜드 확인을 위해 아래 정보를 입력해주세요."
        >
          <TextFormField
            label="브랜드 이름"
            required
            placeholder="ex: Lococo"
            register={form.register('brandName')}
            error={form.formState.errors.brandName?.message}
          />

          <TextFormField
            label="담당자 이름"
            required
            placeholder="ex: 홍길동"
            register={form.register('contactName')}
            error={form.formState.errors.contactName?.message}
          />

          <TextFormField
            label="담당자 직책"
            required
            placeholder="ex: 대리"
            register={form.register('contactPosition')}
            error={form.formState.errors.contactPosition?.message}
          />

          <PhoneFormField
            label="담당자 연락처"
            required
            placeholder="ex: 010-xxxx-xxxx"
            register={form.register('contactPhone')}
            error={form.formState.errors.contactPhone?.message}
          />
        </FormSection>

        <div className="mt-[4.8rem]">
          <FormSection
            title="회사 주소 정보"
            description="제품 오배송 시, 반품을 위해서 입력받습니다."
          >
            <TextFormField
              label="도로명주소"
              required
              placeholder="우편번호 검색"
              register={form.register('street')}
              error={form.formState.errors.street?.message}
              showSearchIcon
              handleClickSearch={openAddressSearch}
            />

            <TextFormField
              label="상세 주소"
              required
              placeholder="ex: 201호"
              register={form.register('detail')}
              error={form.formState.errors.detail?.message}
            />
          </FormSection>
        </div>
      </SignupFormLayout>
    </>
  );
}
