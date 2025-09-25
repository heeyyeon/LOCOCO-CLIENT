'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import CampaignUploadMedia from 'components/campaign/campaign-upload-media';
import { FormSection } from 'components/forms';
import {
  CampaignFormData,
  createCampaignSchema,
} from 'schema/create-campaign-schema';

import { Button } from '@lococo/design-system/button';

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
import { usePlatformSelection } from '../hooks/usePlatformSelection';

export default function CreateCampaign() {
  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(createCampaignSchema),
    mode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      title: '',
      language: 'EN',
      type: 'GIVEAWAY',
      category: 'MAKEUP',
      creatorCount: '',
      startDate: { year: '', month: '', day: '' },
      startTime: { period: 'AM', hour: '', minute: '' },
      endDate: { year: '', month: '', day: '' },
      endTime: { period: 'AM', hour: '', minute: '' },
      announceDate: { year: '', month: '', day: '' },
      announceTime: { period: 'AM', hour: '', minute: '' },
      dueDate: { year: '', month: '', day: '' },
      dueTime: { period: 'AM', hour: '', minute: '' },
      joinConditions: [''],
      submitConditions: [''],
      joinRewards: [''],
      firstContents: {
        'instagram-post': false,
        'instagram-reels': false,
        'tiktok-video': false,
      },
      secondContents: {
        'instagram-post': false,
        'instagram-reels': false,
        'tiktok-video': false,
      },
      thumbnailFiles: [],
      detailFiles: [],
    },
  });

  const { handleSubmit } = methods;

  const firstContents = usePlatformSelection(methods, 'firstContents');
  const secondContents = usePlatformSelection(methods, 'secondContents');

  const onSubmit = (data: CampaignFormData) => {
    console.log('=== 폼 제출 데이터 ===');
    console.log('기본 정보:', {
      title: data.title,
      language: data.language,
      type: data.type,
      category: data.category,
      creatorCount: data.creatorCount,
    });

    console.log('일정 정보:', {
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      endTime: data.endTime,
      announceDate: data.announceDate,
      announceTime: data.announceTime,
      dueDate: data.dueDate,
      dueTime: data.dueTime,
    });

    console.log('조건/보상:', {
      joinConditions: data.joinConditions,
      submitConditions: data.submitConditions,
      joinRewards: data.joinRewards,
    });

    console.log('플랫폼 선택:', {
      firstContents: data.firstContents,
      secondContents: data.secondContents,
    });

    console.log('파일:', {
      thumbnailFiles: data.thumbnailFiles,
      detailFiles: data.detailFiles,
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gray-100">
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
              <DynamicInput fieldName="joinConditions" />
            </FormSection>
            <FormSection
              title="크리에이터 제출 컨텐츠 조건"
              description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
            >
              <DynamicInput fieldName="submitConditions" />
            </FormSection>
            <FormSection
              title="크리에이터 참여 보상"
              description="캠페인에 참여할 수 있는 크리에이터의 조건을 설명해주세요"
            >
              <DynamicInput fieldName="joinRewards" />
            </FormSection>
            <FormSection
              title="컨텐츠 플랫폼 선택"
              description="(최대 2개까지 선택 가능합니다.)"
            >
              <InputWrapper label="첫번째 컨텐츠" required />
              <div className="flex gap-[1.2rem]">
                {(Object.keys(SOCIAL_CONFIGS) as SocialPlatform[]).map(
                  (platform) => (
                    <SocialChip
                      key={platform}
                      type={platform}
                      selected={firstContents.selectStatus[platform]}
                      onClick={firstContents.toggleChip}
                      disabled={firstContents.isDisabled(platform)}
                    />
                  )
                )}
              </div>
              <InputWrapper label="두번째 컨텐츠" />
              <div className="flex gap-[1.2rem]">
                {(Object.keys(SOCIAL_CONFIGS) as SocialPlatform[]).map(
                  (platform) => (
                    <SocialChip
                      key={platform}
                      type={platform}
                      selected={secondContents.selectStatus[platform]}
                      onClick={secondContents.toggleChip}
                      disabled={secondContents.isDisabled(platform)}
                    />
                  )
                )}
              </div>
            </FormSection>
            <CampaignUploadMedia />
          </div>
          <div className="flex gap-[1.6rem]">
            <Button
              type="button"
              variant="outline"
              size="lg"
              color="secondary"
              className="w-[41.2rem]"
              onClick={() => {
                console.log('저장하기 클릭');
              }}
            >
              저장하기
            </Button>
            <Button
              type="submit"
              variant="filled"
              size="lg"
              color="primary"
              className="w-[41.2rem]"
            >
              캠페인 발행하기
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
