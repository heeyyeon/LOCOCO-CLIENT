import { z } from 'zod';

import { isValidPhoneNumber } from '../../../../../../utils/formatPhoneNumber';

export const brandSignupSchema = z
  .object({
    brandName: z
      .string()
      .trim()
      .min(1, '브랜드 이름을 입력해주세요.')
      .max(30, '브랜드 이름은 최대 30글자입니다.')
      .regex(/^[a-zA-Z가-힣\s]+$/, '한글 또는 영어만 입력해주세요.'),
    contactName: z
      .string()
      .trim()
      .min(1, '담당자 이름을 입력해주세요.')
      .max(10, '담당자 이름은 최대 10글자입니다.')
      .regex(/^[가-힣]+$/, '한글만 입력해주세요.'),
    contactPosition: z
      .string()
      .trim()
      .min(1, '담당자 직책을 입력해주세요')
      .max(10, '담당자 직책은 최대 10글자입니다.')
      .regex(/^[가-힣]+$/, '한글만 입력해주세요'),
    contactPhone: z
      .string()
      .trim()
      .min(1, '담당자 연락처를 입력해주세요.')
      .refine(isValidPhoneNumber, '올바른 휴대폰 번호를 입력해주세요.'),
    street: z.string().trim().min(1, '도로명주소를 입력해주세요.'),
    detail: z
      .string()
      .trim()
      .min(1, '상세주소를 입력해주세요.')
      .max(30, '상세주소는 최대 30글자입니다.'),
  })
  .strict();

export type BrandSignupForm = z.infer<typeof brandSignupSchema>;
