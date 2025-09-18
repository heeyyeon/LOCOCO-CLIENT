export type ApplicantStatus =
  | 'default'
  | 'selected'
  | 'block'
  | 'selectedBlock';

export interface ApplicantData {
  id: string;
  status: ApplicantStatus;
  profileImage: string;
  userName: string;
  snsId: string;
  instagramFollower: number;
  tiktokFollower: number;
  joinedCampaign: number;
  applicationDate: string;
  approvalStatus: string;
}
