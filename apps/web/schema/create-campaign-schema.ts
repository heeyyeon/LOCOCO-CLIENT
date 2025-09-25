import { SOCIAL_PLATFORMS } from 'app/[locale]/(with-layout)/brand/component/create-campaign/social-chip';
import { z } from 'zod';

const isBrowser = typeof window !== 'undefined';

export const createCampaignSchema = z
  .object({
    title: z.string().min(1, 'title 에러 메세지'),
    language: z.enum(['EN', 'ES', '']),
    type: z.enum(['GIVEAWAY', 'CONTENTS', 'EXCLUSIVE', '']),
    category: z.enum(['SKINCARE', 'SUNCARE', 'MAKEUP', '']),
    creatorCount: z.string().min(1, '크리에이터 수 에러 메세지'),

    startDate: z.object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    }),
    startTime: z.object({
      period: z.enum(['AM', 'PM']),
      hour: z.string(),
      minute: z.string(),
    }),
    endDate: z.object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    }),
    endTime: z.object({
      period: z.enum(['AM', 'PM']),
      hour: z.string(),
      minute: z.string(),
    }),
    announceDate: z.object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    }),
    announceTime: z.object({
      period: z.enum(['AM', 'PM']),
      hour: z.string(),
      minute: z.string(),
    }),
    dueDate: z.object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    }),
    dueTime: z.object({
      period: z.enum(['AM', 'PM']),
      hour: z.string(),
      minute: z.string(),
    }),

    // 동적 입력 필드들
    joinConditions: z.array(z.string().min(1, '조건을 입력해주세요')),
    submitConditions: z.array(z.string().min(1, '조건을 입력해주세요')),
    joinRewards: z.array(z.string().min(1, '보상을 입력해주세요')),

    // 플랫폼 선택
    firstContents: z.record(z.enum(SOCIAL_PLATFORMS), z.boolean()),
    secondContents: z.record(z.enum(SOCIAL_PLATFORMS), z.boolean()),

    // 파일 업로드
    thumbnailFiles: isBrowser
      ? z
          .array(z.instanceof(File))
          .max(5, '썸네일은 최대 5장까지 업로드 가능합니다')
      : z.array(z.any()).max(5, '썸네일은 최대 5장까지 업로드 가능합니다'),
    detailFiles: isBrowser
      ? z
          .array(z.instanceof(File))
          .max(15, '상세 사진은 최대 15장까지 업로드 가능합니다')
      : z.array(z.any()).max(15, '상세 사진은 최대 15장까지 업로드 가능합니다'),
  })
  .refine(
    (data) => {
      const firstSelected = Object.values(data.firstContents).filter(
        Boolean
      ).length;
      return firstSelected <= 2;
    },
    {
      message: '첫 번째 컨텐츠는 최대 2개까지 선택 가능합니다', // 1차 SNS 플랫폼 선택 에러 메세지
      path: ['firstContents'],
    }
  )
  .refine(
    (data) => {
      const secondSelected = Object.values(data.secondContents).filter(
        Boolean
      ).length;
      return secondSelected <= 2;
    },
    {
      message: '두 번째 컨텐츠는 최대 2개까지 선택 가능합니다', // 2차 SNS 플랫폼 선택 에러 메세지
      path: ['secondContents'],
    }
  );

export type CampaignFormData = z.infer<typeof createCampaignSchema>;
