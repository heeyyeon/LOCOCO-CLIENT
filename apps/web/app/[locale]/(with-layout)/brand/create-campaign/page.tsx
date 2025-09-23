'use client';

import { useState } from 'react';

import { FormSection } from 'components/forms';

import { Input } from '@lococo/design-system/input';
import { SvgMinusButtons, SvgPlusButtons } from '@lococo/icons';

import InputWrapper from '../../my-page/components/input-wrapper';
import CampaignDueDate from '../component/campaign-due-date';
import CampaignEndInfo from '../component/campaign-end-info';
import CampaignInfo from '../component/campaign-info';
import CampaignStartInfo from '../component/campaign-start-info';
import CampaignWinnerAnnounce from '../component/campaign-winner-announce';

export default function CreateCampaign() {
  const [joinConditions, setJoinConditions] = useState<string[]>(['']);
  const [submitConditions, setSubmitConditions] = useState<string[]>(['']);
  const [joinReward, setJoinReward] = useState<string[]>(['']);

  const handleAddInput = () => {};
  return (
    <div className="flex min-h-[260.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
      <h3>캠페인 정보</h3>
      <CampaignInfo />
      <CampaignStartInfo />
      <CampaignEndInfo />
      <CampaignWinnerAnnounce />
      <CampaignDueDate />
      <FormSection
        title="참여 크리에이터 조건"
        description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
      >
        <div className="flex gap-[0.8rem]">
          <Input className="h-[4rem] w-full" placeholder="text" />
          <SvgPlusButtons size={40} className="fill-pink-500" />
          <SvgMinusButtons size={40} className="fill-pink-500" />
        </div>
      </FormSection>
      <FormSection
        title="크리에이터 제출 컨텐츠 조건"
        description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
      >
        <div className="flex gap-[0.8rem]">
          <Input className="h-[4rem] w-[60rem]" placeholder="text" />
          <SvgPlusButtons size={40} className="fill-pink-500" />
        </div>
      </FormSection>
      <FormSection
        title="크리에이터 참여 보상"
        description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
      >
        <div className="flex gap-[0.8rem]">
          <Input className="h-[4rem] w-[60rem]" placeholder="text" />
          <SvgPlusButtons size={40} className="fill-pink-500" />
        </div>
      </FormSection>

      <FormSection
        title="컨텐츠 플랫폼 선택"
        description="(최대 2개까지 선택 가능합니다.)"
      >
        <InputWrapper label="첫번째 컨텐츠" required />
        <div>버튼들</div>
        <InputWrapper label="두번째 컨텐츠" />
        <div>버튼들</div>
      </FormSection>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
