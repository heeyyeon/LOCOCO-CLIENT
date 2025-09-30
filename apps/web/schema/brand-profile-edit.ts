import { z } from 'zod';

export const brandProfileEditSchema = z.object({
  profileImageUrl: z.string().optional(),
  brandName: z.string().min(1, '브랜드 이름을 입력해주세요').max(15),
  managerName: z.string().min(1, '담당자 이름을 입력해주세요').max(10),
  phoneNumber: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .max(11)
    .regex(/^[0-9]+$/, { message: '숫자만 입력 가능합니다' }),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  roadAddress: z.string().min(1, '회사 주소를 입력해주세요').max(30),
  addressDetail: z.string().min(1, '상세 주소를 입력해주세요').max(30),
});

export type BrandProfileEditSchema = z.infer<typeof brandProfileEditSchema>;
