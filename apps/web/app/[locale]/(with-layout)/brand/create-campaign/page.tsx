import { Input } from '@lococo/design-system/input';
import { Select } from '@lococo/design-system/select';

import InputWrapper from '../../my-page/components/input-wrapper';

export default function CreateCampaign() {
  return (
    <div className="flex min-h-[260.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
      <h3>캠페인 정보</h3>
      <div className="w-[64.8rem]">
        <InputWrapper label="캠페인 제목" required>
          <Input />
        </InputWrapper>
        <InputWrapper label="캠페인 진행 언어" required>
          <Select
            options={[
              { label: '한국어' },
              { label: '영어' },
              { label: '스페인어' },
            ]}
          />
        </InputWrapper>
        <InputWrapper label="캠페인 종류" required>
          <Select
            options={[
              { label: '한국어' },
              { label: '영어' },
              { label: '스페인어' },
            ]}
          />
        </InputWrapper>
        <InputWrapper label="카테고리" required>
          <Select
            options={[
              { label: '한국어' },
              { label: '영어' },
              { label: '스페인어' },
            ]}
          />
        </InputWrapper>
        <InputWrapper label="모집 예정 크리에이터 수" required>
          <Input />
        </InputWrapper>
      </div>
      <div className="w-[64.8rem]">
        <InputWrapper label="캠페인 지원 시작일" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
        <InputWrapper label="캠페인 지원 시작 시간" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
      </div>
      <div className="w-[64.8rem]">
        <InputWrapper label="캠페인 지원 종료일" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
        <InputWrapper label="캠페인 지원 종료 시간" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
      </div>
      <div className="w-[64.8rem]">
        <InputWrapper label="캠페인 당첨자 발표일" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
        <InputWrapper label="캠페인 당첨자 발표 시간" required>
          <Select
            options={[
              { label: '한국어' },
              { label: '영어' },
              { label: '스페인어' },
            ]}
          />
        </InputWrapper>
      </div>
      <div className="w-[64.8rem]">
        <InputWrapper label="2차 컨텐츠 최종 제출일" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
        <InputWrapper label="2차 컨텐츠 최종 제출 시간" required>
          <div className="flex gap-[2.4rem]">
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
            <Select
              size="small"
              options={[
                { label: '한국어' },
                { label: '영어' },
                { label: '스페인어' },
              ]}
            />
          </div>
        </InputWrapper>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
