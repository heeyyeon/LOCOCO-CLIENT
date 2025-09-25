import { z } from 'zod';

import { isValidPhoneNumber } from '../../../../../../utils/format-phone-number';

type TranslationFunction = (key: string) => string;

export const communityNameSchema = (
  t: TranslationFunction,
  isIdAvailable: boolean = false
) =>
  z.object({
    id: z
      .string()
      .trim()
      .min(1, t('idRequired'))
      .max(15, t('idMaxLength'))
      .regex(/^[a-z0-9._]+$/, t('idInvalidFormat'))
      .refine(() => isIdAvailable, {
        message: t('idAvailabilityCheck'),
      }),
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
    phoneCountryCode: z.string().min(1, t('phoneNumberRequired')),
    phoneNumber: z
      .string()
      .trim()
      .min(1, t('phoneNumberRequired'))
      .refine(isValidPhoneNumber, t('phoneNumberInvalid')),
    contentLanguage: z.string().min(1, t('contentLanguageRequired')),
  });

export const homeAddressSchema = (t: TranslationFunction) =>
  z.object({
    country: z.string().min(1, t('countryRequired')),
    stateRegion: z
      .string()
      .trim()
      .min(1, t('stateRequired'))
      .max(20, t('stateMaxLength')),
    city: z
      .string()
      .trim()
      .min(1, t('cityRequired'))
      .max(20, t('cityMaxLength')),
    addressLine1: z
      .string()
      .trim()
      .min(1, t('addressLine1Required'))
      .max(20, t('addressLine1MaxLength')),
    addressLine2: z
      .string()
      .trim()
      .max(20, t('addressLine2MaxLength'))
      .nullable()
      .optional(),
    zipCode: z.string().trim().max(20, t('zipCodeMaxLength')).optional(),
  });

export const skinInfoSchema = (t: TranslationFunction) =>
  z.object({
    skinType: z.string().min(1, t('skinTypeRequired')),
    skinTone: z.string().min(1, t('skinToneRequired')),
  });

export const creatorSignupSchema = (
  t: TranslationFunction,
  isIdAvailable: boolean = false
) =>
  z
    .object({
      ...communityNameSchema(t, isIdAvailable).shape,
      ...personalDetailsSchema(t).shape,
      ...homeAddressSchema(t).shape,
      ...skinInfoSchema(t).shape,
    })
    .strict();

export type CreatorSignupForm = z.infer<ReturnType<typeof creatorSignupSchema>>;
