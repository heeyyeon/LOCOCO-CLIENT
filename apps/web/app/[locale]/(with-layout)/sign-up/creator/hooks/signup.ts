import { z } from 'zod';

import { isValidPhoneNumber } from '../../../../../../utils/format-phone-number';

export const communityNameSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, 'ID is required.')
    .max(15, 'Use up to 15 characters.')
    .regex(
      /^[a-z0-9._]+$/,
      'This ID is unavailable. Please check the ID form.'
    ),
});

export const personalDetailsSchema = z.object({
  birthMonth: z.string().min(1, 'Birth is required.'),
  birthDay: z.string().min(1, 'Birth is required.'),
  birthYear: z.string().min(1, 'Birth is required.'),
  gender: z.string().min(1, 'Gender is required.'),
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required.')
    .max(20, 'Use up to 20 characters.'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required.')
    .max(20, 'Use up to 20 characters.'),
  phoneCountryCode: z.string().min(1, 'Phone Number is required.'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone Number is required.')
    .refine(
      (value) => isValidPhoneNumber(value, 'international'),
      'Please enter a valid phone number.'
    ),
  contentLanguage: z.string().min(1, 'Content Language is required.'),
});

export const homeAddressSchema = z.object({
  country: z.string().min(1, 'Country is required.'),
  stateRegion: z
    .string()
    .trim()
    .min(1, 'State/Region/Province is required.')
    .max(20, 'Use up to 20 characters.'),
  city: z
    .string()
    .trim()
    .min(1, 'City / Town is required.')
    .max(20, 'Use up to 20 characters.'),
  addressLine1: z
    .string()
    .trim()
    .min(1, 'Address Line 1 is required.')
    .max(20, 'Use up to 20 characters.'),
  addressLine2: z
    .string()
    .trim()
    .max(20, 'Use up to 20 characters.')
    .optional(),
  zipCode: z.string().trim().max(20, 'Use up to 20 characters.').optional(),
});

export const skinInfoSchema = z.object({
  skinType: z.string().min(1, 'Skin Type is required.'),
  skinTone: z.string().min(1, 'Skin Tone is required.'),
});

export const creatorSignupSchema = z
  .object({
    ...communityNameSchema.shape,
    ...personalDetailsSchema.shape,
    ...homeAddressSchema.shape,
    ...skinInfoSchema.shape,
  })
  .strict();

export type CreatorSignupForm = z.infer<typeof creatorSignupSchema>;
