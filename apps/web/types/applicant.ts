export type ApplicantStatus =
  | 'default' // 기본
  | 'selected' // 선택된
  | 'block' // 선택안된 disabled
  | 'selectedBlock'; // 선택된 disabled

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
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}
