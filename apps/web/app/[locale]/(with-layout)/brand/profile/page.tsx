import { FormSection, SelectFormField, TextFormField } from 'components/forms';
import { countryPhoneCodeOptions } from 'utils';

import { Button } from '@lococo/design-system/button';
import { Input } from '@lococo/design-system/input';
import { Select } from '@lococo/design-system/select';
import { SvgAvatarCircle, SvgCamera } from '@lococo/icons';

export default function Profile() {
  const countryCodes = countryPhoneCodeOptions();

  return (
    <div className="flex flex-col gap-[3.2rem] bg-gray-100 px-[9.6rem] py-[6.4rem]">
      <div className="flex min-h-[99.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
        <FormSection title="프로필 사진">
          <div className="bt-[2.6rem] flex flex-col items-center gap-[3.2rem] pb-[5.5rem]">
            <SvgAvatarCircle size={72} />
            <Button
              color="secondary"
              variant="outline"
              size="sm"
              rounded="sm"
              className="flex gap-[0.8rem] px-[1.6rem] py-[0.8rem]"
            >
              <SvgCamera size={24} />
              <span className="body2 font-[700]">사진 변경하기</span>
            </Button>
          </div>
        </FormSection>
        <FormSection title="기본 정보">
          <TextFormField label="프로필 사진" required />
          <TextFormField label="담당자 이름" required />
          <SelectFormField label="담당자 연락처" required>
            <div className="flex w-full items-center justify-start gap-[2.4rem]">
              <Select placeholder={'+xx'} options={countryCodes} size="small" />
              <Input className="h-[4rem] w-[26.4rem]" />
            </div>
          </SelectFormField>
          <TextFormField
            label="Email"
            required
            placeholder="jessica.anderson@gmail.com"
          />
          <div className="relative">
            <p className="caption3 absolute left-[24rem] text-gray-500">
              이메일을 변경하려면 로코코에 문의해 주세요.
            </p>
          </div>
        </FormSection>
        <FormSection
          title="회사 주소 정보"
          description="제품 오배송 시, 반품을 위해서 입력받습니다."
        >
          <TextFormField
            label="도로명주소"
            required
            placeholder="우편번호 검색"
            // register={form.register('street')}
            // error={form.formState.errors.street?.message}
            showSearchIcon
            // handleClickSearch={openAddressSearch}
          />

          <TextFormField
            label="상세 주소"
            required
            placeholder="ex: 201호"
            // register={form.register('detail')}
            // error={form.formState.errors.detail?.message}
          />
        </FormSection>
      </div>
      <div className="flex gap-[1.6rem]">
        <Button
          color="secondary"
          variant="outline"
          size="lg"
          className="w-[41.2rem]"
        >
          취소하기
        </Button>
        <Button
          color="primary"
          variant="filled"
          size="lg"
          className="w-[41.2rem]"
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
