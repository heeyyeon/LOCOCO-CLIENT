'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  FormSection,
  PhoneFormField,
  SignupFormLayout,
  TextFormField,
} from '../../../../../components/forms';
import { type BrandSignupForm, brandSignupSchema } from './hooks/signup';

export default function BrandSignupPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<BrandSignupForm>({
    resolver: zodResolver(brandSignupSchema),
    mode: 'onChange',
  });

  const handleSubmit = async (data: BrandSignupForm) => {
    try {
      setSubmitError(null);
      console.log('브랜드 회원가입 데이터:', data);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error('회원가입 실패:', error);
      setSubmitError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddressSearch = () => {
    // TODO: 카카오 주소 API 사용 예정!
  };

  return (
    <SignupFormLayout
      title="Join Lococo Creator Community!"
      submitError={submitError}
      onBack={() => window.history.back()}
      onSubmit={form.handleSubmit(handleSubmit)}
      isValid={form.formState.isValid}
      submitLabel="Join"
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
            onSearchClick={handleAddressSearch}
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
  );
}
