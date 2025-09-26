import { z } from 'zod';

export const brandProfileEditSchema = z.object({
  profilePhoto: z.string().min(1, '프로필 사진을 선택해주세요'),
  managerName: z.string().min(1, '담당자 이름을 입력해주세요'),
  countryCode: z.string().min(1, '국가코드를 선택해주세요'),
  phoneNumber: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .regex(/^[0-9-+\s]+$/, { message: '올바른 연락처 형식이 아닙니다' }),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: '올바른 이메일 형식이 아닙니다',
    }),
  companyAddress: z.string().min(1, '회사 주소를 입력해주세요'),
  detailAddress: z.string().min(1, '상세 주소를 입력해주세요'),
});

export type BrandProfileEditSchema = z.infer<typeof brandProfileEditSchema>;
