export interface CustomerRegisterRequest {
  customerName: string;
  birthDate: string;
  gender: string;
  firstName: string;
  lastName: string;
  countryCode?: string;
  phoneNumber?: string;
  country: string;
  skinType: string;
  skinTone: string;
}

export interface CustomerRegisterResponse {
  success: boolean;
  status: number;
  message: string;
  data: null;
}

export interface CustomerInfoResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    userName?: string;
    birthDate?: string;
    gender?: string;
    firstName?: string;
    lastName?: string;
    countryCode?: string;
    phoneNumber?: string;
    contentLanguage?: string;
    country?: string;
    stateOrProvince?: string;
    cityOrTown?: string;
    addressLine1?: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    skinType?: string;
    skinTone?: string;
  };
}
