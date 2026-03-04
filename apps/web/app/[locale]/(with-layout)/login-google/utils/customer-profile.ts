import { apiRequest } from 'app/api/apiRequest';

interface CustomerProfileForSignup {
  userName?: string;
  birthDate?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  skinType?: string;
  skinTone?: string;
}

interface CustomerProfileResponse {
  data?: CustomerProfileForSignup;
}

export interface CustomerProfileCheckResult {
  isCompleted: boolean;
  profile?: CustomerProfileForSignup;
}

const REQUIRED_CUSTOMER_PROFILE_FIELDS: Array<keyof CustomerProfileForSignup> = [
  'userName',
  'birthDate',
  'gender',
  'firstName',
  'lastName',
  'country',
  'skinType',
  'skinTone',
];

const hasText = (value?: string) =>
  typeof value === 'string' && value.trim().length > 0;

export const isCustomerProfileCompleted = (
  profile?: CustomerProfileForSignup
): boolean => {
  if (!profile) return false;

  return REQUIRED_CUSTOMER_PROFILE_FIELDS.every((field) =>
    hasText(profile[field])
  );
};

export const fetchIsCustomerProfileCompleted = async (): Promise<boolean> => {
  const result = await fetchCustomerProfileCheck();
  return result.isCompleted;
};

export const fetchCustomerProfileCheck =
  async (): Promise<CustomerProfileCheckResult> => {
  try {
    const response = await apiRequest<CustomerProfileResponse>({
      endPoint: '/api/customer/profile',
    });

    return {
      isCompleted: isCustomerProfileCompleted(response?.data),
      profile: response?.data,
    };
  } catch {
    return { isCompleted: false };
  }
};
