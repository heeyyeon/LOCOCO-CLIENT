'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { CampaignPublishRequest } from '@typescript-swagger/data-contracts';
import InputWrapper from 'app/[locale]/(with-layout)/my-page/@modal/(.)address-modal/components/InputWrapper';
import CampaignUploadMedia from 'components/campaign/campaign-upload-media';
import { FormSection } from 'components/forms';
import { useRouter } from 'i18n/navigation';
import {
  CampaignFormData,
  createCampaignSchema,
} from 'schema/create-campaign-schema';

import { Button } from '@lococo/design-system/button';

import CampaignDueDate from '../../component/create-campaign/campaign-due-date';
import CampaignEndInfo from '../../component/create-campaign/campaign-end-info';
import CampaignInfo from '../../component/create-campaign/campaign-info';
import CampaignStartInfo from '../../component/create-campaign/campaign-start-info';
import CampaignWinnerAnnounce from '../../component/create-campaign/campaign-winner-announce';
import DynamicInput from '../../component/create-campaign/dynamic-inpt';
import SocialChip, {
  SOCIAL_CONFIGS,
  SocialPlatform,
} from '../../component/create-campaign/social-chip';
import { useCampaignFormAPI } from '../../hooks/useCampaignForm';
import { usePlatformSelection } from '../../hooks/usePlatformSelection';
import {
  transformApiDataToFormData,
  transformFormDataToApiData,
} from '../utils/api-form-converter';

export default function CampaignForm({
  campaignId,
  isReadonly = false,
}: {
  campaignId?: string;
  isReadonly?: boolean;
}) {
  const router = useRouter();

  const {
    useSavedCampaign,
    useSaveCampaign,
    useReSaveCampaign,
    usePublishNewCampaign,
    usePublishSavedCampaign,
  } = useCampaignFormAPI();

  const saveCampaignMutation = useSaveCampaign();
  const reSaveCampaignMutation = useReSaveCampaign(campaignId || '');
  const publishNewCampaignMutation = usePublishNewCampaign();
  const publishSavedCampaignMutation = usePublishSavedCampaign(
    campaignId || ''
  );

  const { data: savedCampaignData, isLoading } = useSavedCampaign(campaignId);

  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(createCampaignSchema),
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      title: '',
      language: '',
      type: '',
      category: '',
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

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (campaignId && !isLoading && !savedCampaignData) {
      router.push('/brand/create-campaign');
      return;
    }

    if (savedCampaignData && campaignId) {
      try {
        const formData = transformApiDataToFormData(savedCampaignData);
        reset(formData);
      } catch (error) {
        console.error('Failed to transform API data:', error);
      }
    }
  }, [savedCampaignData, campaignId, reset, isLoading, router]);

  const firstContents = usePlatformSelection(methods, 'firstContents');
  const secondContents = usePlatformSelection(methods, 'secondContents');

  const handleSave = () => {
    const formData = methods.getValues();
    const requestData = transformFormDataToApiData(formData);

    if (campaignId) {
      reSaveCampaignMutation.mutate(requestData);
    } else {
      saveCampaignMutation.mutate(requestData);
    }
  };

  const onSubmit = (data: CampaignFormData) => {
    const requestData = transformFormDataToApiData(
      data
    ) as CampaignPublishRequest;

    if (campaignId) {
      publishSavedCampaignMutation.mutate(requestData);
    } else {
      publishNewCampaignMutation.mutate(requestData);
    }
  };

  const t = useTranslations('brandMyPageCreateCampaign');
  const isMutating =
    saveCampaignMutation.isPending ||
    reSaveCampaignMutation.isPending ||
    publishNewCampaignMutation.isPending ||
    publishSavedCampaignMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-[200rem] w-full justify-center bg-gray-100">
        <div className="title1 mt-[30rem] font-[700] text-pink-500">
          캠페인 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex h-full w-full items-center justify-center bg-gray-100 p-[6.4rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[5.8rem] bg-gray-100">
            <div className="flex min-h-[260.4rem] w-[84rem] flex-col gap-[4.8rem] bg-white px-[9.6rem] py-[4.8rem]">
              <h3 className="title2 font-[700] text-gray-800">
                {t('pageTitle')}
              </h3>
              <CampaignInfo isReadonly={isReadonly} />
              <CampaignStartInfo isReadonly={isReadonly} />
              <CampaignEndInfo isReadonly={isReadonly} />
              <CampaignWinnerAnnounce isReadonly={isReadonly} />
              <CampaignDueDate isReadonly={isReadonly} />
              <FormSection
                required
                title={t('conditions.joinConditionTitle')}
                description={t('conditions.joinConditionDescription')}
              >
                <DynamicInput
                  fieldName="joinConditions"
                  isReadonly={isReadonly}
                />
              </FormSection>
              <FormSection
                required
                title={t('conditions.submitConditionTitle')}
                description={t('conditions.submitConditionDescription')}
              >
                <DynamicInput
                  fieldName="submitConditions"
                  isReadonly={isReadonly}
                />
              </FormSection>
              <FormSection
                required
                title={t('conditions.rewardTitle')}
                description={t('conditions.rewardDescription')}
              >
                <DynamicInput fieldName="joinRewards" isReadonly={isReadonly} />
              </FormSection>
              <FormSection
                title={t('platform.title')}
                description={t('platform.description')}
              >
                <InputWrapper label={t('platform.firstContent')} required>
                  <div className="flex gap-[1.2rem]">
                    {(Object.keys(SOCIAL_CONFIGS) as SocialPlatform[]).map(
                      (platform) => (
                        <SocialChip
                          key={platform}
                          type={platform}
                          selected={firstContents.selectStatus[platform]}
                          onClick={firstContents.toggleChip}
                          disabled={
                            isReadonly || secondContents.isDisabled(platform)
                          }
                        />
                      )
                    )}
                  </div>
                </InputWrapper>
                {errors.firstContents && (
                  <p className="body2 text-red font-[500]">
                    {t(`errorMessage.${errors.firstContents.message}`)}
                  </p>
                )}
                <InputWrapper label={t('platform.secondContent')}>
                  <div className="flex gap-[1.2rem]">
                    {(Object.keys(SOCIAL_CONFIGS) as SocialPlatform[]).map(
                      (platform) => (
                        <SocialChip
                          key={platform}
                          type={platform}
                          selected={secondContents.selectStatus[platform]}
                          onClick={secondContents.toggleChip}
                          disabled={
                            isReadonly || secondContents.isDisabled(platform)
                          }
                        />
                      )
                    )}
                  </div>
                </InputWrapper>
                {errors.secondContents && (
                  <p className="body2 text-red font-[500]">
                    {t(`errorMessage.${errors.secondContents.message}`)}
                  </p>
                )}
              </FormSection>
              <CampaignUploadMedia />
            </div>
            <div className="mt-[3.2rem] flex gap-[1.6rem]">
              <Button
                type="button"
                variant="outline"
                size="lg"
                color="secondary"
                className="w-[41.2rem]"
                onClick={handleSave}
                disabled={isMutating}
              >
                {t('buttons.save')}
              </Button>
              <Button
                type="submit"
                variant="filled"
                size="lg"
                color="primary"
                className="w-[41.2rem]"
                disabled={isMutating}
              >
                {t('buttons.publish')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
