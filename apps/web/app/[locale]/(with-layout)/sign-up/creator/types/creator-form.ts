export interface CreatorRegisterRequest {
  creatorName: string;
  birthDate: string;
  gender: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  contentLanguage: string;
  country: string;
  stateOrProvince: string;
  cityOrTown: string;
  addressLine1: string;
  addressLine2?: string | null;
  postalCode?: string | null;
  skinType: string;
  skinTone: string;
}

export interface CreatorRegisterResponse {
  success: boolean;
  status: number;
  message: string;
  data: null;
}
