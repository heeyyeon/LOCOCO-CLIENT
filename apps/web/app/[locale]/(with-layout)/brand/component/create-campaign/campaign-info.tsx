import { SelectFormField, TextFormField } from 'components/forms';

export default function CampaignInfo() {
  return (
    <section className="flex w-[64.8rem] flex-col gap-[1.6rem]">
      <TextFormField label="캠페인 제목" required placeholder="text" />
      <SelectFormField
        label="캠페인 진행 언어"
        required
        options={[
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
    </section>
  );
}
