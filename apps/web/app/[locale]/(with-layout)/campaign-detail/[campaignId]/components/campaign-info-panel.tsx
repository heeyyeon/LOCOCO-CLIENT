'use client';

import { useFormatter, useTranslations } from 'next-intl';

import dayjs from 'dayjs';

import { Button } from '@lococo/design-system/button';
import { InfoChip } from '@lococo/design-system/info-chip';
import {
  SvgCheckNonBg,
  SvgGift,
  SvgLanguage,
  SvgProfileIcon,
} from '@lococo/icons';

import CampaignInfoGrayBorderBox from './campaign-info-gray-border-box';

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
  //TODO: 추후 백엔드와 논의 후 ENUM으로 변경
  campaignStatusCode: string;
}

export default function CampaignInfoPanel({
  title,
  campaignType,
  brandName,
  //language,
  applyStartDate,
  applyDeadline,
  creatorAnnouncementDate,
  reviewSubmissionDeadline,
  deliverableRequirements,
  participationRewards,
  eligibilityRequirements,
  campaignStatusCode,
}: CampaignInfoPanelProps) {
  const t = useTranslations('campaignDetail');
  const format = useFormatter();

  // const timeZone = useTimeZone();

  // const defaultData = {
  //   brand: 'UIQ',
  //   title: 'Glass Skin Glow Serum Campaign',
  //   type: 'Giveaway',
  //   schedule: {
  //     applicationPeriod: 'Feb 15, 9:00 AM - Feb 15, 23:59 PM',
  //     contentSubmissionPeriod: 'Feb 16, 12:00 PM',
  //     resultAnnouncement: 'Feb 16, 12:00 PM',
  //   },
  //   deliverables: {
  //     instagram: {
  //       reels: '1 Reels(30-60 seconds)',
  //       stories: 'Stories(3-5 posts)',
  //       videos: '2 videos showcashing before/after',
  //     },
  //     hashtags: ['#GlassSkinGlow', '#Beauty_Of_UIQ', '#K-Beauty'],
  //   },
  //   rewards: [
  //     'Free Giveaway',
  //     'Bonus Rewards for contents with a view over 10K',
  //   ],
  //   eligibility: [
  //     'Beauty/ Skincare content creators',
  //     'Contents should be made in English',
  //   ],
  // };

  // TODO: 백엔드 데이터 누락, 추가시 삭제
  const hashtags = ['#GlassSkinGlow', '#Beauty_Of_UIQ', '#K-Beauty'];

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
          <InfoChip
            text={campaignType}
            className="text-inter-caption w-fit font-bold text-gray-700"
          />
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
                    {format.dateTime(dayjs(applyStartDate).toDate(), {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                    ~
                    {format.dateTime(dayjs(applyDeadline).toDate(), {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Content Submission Period */}
              <div className="flex h-[76px] gap-[12px]">
                <div className="flex flex-col items-center">
                  <div className="h-[2rem] w-[2rem] rounded-[12px] bg-pink-300" />
                  <div className="w-[2px] flex-1 border-l-2 border-gray-400" />
                </div>
                <div className="flex flex-col gap-[4px] pb-[24px]">
                  <p className="text-inter-body1 font-bold text-gray-700">
                    {t('contentSubmissionPeriod')}
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {format.dateTime(dayjs(reviewSubmissionDeadline).toDate(), {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Result Announcement */}
              <div className="flex h-[52px] gap-[12px]">
                <div className="flex flex-col items-center">
                  <div className="h-[2rem] w-[2rem] rounded-[12px] bg-pink-300" />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="text-inter-body1 font-bold text-gray-700">
                    {t('resultAnnouncement')}
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {format.dateTime(dayjs(creatorAnnouncementDate).toDate(), {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
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

            {/* Hashtags */}
            <div className="flex items-center gap-[4px]">
              {hashtags.map((hashtag, index) => (
                <InfoChip
                  key={index}
                  text={hashtag}
                  className="text-inter-caption font-bold text-gray-700"
                />
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
            className="h-[64px] w-[456px]"
          >
            {campaignStatusCode}
          </Button>
        </div>
      </div>
    </div>
  );
}
