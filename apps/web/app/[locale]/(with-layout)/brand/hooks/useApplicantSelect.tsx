import { useState } from 'react';

export interface ApplicantData {
  id: string;
  status: 'default' | 'selected' | 'nonSelected';
  profileImage: string;
  userName: string;
  snsId: string;
  instagramFollower: number;
  tiktokFollower: number;
  joinedCampaign: number;
  applicationDate: string;
  approvalStatus: string;
}

export const useApplicantSelect = (initialData: ApplicantData[]) => {
  const [applicants, setApplicants] = useState<ApplicantData[]>(initialData);

  const handleSelectApplicant = (id: string, selected: boolean) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id
          ? { ...applicant, status: selected ? 'selected' : 'default' }
          : applicant
      )
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setApplicants((prev) =>
      prev.map((applicant) => ({
        ...applicant,
        status: selected ? 'selected' : 'default',
      }))
    );
  };

  const selectedApplicants = applicants.filter(
    (applicant) => applicant.status === 'selected'
  );
  const totalCount = applicants.length;
  const selectedCount = selectedApplicants.length;

  return {
    applicants,
    setApplicants,
    handleSelectApplicant,
    handleSelectAll,
    selectedApplicants,
    selectedCount,
    totalCount,
  };
};
