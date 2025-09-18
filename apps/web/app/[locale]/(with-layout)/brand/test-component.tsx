'use client';

import React from 'react';

import { ApplicantData } from 'types/applicant';

import ApplicantInfo from './component/applicant-info';
import ApplicantTableHeader from './component/application-table-header';
import { useApplicantSelect } from './hooks/useApplicantSelect';

export default function TestComponent() {
  const applicantDummyData: ApplicantData[] = [
    {
      id: '1',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      userName: 'Mia Rodriguez',
      snsId: '@miabeauty',
      instagramFollower: 34200,
      tiktokFollower: 34500,
      joinedCampaign: 4,
      applicationDate: 'Jun 12, 2025',
      approvalStatus: '대기중',
    },
    {
      id: '2',
      status: 'selected' as const,
      profileImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      userName: 'Alex Thompson',
      snsId: '@alexstyle',
      instagramFollower: 128500,
      tiktokFollower: 89200,
      joinedCampaign: 7,
      applicationDate: 'Jun 11, 2025',
      approvalStatus: '승인',
    },
    {
      id: '3',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      userName: 'Sarah Kim',
      snsId: '@sarahkfashion',
      instagramFollower: 67800,
      tiktokFollower: 92100,
      joinedCampaign: 3,
      applicationDate: 'Jun 10, 2025',
      approvalStatus: '검토중',
    },
    {
      id: '4',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      userName: 'David Park',
      snsId: '@davidtech',
      instagramFollower: 45600,
      tiktokFollower: 78300,
      joinedCampaign: 2,
      applicationDate: 'Jun 09, 2025',
      approvalStatus: '거절',
    },
    {
      id: '5',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
      userName: 'Emma Wilson',
      snsId: '@emmawilson',
      instagramFollower: 156700,
      tiktokFollower: 203400,
      joinedCampaign: 9,
      applicationDate: 'Jun 08, 2025',
      approvalStatus: '대기중',
    },
    {
      id: '6',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      userName: 'James Lee',
      snsId: '@jameslee_official',
      instagramFollower: 89400,
      tiktokFollower: 112300,
      joinedCampaign: 5,
      applicationDate: 'Jun 07, 2025',
      approvalStatus: '승인',
    },
    {
      id: '7',
      status: 'selected' as const,
      profileImage:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      userName: 'Lisa Chen',
      snsId: '@lisachen_beauty',
      instagramFollower: 234500,
      tiktokFollower: 189600,
      joinedCampaign: 12,
      applicationDate: 'Jun 06, 2025',
      approvalStatus: '승인',
    },
    {
      id: '8',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      userName: 'Michael Brown',
      snsId: '@mikebrown',
      instagramFollower: 56700,
      tiktokFollower: 67800,
      joinedCampaign: 3,
      applicationDate: 'Jun 05, 2025',
      approvalStatus: '검토중',
    },
    {
      id: '9',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      userName: 'Jessica Taylor',
      snsId: '@jessicataylor',
      instagramFollower: 78900,
      tiktokFollower: 85400,
      joinedCampaign: 6,
      applicationDate: 'Jun 04, 2025',
      approvalStatus: '대기중',
    },
    {
      id: '10',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face',
      userName: 'Ryan Johnson',
      snsId: '@ryanjohnson_fit',
      instagramFollower: 123400,
      tiktokFollower: 156700,
      joinedCampaign: 8,
      applicationDate: 'Jun 03, 2025',
      approvalStatus: '승인',
    },
    {
      id: '11',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      userName: 'Ashley Davis',
      snsId: '@ashleydavis',
      instagramFollower: 67800,
      tiktokFollower: 45600,
      joinedCampaign: 4,
      applicationDate: 'Jun 02, 2025',
      approvalStatus: '거절',
    },
    {
      id: '12',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
      userName: 'Kevin Martinez',
      snsId: '@kevinmartinez',
      instagramFollower: 98700,
      tiktokFollower: 134500,
      joinedCampaign: 7,
      applicationDate: 'Jun 01, 2025',
      approvalStatus: '검토중',
    },
    {
      id: '13',
      status: 'block' as const,
      profileImage:
        'https://images.unsplash.com/photo-1502720705749-871143f0e671?w=100&h=100&fit=crop&crop=face',
      userName: 'Amanda Garcia',
      snsId: '@amandagarcia_lifestyle',
      instagramFollower: 189300,
      tiktokFollower: 223400,
      joinedCampaign: 11,
      applicationDate: 'May 31, 2025',
      approvalStatus: '승인',
    },
    {
      id: '14',
      status: 'selectedBlock' as const,
      profileImage:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      userName: 'Chris Anderson',
      snsId: '@chrisanderson',
      instagramFollower: 76500,
      tiktokFollower: 89200,
      joinedCampaign: 5,
      applicationDate: 'May 30, 2025',
      approvalStatus: '대기중',
    },
    {
      id: '15',
      status: 'default' as const,
      profileImage:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
      userName: 'Nicole White',
      snsId: '@nicolewhite_travel',
      instagramFollower: 145600,
      tiktokFollower: 178900,
      joinedCampaign: 9,
      applicationDate: 'May 29, 2025',
      approvalStatus: '검토중',
    },
  ];
  const {
    applicants,
    totalCount,
    selectedCount,
    handleSelectApplicant,
    handleSelectAll,
  } = useApplicantSelect(applicantDummyData);

  return (
    <div>
      <p>total : {totalCount}</p>
      <p>selected : {selectedCount}</p>
      <button onClick={() => handleSelectAll(selectedCount !== totalCount)}>
        {selectedCount === totalCount ? '전체 해제' : '전체 선택'}
      </button>
      <table>
        <ApplicantTableHeader />
        <tbody>
          {applicants.map((data) => (
            <ApplicantInfo
              key={data.id}
              {...data}
              onSelect={(selected) => handleSelectApplicant(data.id, selected)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
