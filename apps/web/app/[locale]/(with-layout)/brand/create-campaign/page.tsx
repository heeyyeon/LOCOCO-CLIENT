import { SelectFormField, TextFormField } from 'components/forms';
import { dateOptions } from 'utils';
import { timeOptions } from 'utils/time-options';

import { Select } from '@lococo/design-system/select';

import InputWrapper from '../../my-page/components/input-wrapper';

export default function CreateCampaign() {
  const { AM_PM, HOURS, MINUTES } = timeOptions();
  const { months, years, days } = dateOptions();
  return (
    <div className="flex min-h-[260.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
      <h3>캠페인 정보</h3>
      <div className="flex w-[64.8rem] flex-col gap-[1.6rem]">
        <TextFormField label="캠페인 제목" required placeholder="text" />
        <SelectFormField
          label="캠페인 진행 언어"
          required
          options={[
            { label: '한국어', value: 'KO' },
            { label: '영어', value: 'EN' },
            { label: '스페인어', value: 'ES' },
          ]}
        />
        <SelectFormField
          label="캠페인 종류"
          required
          options={[
            { label: 'GIVEAWAY', value: 'GIVEAWAY' },
            { label: 'CONTENTS', value: 'CONTENTS' },
            { label: 'EXCLUSIVE', value: 'EXCLUSIVE' },
          ]}
        />
        <SelectFormField
          label="카테고리"
          required
          options={[
            { label: 'SKINCARE', value: 'SKINCARE' },
            { label: 'SUNCARE', value: 'SUNCARE' },
            { label: 'MAKEUP', value: 'MAKEUP' },
          ]}
        />
        <TextFormField label="모집 예정 크리에이터 수" required />
      </div>
      <div className="flex w-[64.8rem] flex-col gap-[1.6rem]">
        <SelectFormField label="캠페인 지원 시작일" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={months} />
            <Select size="small" options={days} />
            <Select size="small" options={years} />
          </div>
        </SelectFormField>
        <SelectFormField label="캠페인 지원 시작 시각" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={AM_PM} />
            <Select size="small" options={HOURS} />
            <Select size="small" options={MINUTES} />
          </div>
        </SelectFormField>
      </div>

      <div className="flex w-[64.8rem] flex-col gap-[1.6rem]">
        <SelectFormField label="캠페인 지원 종료일" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={months} />
            <Select size="small" options={days} />
            <Select size="small" options={years} />
          </div>
        </SelectFormField>
        <SelectFormField label="캠페인 지원 종료 시각" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={AM_PM} />
            <Select size="small" options={HOURS} />
            <Select size="small" options={MINUTES} />
          </div>
        </SelectFormField>
      </div>

      <div className="flex w-[64.8rem] flex-col gap-[1.6rem]">
        <SelectFormField label="캠페인 당첨자 발표일" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={months} />
            <Select size="small" options={days} />
            <Select size="small" options={years} />
          </div>
        </SelectFormField>
        <SelectFormField label="캠페인 당첨자 발표 시각" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={AM_PM} />
            <Select size="small" options={HOURS} />
            <Select size="small" options={MINUTES} />
          </div>
        </SelectFormField>
      </div>
      <div className="w-[64.8rem]">
        <InputWrapper label="2차 컨텐츠 최종 제출일" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={months} />
            <Select size="small" options={days} />
            <Select size="small" options={years} />
          </div>
        </InputWrapper>
        <InputWrapper label="2차 컨텐츠 최종 제출 시각" required>
          <div className="flex gap-[2.4rem]">
            <Select size="small" options={AM_PM} />
            <Select size="small" options={HOURS} />
            <Select size="small" options={MINUTES} />
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
