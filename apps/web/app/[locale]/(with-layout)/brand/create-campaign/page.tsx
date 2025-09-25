'use client';

import CampaignUploadMedia from 'components/campaign/campaign-upload-media';
import { FormSection } from 'components/forms';
import { useCampaignUploadMedia } from 'hooks/useCampaignUploadMedia';

import InputWrapper from '../../my-page/components/input-wrapper';
import CampaignDueDate from '../component/create-campaign/campaign-due-date';
import CampaignEndInfo from '../component/create-campaign/campaign-end-info';
import CampaignInfo from '../component/create-campaign/campaign-info';
import CampaignStartInfo from '../component/create-campaign/campaign-start-info';
import CampaignWinnerAnnounce from '../component/create-campaign/campaign-winner-announce';
import DynamicInput from '../component/create-campaign/dynamic-inpt';
import SocialChip, {
  SOCIAL_CONFIGS,
  SocialPlatform,
} from '../component/create-campaign/social-chip';
import { useDynamicInputs } from '../hooks/useDynamicInput';
import { usePlatformCheck } from '../hooks/usePlatformCheck';

export default function CreateCampaign() {
  const joinConditions = useDynamicInputs(['']);
  const submitConditions = useDynamicInputs(['']);
  const joinReward = useDynamicInputs(['']);

  const firstContents = usePlatformCheck();
  const secondContents = usePlatformCheck();

  const campaignUploadState = useCampaignUploadMedia();
  return (
    <div className="flex min-h-[260.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
      <h3 className="title2 font-[700] text-gray-800">캠페인 정보</h3>
      <CampaignInfo />
      <CampaignStartInfo />
      <CampaignEndInfo />
      <CampaignWinnerAnnounce />
      <CampaignDueDate />
      <FormSection
        title="참여 크리에이터 조건"
        description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
      >
        <DynamicInput
          fields={joinConditions.fields}
          handleAddField={joinConditions.addField}
          handleChangeField={joinConditions.updateField}
          handleRemoveField={joinConditions.removeField}
        />
      </FormSection>
      <FormSection
        title="크리에이터 제출 컨텐츠 조건"
        description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
      >
        <DynamicInput
          fields={submitConditions.fields}
          handleAddField={submitConditions.addField}
          handleChangeField={submitConditions.updateField}
          handleRemoveField={submitConditions.removeField}
        />
      </FormSection>
      <FormSection
        title="크리에이터 참여 보상"
        description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
      >
        <DynamicInput
          fields={joinReward.fields}
          handleAddField={joinReward.addField}
          handleChangeField={joinReward.updateField}
          handleRemoveField={joinReward.removeField}
        />
      </FormSection>
      <FormSection
        title="컨텐츠 플랫폼 선택"
        description="(최대 2개까지 선택 가능합니다.)"
      >
        <InputWrapper label="첫번째 컨텐츠" required />
        <div className="flex gap-[1.2rem]">
          {(Object.keys(SOCIAL_CONFIGS) as SocialPlatform[]).map((platform) => (
            <SocialChip
              key={platform}
              type={platform}
              selected={firstContents.selectStatus[platform]}
              onClick={firstContents.toggleChip}
              disabled={firstContents.isDisabled(platform)}
            />
          ))}
        </div>
        <InputWrapper label="두번째 컨텐츠" />
        <div className="flex gap-[1.2rem]">
          {(Object.keys(SOCIAL_CONFIGS) as SocialPlatform[]).map((platform) => (
            <SocialChip
              key={platform}
              type={platform}
              selected={secondContents.selectStatus[platform]}
              onClick={secondContents.toggleChip}
              disabled={secondContents.isDisabled(platform)}
            />
          ))}
        </div>
      </FormSection>
      <CampaignUploadMedia
        thumbnailFiles={campaignUploadState.thumbnailFiles}
        detailFiles={campaignUploadState.detailFiles}
        setThumbnailFiles={campaignUploadState.setThumbnailFiles}
        setDetailFiles={campaignUploadState.setDetailFiles}
      />
      <div></div>
      <div></div>
    </div>
  );
}
