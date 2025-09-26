import { FormSection } from 'components/forms';

import { Button } from '@lococo/design-system/button';
import { Input } from '@lococo/design-system/input';
import { SvgAvatarCircle, SvgCamera } from '@lococo/icons';

import InputWrapper from '../../my-page/components/input-wrapper';

export default function Profile() {
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
          <InputWrapper label="브랜드 이름" required>
            <Input />
          </InputWrapper>
          <InputWrapper label="담당자 이름" required>
            <Input />
          </InputWrapper>
          <InputWrapper label="담당자 연락처" required>
            <Input />
          </InputWrapper>
          <InputWrapper label="Email" required>
            <Input />
          </InputWrapper>
        </FormSection>
        <FormSection
          title="회사 주소 정보"
          description="제품 오배송 시, 반품을 위해서 입력받습니다."
        >
          <InputWrapper label="회사 주소 정보" required>
            <Input />
          </InputWrapper>
          <InputWrapper label="상세 주소" required>
            <Input />
          </InputWrapper>
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
