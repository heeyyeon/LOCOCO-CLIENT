'use client';

import { useState } from 'react';

import { useFormatter, useTimeZone, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CAMPAIGN_REVIEW_KEYS } from 'app/[locale]/(with-layout)/my-page/constant/queryKey';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'i18n/navigation';

import { Button } from '@lococo/design-system/button';
import { InfoChip } from '@lococo/design-system/info-chip';
import {
  SvgCheckNonBg,
  SvgGift,
  SvgLanguage,
  SvgProfileIcon,
} from '@lococo/icons';

import { applyCampaign } from '../apis';
import CampaignInfoGrayBorderBox from './campaign-info-gray-border-box';
import { RejectModal } from './campaign-reject-modal';
import { ConfirmCampaignSignUpModal } from './confirm-campaign-sign-up-modal';

dayjs.extend(utc);
dayjs.extend(timezone);
/**
 * 캠페인 상태에 따른 표시 문자열을 반환하는 함수
 * @param status 서버에서 받은 캠페인 상태 코드
 * @returns 사용자에게 표시할 문자열
 */

interface CampaignInfoPanelProps {
  title: string;
  campaignType: string;
  brandName: string;
  language: string;
  applyStartDate: string;
  applyDeadline: string;
  creatorAnnouncementDate: string;
  reviewSubmissionDeadline: string;
  deliverableRequirements: string[];
  participationRewards: string[];
  eligibilityRequirements: string[];
  userSpecificCampaignStatus: string;
  isProCampaign: boolean;
  currentUserRole: 'CUSTOMER' | 'CREATOR' | 'BRAND' | 'ADMIN' | null;
  creatorRoleInfo: 'NOT_APPROVED' | 'PRO' | 'NORMAL';
}

export default function CampaignInfoPanel({
  title,
  campaignType,
  brandName,
  language,
  applyStartDate,
  applyDeadline,
  creatorAnnouncementDate,
  reviewSubmissionDeadline,
  deliverableRequirements,
  participationRewards,
  eligibilityRequirements,
  userSpecificCampaignStatus,
  isProCampaign,
  currentUserRole,
  creatorRoleInfo,
}: CampaignInfoPanelProps) {
  const t = useTranslations('campaignDetail');
  const format = useFormatter();
  const timeZone = useTimeZone() || 'UTC';

  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;
  const queryClient = useQueryClient();

  const [
    isConfirmCampaignSignUpModalOpen,
    setIsConfirmCampaignSignUpModalOpen,
  ] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const rejectModalType =
    isProCampaign && creatorRoleInfo !== 'PRO'
      ? 'notProCreator'
      : creatorRoleInfo === 'NOT_APPROVED' ||
          currentUserRole === 'CUSTOMER' ||
          currentUserRole === null
        ? 'notCreator'
        : null;

  const applyCampaignMutation = useMutation({
    mutationFn: (campaignId: string) => applyCampaign(campaignId),
    onSuccess: () => {
      setIsConfirmCampaignSignUpModalOpen(false);
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: CAMPAIGN_REVIEW_KEYS.all,
      });
    },
  });

  const handleApplyButtonClick = () => {
    // 미승인 크리에이터, 일반 유저 지원 케이스
    if (
      (currentUserRole === 'CREATOR' && creatorRoleInfo === 'NOT_APPROVED') ||
      currentUserRole === 'CUSTOMER' ||
      currentUserRole === null
    ) {
      //Campaigns are for Lococo Creators only.  reject 모달
      setIsRejectModalOpen(true);
      return;
    }

    if (currentUserRole === 'BRAND') {
      // 지원자 리스트
      router.push(`/brand/applicants?campaignId=${campaignId}`);
      return;
    }

    // PRO 캠페인 지원 케이스
    if (isProCampaign) {
      if (currentUserRole === 'CREATOR' && creatorRoleInfo === 'PRO') {
        // PRO 캠페인이면서 크리에이터 PRO
        // 정상 로직 진행
        setIsConfirmCampaignSignUpModalOpen(true);
        return;
      } else {
        // PRO 캠페인이면서 크리에이터 자격없음
        // reject 모달
        setIsRejectModalOpen(true);
        return;
      }
    } else {
      if (currentUserRole === 'CREATOR') {
        setIsConfirmCampaignSignUpModalOpen(true);
        return;
      }
    }
  };

  const handleActiveCampaign = () => {
    if (currentUserRole === 'CREATOR') {
      router.push(`/my-page/my-campaign`);
    } else if (currentUserRole === 'BRAND') {
      // 지원자 리스트 페이지 이동
      router.push(`/brand/applicants?campaignId=${campaignId}`);
    }
    // TODO: 체험단 모집완료, 캠페인 진행중 케이스 추가 or 기획 논의 필요
  };

  const getCampaignButtonStatus = (
    status: string
  ): {
    text: string;
    isDisabled: boolean;
    onClick?: () => void;
  } => {
    if (currentUserRole === 'BRAND') {
      return { text: t('applyButtonText.userRoleBrand'), isDisabled: true };
    }
    switch (status) {
      case 'OPEN_RESERVED':
        return { text: t('applyButtonText.open_reserved'), isDisabled: true };
      case 'RECRUITING':
        return {
          text:
            currentUserRole === 'CREATOR'
              ? t('applyButtonText.recruiting.creator')
              : t('applyButtonText.userRoleBrand'),
          isDisabled: false,
          onClick: handleApplyButtonClick,
        };
      case 'NOT_APPLIED_ENDED':
        return {
          text: t('applyButtonText.not_applied_ended'),
          isDisabled: true,
        };
      case 'APPLIED':
        return { text: t('applyButtonText.applied'), isDisabled: true };
      case 'REJECTED':
        return { text: t('applyButtonText.rejected'), isDisabled: true };
      case 'APPROVED_SECOND_REVIEW_DONE':
        return {
          text: t('applyButtonText.approved_second_review_done'),
          isDisabled: true,
        };
      case 'APPROVED_REVIEW_NOT_CONFIRMED':
      case 'APPROVED_ADDRESS_NOT_CONFIRMED':
        return {
          text: t('applyButtonText.approved_review_not_confirmed'),
          isDisabled: true,
        };
      // TODO: 기획의 의도 마이페이지-마이캠페인 이동, 컨텐츠 제출페이지 이동 두가지로 나뉘어져서 체크필요함
      case 'ACTIVE':
        return {
          text:
            currentUserRole === 'CREATOR'
              ? t('applyButtonText.active.user')
              : currentUserRole === 'CUSTOMER' || currentUserRole === null
                ? t('applyButtonText.closed')
                : t('applyButtonText.userRoleBrand'),
          isDisabled: false,
          onClick: handleActiveCampaign,
        };
      case 'CLOSED':
        return { text: t('applyButtonText.closed'), isDisabled: true };

      default:
        return { text: t('applyButtonText.unknown'), isDisabled: true };
    }
  };

  // prod 환경에서의 timezone 확인 용도
  console.log(timeZone, 'timeZone');
  console.log('applyStartDate: toDate()' + dayjs(applyStartDate).toDate());
  console.log(
    'applyStartDate: tz(timeZone) toDate()' +
      dayjs(applyStartDate).tz(timeZone).toDate()
  );
  console.log(
    'applyStartDate: tz timezone' +
      format.dateTime(dayjs(applyStartDate).tz(timeZone).toDate(), {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
  );
  console.log(
    'applyStartDate: formatted timezone tz(timeZone)' +
      format.dateTime(dayjs(applyStartDate).tz(timeZone).toDate(), {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: timeZone,
      })
  );

  return (
    <div className="scrollbar-hide flex h-[636px] w-[45.6rem] overflow-x-hidden bg-white">
      <div className="flex flex-col gap-[12px] md:gap-[16px]">
        {/* Campaign Product Info */}
        <div className="flex flex-col gap-[8px] pt-[8px]">
          <div className="flex flex-col">
            <p className="text-inter-title2 font-bold text-gray-700">
              {brandName}
            </p>
            <h1 className="text-inter-head3 font-bold text-gray-800">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-[8px]">
            <InfoChip
              text={campaignType}
              className="text-inter-caption w-fit font-bold text-gray-700"
            />
            <InfoChip
              text={language}
              className="text-inter-caption w-fit font-bold text-gray-700"
            />
          </div>
        </div>

        {/* Campaign Schedule Card */}
        <CampaignInfoGrayBorderBox>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[4px]">
                <h2 className="text-inter-title2 font-bold text-gray-800">
                  {t('campaignSchedule')}
                </h2>
                <p className="text-inter-caption text-gray-600">
                  {t('localTimeNotice')}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {/* Application Period */}
              <div className="flex h-[76px] gap-[12px]">
                <div className="flex flex-col items-center">
                  <div className="h-[2rem] w-[2rem] rounded-[12px] bg-pink-300" />
                  <div className="w-[2px] flex-1 border-l-2 border-gray-400" />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <p className="text-inter-body1 font-bold text-gray-700">
                    {t('applicationPeriod')}
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {format.dateTime(
                      dayjs(applyStartDate).tz(timeZone).toDate(),
                      {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                    ~
                    {format.dateTime(
                      dayjs(applyDeadline).tz(timeZone).toDate(),
                      {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </p>
                </div>
              </div>
              {/* Result Announcement */}
              <div className="flex h-[76px] gap-[12px]">
                <div className="flex flex-col items-center">
                  <div className="h-[2rem] w-[2rem] rounded-[12px] bg-pink-300" />
                  <div className="w-[2px] flex-1 border-l-2 border-gray-400" />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="text-inter-body1 font-bold text-gray-700">
                    {t('resultAnnouncement')}
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {format.dateTime(
                      dayjs(creatorAnnouncementDate).tz(timeZone).toDate(),
                      {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </p>
                </div>
              </div>

              {/* Content Submission Period */}
              <div className="flex h-[52px] gap-[12px]">
                <div className="flex flex-col items-center">
                  <div className="h-[2rem] w-[2rem] rounded-[12px] bg-pink-300" />
                </div>
                <div className="flex flex-col gap-[4px] pb-[24px]">
                  <p className="text-inter-body1 font-bold text-gray-700">
                    {t('contentSubmissionPeriod')}
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {format.dateTime(
                      dayjs(reviewSubmissionDeadline).tz(timeZone).toDate(),
                      {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CampaignInfoGrayBorderBox>

        {/* Deliverable Requirements Card */}
        <CampaignInfoGrayBorderBox>
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-inter-title2 font-bold text-gray-800">
              {t('deliverableRequirements')}
            </h2>

            {/* Instagram Requirements */}
            <div className="flex flex-col gap-[8px]">
              {deliverableRequirements.map((requirement) => (
                <div className="flex gap-[4px]" key={requirement}>
                  <SvgCheckNonBg size={24} />
                  <div className="flex gap-[8px]">
                    <div className="flex flex-col gap-[8px]">
                      <p
                        className="text-inter-body3 text-gray-700"
                        key={requirement}
                      >
                        {requirement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CampaignInfoGrayBorderBox>

        {/* Rewards & Compensation Card */}
        <CampaignInfoGrayBorderBox>
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-inter-title2 font-bold text-gray-800">
              {t('rewardsAndCompensation')}
            </h3>

            <div className="flex flex-col gap-[8px]">
              {participationRewards.map((reward, index) => (
                <div key={index} className="flex items-center gap-[4px]">
                  <SvgGift size={24} />
                  <p className="text-inter-body3 text-gray-700">{reward}</p>
                </div>
              ))}
            </div>
          </div>
        </CampaignInfoGrayBorderBox>

        {/* Eligibility Requirements Card */}
        <CampaignInfoGrayBorderBox>
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-inter-title2 font-bold text-gray-800">
              {t('eligibilityRequirements')}
            </h3>

            <div className="flex flex-col gap-[8px]">
              {eligibilityRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-[4px]">
                  {index === 0 ? (
                    <SvgProfileIcon size={24} />
                  ) : (
                    <SvgLanguage size={24} />
                  )}
                  <p className="text-inter-body3 text-gray-700">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CampaignInfoGrayBorderBox>

        {/* Apply Button */}
        <div className="sticky bottom-0 flex h-[80px] items-center justify-center bg-white py-[0.8rem]">
          <Button
            variant="filled"
            color="primary"
            size="lg"
            rounded="md"
            className="h-[64px] w-[456px] text-white"
            disabled={
              getCampaignButtonStatus(userSpecificCampaignStatus).isDisabled
            }
            onClick={
              getCampaignButtonStatus(userSpecificCampaignStatus).onClick
            }
          >
            {getCampaignButtonStatus(userSpecificCampaignStatus).text}
          </Button>
        </div>
      </div>
      <RejectModal
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        onConfirm={() => {
          setIsRejectModalOpen(false);
        }}
        type={rejectModalType}
      />
      <ConfirmCampaignSignUpModal
        announcementDate={format.dateTime(
          dayjs(creatorAnnouncementDate).toDate(),
          {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }
        )}
        open={isConfirmCampaignSignUpModalOpen}
        onOpenChange={setIsConfirmCampaignSignUpModalOpen}
        onConfirm={() => {
          applyCampaignMutation.mutate(campaignId);
        }}
      />
    </div>
  );
}
