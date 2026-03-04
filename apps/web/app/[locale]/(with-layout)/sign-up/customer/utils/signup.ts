import { z } from 'zod';

type TranslationFunction = (key: string) => string;

export const communityNameSchema = (t: TranslationFunction) =>
  z.object({
    id: z
      .string()
      .trim()
      .min(1, t('idRequired'))
      .max(15, t('idMaxLength'))
      .regex(/^[a-z0-9._]+$/, t('idInvalidFormat')),
  });

export const personalDetailsSchema = (t: TranslationFunction) =>
  z.object({
    birthMonth: z.string().min(1, t('birthRequired')),
    birthDay: z.string().min(1, t('birthRequired')),
    birthYear: z.string().min(1, t('birthRequired')),
    gender: z.string().min(1, t('genderRequired')),
    firstName: z
      .string()
      .trim()
      .min(1, t('firstNameRequired'))
      .max(20, t('firstNameMaxLength')),
    lastName: z
      .string()
      .trim()
      .min(1, t('lastNameRequired'))
      .max(20, t('lastNameMaxLength')),
    country: z.string().min(1, t('countryRequired')),
    phoneCountryCode: z.string(),
    phoneNumber: z.string().trim(),
  });

export const skinInfoSchema = (t: TranslationFunction) =>
  z.object({
    skinType: z.string().min(1, t('skinTypeRequired')),
    skinTone: z.string().min(1, t('skinToneRequired')),
  });

export const customerSignupSchema = (t: TranslationFunction) =>
  z
    .object({
      ...communityNameSchema(t).shape,
      ...personalDetailsSchema(t).shape,
      ...skinInfoSchema(t).shape,
    })
    .strict()
    .superRefine((data, ctx) => {
      const hasCountryCode = Boolean(data.phoneCountryCode.trim());
      const hasPhoneNumber = Boolean(data.phoneNumber.trim());

      if (hasCountryCode !== hasPhoneNumber) {
        if (!hasCountryCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['phoneCountryCode'],
            message: t('phoneNumberRequired'),
          });
        }

        if (!hasPhoneNumber) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['phoneNumber'],
            message: t('phoneNumberRequired'),
          });
        }
      }
    });

export type CustomerSignupForm = z.infer<ReturnType<typeof customerSignupSchema>>;
