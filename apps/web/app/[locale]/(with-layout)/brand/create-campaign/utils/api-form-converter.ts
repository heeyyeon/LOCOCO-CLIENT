import { CampaignBasicResponse } from '@typescript-swagger/data-contracts';
import { CampaignFormData } from 'schema/create-campaign-schema';

export const transformApiDataToFormData = (
  apiData: CampaignBasicResponse
): CampaignFormData => {
  // api response에서 오는 platform type들 컴포넌트에서 사용하는 key로 변환
  const transformContentType = (
    contentType: 'INSTA_REELS' | 'TIKTOK_VIDEO' | 'INSTA_POST'
  ) => {
    const mapping = {
      INSTA_REELS: 'instagram-reels',
      INSTA_POST: 'instagram-post',
      TIKTOK_VIDEO: 'tiktok-video',
    } as const;
    return mapping[contentType];
  };

  const transformDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;

    return {
      date: {
        year: year.toString(),
        month: month.toString().padStart(2, '0'),
        day: day.toString().padStart(2, '0'),
      },
      time: {
        period,
        hour: hour12.toString(),
        minute: minutes.toString().padStart(2, '0'),
      },
    };
  };

  // api 응답의 날짜 값들 모두 변환
  const startDateTime = transformDateTime(apiData.applyStartDate);
  const endDateTime = transformDateTime(apiData.applyDeadline);
  const announceDateTime = transformDateTime(apiData.creatorAnnouncementDate);
  const dueDateTime = transformDateTime(apiData.reviewSubmissionDeadline);

  // 변환 후 출력될 return 값
  const transformed = {
    title: apiData.campaignTitle || '',
    language: apiData.language || '',
    type: apiData.campaignType || '',
    category: apiData.campaignProductType || '',
    creatorCount: apiData.recruitmentNumber?.toString() || '',
    startDate: startDateTime.date,
    startTime: startDateTime.time,
    endDate: endDateTime.date,
    endTime: endDateTime.time,
    announceDate: announceDateTime.date,
    announceTime: announceDateTime.time,
    dueDate: dueDateTime.date,
    dueTime: dueDateTime.time,
    joinConditions: apiData.eligibilityRequirements || [''],
    submitConditions: apiData.deliverableRequirements || [''],
    joinRewards: apiData.participationRewards || [''],
    firstContents: {
      'instagram-post':
        transformContentType(apiData.firstContentType) === 'instagram-post',
      'instagram-reels':
        transformContentType(apiData.firstContentType) === 'instagram-reels',
      'tiktok-video':
        transformContentType(apiData.firstContentType) === 'tiktok-video',
    },
    secondContents: {
      'instagram-post':
        transformContentType(apiData.secondContentType) === 'instagram-post',
      'instagram-reels':
        transformContentType(apiData.secondContentType) === 'instagram-reels',
      'tiktok-video':
        transformContentType(apiData.secondContentType) === 'tiktok-video',
    },
    thumbnailFiles:
      apiData.thumbnailImages?.map((img) => ({
        url: img.url,
        displayOrder: img.displayOrder,
        imageType: 'THUMBNAIL' as const,
      })) || [],
    detailFiles:
      apiData.detailImages?.map((img) => ({
        url: img.url,
        displayOrder: img.displayOrder,
        imageType: 'DETAIL' as const,
      })) || [],
  };

  return transformed as CampaignFormData;
};

// 공통 변환 로직
export const transformFormDataToApiData = (data: CampaignFormData) => {
  const transformToApiContentType = (contents: { [key: string]: boolean }) => {
    const mapping = {
      'instagram-reels': 'INSTA_REELS',
      'instagram-post': 'INSTA_POST',
      'tiktok-video': 'TIKTOK_VIDEO',
    } as const;

    const selectedPlatform = Object.entries(contents).find(
      ([, selected]) => selected
    )?.[0];
    return selectedPlatform
      ? mapping[selectedPlatform as keyof typeof mapping]
      : undefined;
  };

  const transformToDateTime = (
    date: { year: string; month: string; day: string },
    time: { period: string; hour: string; minute: string }
  ) => {
    if (!date.year || !date.month || !date.day || !time.hour || !time.minute) {
      return undefined; // 빈 값이면 undefined 반환
    }

    const year = parseInt(date.year);
    const month = parseInt(date.month);
    const day = parseInt(date.day);
    const hour = parseInt(time.hour);
    const minute = parseInt(time.minute);

    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      isNaN(hour) ||
      isNaN(minute)
    ) {
      return undefined;
    }

    const hour24 =
      time.period === 'PM' && hour !== 12
        ? hour + 12
        : time.period === 'AM' && hour === 12
          ? 0
          : hour;

    const dateTime = new Date(year, month - 1, day, hour24, minute);

    if (isNaN(dateTime.getTime())) {
      return undefined;
    }

    return dateTime.toISOString();
  };

  return {
    campaignTitle: data.title || undefined,
    language: (data.language as 'EN' | 'ES') || undefined,
    campaignType:
      (data.type as 'GIVEAWAY' | 'CONTENTS' | 'EXCLUSIVE') || undefined,
    campaignProductType:
      (data.category as 'SKINCARE' | 'SUNCARE' | 'MAKEUP') || undefined,
    recruitmentNumber: data.creatorCount
      ? parseInt(data.creatorCount)
      : undefined,
    applyStartDate: transformToDateTime(data.startDate, data.startTime),
    applyDeadline: transformToDateTime(data.endDate, data.endTime),
    creatorAnnouncementDate: transformToDateTime(
      data.announceDate,
      data.announceTime
    ),
    reviewSubmissionDeadline: transformToDateTime(data.dueDate, data.dueTime),
    eligibilityRequirements: data.joinConditions.filter(
      (condition) => condition.trim() !== ''
    ),
    deliverableRequirements: data.submitConditions.filter(
      (condition) => condition.trim() !== ''
    ),
    participationRewards: data.joinRewards.filter(
      (reward) => reward.trim() !== ''
    ),
    firstContentType: transformToApiContentType(data.firstContents),
    secondContentType: transformToApiContentType(data.secondContents),
    thumbnailImages:
      data.thumbnailFiles?.map((file, index) => ({
        url: file.url,
        displayOrder: file.displayOrder || index,
        imageType: 'THUMBNAIL' as const,
      })) || [],
    detailImages:
      data.detailFiles?.map((file, index) => ({
        url: file.url,
        displayOrder: file.displayOrder || index,
        imageType: 'DETAIL' as const,
      })) || [],
  };
};
