'use client';

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
  campaignData?: {
    brand: string;
    title: string;
    type: string;
    schedule: {
      applicationPeriod: string;
      contentSubmissionPeriod: string;
      resultAnnouncement: string;
    };
    deliverables: {
      instagram: {
        reels: string;
        stories: string;
        videos: string;
      };
      hashtags: string[];
    };
    rewards: string[];
    eligibility: string[];
  };
}

export default function CampaignInfoPanel({
  campaignData,
}: CampaignInfoPanelProps) {
  const defaultData = {
    brand: 'UIQ',
    title: 'Glass Skin Glow Serum Campaign',
    type: 'Giveaway',
    schedule: {
      applicationPeriod: 'Feb 15, 9:00 AM - Feb 15, 23:59 PM',
      contentSubmissionPeriod: 'Feb 16, 12:00 PM',
      resultAnnouncement: 'Feb 16, 12:00 PM',
    },
    deliverables: {
      instagram: {
        reels: '1 Reels(30-60 seconds)',
        stories: 'Stories(3-5 posts)',
        videos: '2 videos showcashing before/after',
      },
      hashtags: ['#GlassSkinGlow', '#Beauty_Of_UIQ', '#K-Beauty'],
    },
    rewards: [
      'Free Giveaway',
      'Bonus Rewards for contents with a view over 10K',
    ],
    eligibility: [
      'Beauty/ Skincare content creators',
      'Contents should be made in English',
    ],
  };

  const data = campaignData || defaultData;

  return (
    <div className="flex h-[636px] w-[45.6rem] overflow-y-auto overflow-x-hidden bg-white">
      <div className="flex flex-col gap-[12px] md:gap-[16px]">
        {/* Campaign Product Info */}
        <div className="flex flex-col gap-[8px] pt-[8px]">
          <div className="flex flex-col">
            <p className="text-inter-title2 font-bold text-gray-700">
              {data.brand}
            </p>
            <h1 className="text-inter-head3 font-bold text-gray-800">
              {data.title}
            </h1>
          </div>
          <InfoChip
            text={data.type}
            className="text-inter-caption w-fit font-bold text-gray-700"
          />
        </div>

        {/* Campaign Schedule Card */}
        <CampaignInfoGrayBorderBox>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[4px]">
                <h2 className="text-inter-title2 font-bold text-gray-800">
                  {/* TODO: translate */}
                  Campaign Schedule
                </h2>
                <p className="text-inter-caption text-gray-600">
                  All times are displayed in your local time.
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
                    Application Period
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {data.schedule.applicationPeriod}
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
                    Content Submission Period
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {data.schedule.contentSubmissionPeriod}
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
                    Result Announcement
                  </p>
                  <p className="text-inter-body3 text-gray-700">
                    {data.schedule.resultAnnouncement}
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
              Deliverable Requirements
            </h2>

            {/* Instagram Requirements */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[4px]">
                <SvgCheckNonBg size={24} />
                <div className="flex gap-[8px]">
                  <p className="body1 text-gray-700">Instagram</p>
                  <div className="flex flex-col gap-[8px]">
                    <p className="body3 text-gray-700">
                      {data.deliverables.instagram.reels}
                    </p>
                    <p className="body3 text-gray-700">
                      {data.deliverables.instagram.stories}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-[4px]">
                <SvgCheckNonBg size={24} />
                <div className="flex gap-[8px]">
                  <p className="body1 text-gray-700">Instagram</p>
                  <div className="flex flex-col gap-[8px]">
                    <p className="body3 text-gray-700">
                      {data.deliverables.instagram.videos}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="flex items-center gap-[4px]">
              {data.deliverables.hashtags.map((hashtag, index) => (
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
              Rewards & Compensation
            </h3>

            <div className="flex flex-col gap-[8px]">
              {data.rewards.map((reward, index) => (
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
              Eligibility Requirements
            </h3>

            <div className="flex flex-col gap-[8px]">
              {data.eligibility.map((requirement, index) => (
                <div key={index} className="flex items-center gap-[4px]">
                  {index === 0 ? (
                    <SvgProfileIcon size={24} />
                  ) : (
                    <SvgLanguage size={24} />
                  )}
                  <p className="body3 text-gray-700">{requirement}</p>
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
            Apply Now!
          </Button>
        </div>
      </div>
    </div>
  );
}
